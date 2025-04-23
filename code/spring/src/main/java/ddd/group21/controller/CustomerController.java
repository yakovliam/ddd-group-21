package ddd.group21.controller;

import ddd.group21.model.CustomerOrder;
import ddd.group21.repository.CustomerOrdersRepository;
import ddd.group21.repository.CustomersRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@CrossOrigin
@RequestMapping("/customers")
public class CustomerController {

  private final CustomersRepository customersRepository;
  private final CustomerOrdersRepository customerOrdersRepository;

  public CustomerController(CustomersRepository customersRepository,
                            CustomerOrdersRepository customerOrdersRepository) {
    this.customersRepository = customersRepository;
    this.customerOrdersRepository = customerOrdersRepository;
  }

  @GetMapping
  public ResponseEntity<Object> getCustomers(@RequestParam("keycloak_id") String keycloakId) {
    if (keycloakId != null && !keycloakId.isEmpty()) {
      return ResponseEntity.ok(customersRepository.getByUserAccount_KeycloakId(keycloakId));
    }
    return ResponseEntity.ok(customersRepository.findAll());
  }

  @GetMapping("/{id}/orders")
  public ResponseEntity<Object> getCustomerOrders(@PathVariable("id") String customerId,
                                                  Pageable pageable) {
    if (customerId == null || customerId.isEmpty() || !customerId.matches("\\d+")) {
      throw new RuntimeException("Invalid customer id");
    }
    
    return ResponseEntity.ok(
        customerOrdersRepository.getByCustomer_Id(Long.valueOf(customerId), pageable));
  }

  @GetMapping("/{id}/orders/{orderId}")
  public ResponseEntity<Object> getCustomerOrder(@PathVariable("id") String customerId,
                                                 @PathVariable("orderId") String orderId) {
    CustomerOrder customerOrder = customerOrdersRepository.findById(Long.parseLong(orderId))
        .orElseThrow(() -> new RuntimeException("Order not found"));

    // check if the customer is the owner of the order
    if (!customerOrder.getCustomer().getId().equals(Long.parseLong(customerId))) {
      throw new RuntimeException("Customer is not the owner of the order");
    }

    return ResponseEntity.ok(customerOrder);
  }
}
