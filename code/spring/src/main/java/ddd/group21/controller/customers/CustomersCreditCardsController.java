package ddd.group21.controller.customers;


import ddd.group21.model.Address;
import ddd.group21.model.CreditCard;
import ddd.group21.model.Customer;
import ddd.group21.model.dto.CreditCardDTO;
import ddd.group21.model.mapper.CreditCardMapper;
import ddd.group21.model.mapper.CycleAvoidingMappingContext;
import ddd.group21.repository.AddressRepository;
import ddd.group21.repository.CreditCardRepository;
import ddd.group21.repository.CustomerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@CrossOrigin
@RequestMapping("/customers/{id}/creditcards")
public class CustomersCreditCardsController {

  private final CreditCardMapper creditCardMapper = CreditCardMapper.INSTANCE;

  private final CreditCardRepository creditCardRepository;
  private final CustomerRepository customerRepository;
  private final AddressRepository addressRepository;

  public CustomersCreditCardsController(CreditCardRepository creditCardRepository,
                                        CustomerRepository customerRepository,
                                        AddressRepository addressRepository) {
    this.creditCardRepository = creditCardRepository;
    this.customerRepository = customerRepository;
    this.addressRepository = addressRepository;
  }

  @GetMapping
  public ResponseEntity<Object> getCreditCards(@PathVariable("id") String customerId) {
    if (customerId == null || customerId.isEmpty() || !customerId.matches("\\d+")) {
      return ResponseEntity.status(400).body("Invalid customer id");
    }

    return ResponseEntity.ok(
        creditCardRepository.findByCustomer_Id(Long.valueOf(customerId)).stream().map(
            creditCard -> creditCardMapper.creditCardToCreditCardDTO(creditCard,
                new CycleAvoidingMappingContext())));
  }

  @PutMapping
  public ResponseEntity<Object> addCreditCard(@PathVariable("id") String customerId,
                                              @RequestBody CreditCardDTO creditCard) {
    if (customerId == null || customerId.isEmpty() || !customerId.matches("\\d+")) {
      return ResponseEntity.status(400).body("Invalid customer id");
    }

    if (creditCard == null) {
      return ResponseEntity.status(400).body("Credit card is null");
    }

    // get customer
    Customer customer = customerRepository.findById(Long.parseLong(customerId)).orElse(null);

    if (customer == null) {
      return ResponseEntity.status(404).body("Customer " + customerId + " does not exist");
    }

    // get address
    Address paymentAddress =
        addressRepository.findById(creditCard.getPaymentAddressId()).orElse(null);

    if (paymentAddress == null) {
      return ResponseEntity.status(404)
          .body("Payment address " + creditCard.getPaymentAddressId() + " does not exist");
    }

    CreditCard creditCardEntity =
        creditCardMapper.creditCardDTOToCreditCard(creditCard, customer, paymentAddress);

    creditCardRepository.save(creditCardEntity);

    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{creditCardId}")
  public ResponseEntity<Object> deleteCreditCard(@PathVariable("id") String customerId,
                                                 @PathVariable("creditCardId")
                                                 String creditCardId) {
    if (customerId == null || customerId.isEmpty() || !customerId.matches("\\d+")) {
      return ResponseEntity.status(400).body("Invalid customer id");
    }

    if (creditCardId == null || creditCardId.isEmpty() || !creditCardId.matches("\\d+")) {
      return ResponseEntity.status(400).body("Invalid credit card id");
    }

    creditCardRepository.deleteById(Long.parseLong(creditCardId));

    return ResponseEntity.ok().build();
  }

  @PostMapping("/{creditCardId}")
  public ResponseEntity<Object> postCreditCard(@PathVariable("id") String customerId,
                                               @PathVariable("creditCardId") String creditCardId,
                                               @RequestParam(name = "action", required = false)
                                               String action) {
    if (customerId == null || customerId.isEmpty() || !customerId.matches("\\d+")) {
      return ResponseEntity.status(400).body("Invalid customer id");
    }

    CreditCard creditCard =
        creditCardRepository.findById(Long.parseLong(creditCardId)).orElse(null);

    if (creditCard == null) {
      return ResponseEntity.status(404).body("Credit card " + creditCardId + " does not exist");
    }

    if (action.equals("set-default")) {
      creditCardRepository.setAllDefaultFalse(creditCard.getCustomer().getId());
      creditCard.setDefault(true);
      creditCardRepository.save(creditCard);
    }

    return ResponseEntity.ok().build();
  }
}
