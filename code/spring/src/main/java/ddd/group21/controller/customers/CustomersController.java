package ddd.group21.controller.customers;

import ddd.group21.repository.CustomerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@CrossOrigin
@RequestMapping("/customers")
public class CustomersController {

  private final CustomerRepository customersRepository;

  public CustomersController(CustomerRepository customersRepository) {
    this.customersRepository = customersRepository;
  }

  @GetMapping
  public ResponseEntity<Object> getCustomers(@RequestParam("keycloak_id") String keycloakId) {
    if (keycloakId != null && !keycloakId.isEmpty()) {
      return ResponseEntity.ok(customersRepository.getByUserAccount_KeycloakId(keycloakId));
    }
    return ResponseEntity.ok(customersRepository.findAll());
  }
}
