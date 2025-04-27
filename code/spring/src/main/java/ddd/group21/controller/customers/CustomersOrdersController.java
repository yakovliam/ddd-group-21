package ddd.group21.controller.customers;

import ddd.group21.model.CreditCard;
import ddd.group21.model.Customer;
import ddd.group21.model.CustomerOrder;
import ddd.group21.model.OrderStatus;
import ddd.group21.model.dto.CartDTO;
import ddd.group21.model.dto.CustomerOrderDTO;
import ddd.group21.model.json.MessageResponse;
import ddd.group21.model.mapper.CustomerOrderMapper;
import ddd.group21.model.mapper.CycleAvoidingMappingContext;
import ddd.group21.repository.CreditCardRepository;
import ddd.group21.repository.CustomerOrdersRepository;
import ddd.group21.repository.CustomerRepository;
import java.math.BigDecimal;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin
@RequestMapping("/customers/{id}/orders")
public class CustomersOrdersController {

  private final CustomerOrderMapper customerOrderMapper = CustomerOrderMapper.INSTANCE;

  private final CustomerOrdersRepository customerOrdersRepository;
  private final CustomerRepository customersRepository;
  private final CreditCardRepository creditCardRepository;

  public CustomersOrdersController(CustomerOrdersRepository customerOrdersRepository,
                                   CustomerRepository customersRepository,
                                   CreditCardRepository creditCardRepository) {
    this.customerOrdersRepository = customerOrdersRepository;
    this.customersRepository = customersRepository;
    this.creditCardRepository = creditCardRepository;
  }

  @GetMapping
  public ResponseEntity<Object> getCustomerOrders(@PathVariable("id") String customerId,
                                                  Pageable pageable) {
    if (customerId == null || customerId.isEmpty() || !customerId.matches("\\d+")) {
      return ResponseEntity.status(400).body("Invalid customer id");
    }

    return ResponseEntity.ok(
        customerOrdersRepository.getByCustomer_Id(Long.valueOf(customerId), pageable).map(
            customerOrder -> customerOrderMapper.customerOrderToCustomerOrderDTO(customerOrder,
                new CycleAvoidingMappingContext())));
  }

  @GetMapping("/{orderId}")
  public ResponseEntity<Object> getCustomerOrder(@PathVariable("id") String customerId,
                                                 @PathVariable("orderId") String orderId) {
    CustomerOrder customerOrder =
        customerOrdersRepository.findById(Long.parseLong(orderId)).orElse(null);

    if (customerOrder == null) {
      return ResponseEntity.status(404).body("Order " + orderId + " does not exist");
    }

    // check if the customer is the owner of the order
    if (!customerOrder.getCustomer().getId().equals(Long.parseLong(customerId))) {
      return ResponseEntity.status(403).body("Customer " + customerId + " is not the owner");
    }

    return ResponseEntity.ok(customerOrderMapper.customerOrderToCustomerOrderDTO(customerOrder,
        new CycleAvoidingMappingContext()));
  }


  @PostMapping
  public ResponseEntity<Object> createOrder(@PathVariable("id") String customerId,
                                            @RequestBody CartDTO cartDTO) {
    if (customerId == null || customerId.isEmpty() || !customerId.matches("\\d+")) {
      return ResponseEntity.status(400).body("Invalid customer id");
    }

    if (cartDTO == null || cartDTO.getCartItems() == null || cartDTO.getCartItems().isEmpty()) {
      return ResponseEntity.status(400).body("Cart is empty");
    }

    Optional<Customer> customer = customersRepository.findById(Long.parseLong(customerId));

    if (customer.isEmpty()) {
      return ResponseEntity.status(400).body("Customer " + customerId + " does not exist");
    }

    BigDecimal total = cartDTO.getCartItems().stream()
        .map(cartItem -> cartItem.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())))
        .reduce(BigDecimal.ZERO, BigDecimal::add);

    Set<CreditCard> creditCardSet = creditCardRepository.findByCustomer_Id(customer.get().getId());
    if (creditCardSet.isEmpty()) {
      return ResponseEntity.status(400)
          .body("Customer " + customer.get().getId() + " has no credit cards");
    }

    CreditCard creditCard =
        creditCardSet.stream().filter(CreditCard::isDefault).findFirst().orElse(null);

    if (creditCard == null) {
      return ResponseEntity.status(400)
          .body("Customer " + customer.get().getId() + " has no default credit card");
    }

    CustomerOrder customerOrder = new CustomerOrder();
    customerOrder.setCustomer(customer.get());
    customerOrder.setOrderStatus(OrderStatus.ISSUED);
    customerOrder.setOrderDate(new java.sql.Timestamp(System.currentTimeMillis()));
    customerOrder.setTotalAmount(total);
    customerOrder.setCreditCard(creditCard);

    CustomerOrderDTO customerOrderDTO =
        customerOrderMapper.customerOrderToCustomerOrderDTO(customerOrder,
            new CycleAvoidingMappingContext());

    customerOrdersRepository.save(customerOrder);

    return ResponseEntity.ok(customerOrderDTO);
  }
}
