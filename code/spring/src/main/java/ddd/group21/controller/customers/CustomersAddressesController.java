package ddd.group21.controller.customers;

import ddd.group21.model.Address;
import ddd.group21.model.Customer;
import ddd.group21.model.UserAccount;
import ddd.group21.model.dto.AddressDTO;
import ddd.group21.model.mapper.AddressMapper;
import ddd.group21.model.mapper.CycleAvoidingMappingContext;
import ddd.group21.repository.AddressRepository;
import ddd.group21.repository.CustomerRepository;
import ddd.group21.repository.UserAccountRepository;
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
@RequestMapping("/customers/{id}/addresses")
public class CustomersAddressesController {

  private final AddressMapper addressMapper = AddressMapper.INSTANCE;

  private final AddressRepository addressRepository;
  private final CustomerRepository customerRepository;
  private final UserAccountRepository userAccountRepository;

  public CustomersAddressesController(AddressRepository addressRepository,
                                      CustomerRepository customerRepository,
                                      UserAccountRepository userAccountRepository) {
    this.addressRepository = addressRepository;
    this.customerRepository = customerRepository;
    this.userAccountRepository = userAccountRepository;
  }

  @GetMapping
  public ResponseEntity<Object> getAddresses(@PathVariable("id") String customerId) {
    if (customerId == null || customerId.isEmpty() || !customerId.matches("\\d+")) {
      return ResponseEntity.status(400).body("Invalid customer id");
    }

    Customer customer = customerRepository.findById(Long.parseLong(customerId)).orElse(null);

    if (customer == null) {
      return ResponseEntity.status(404).body("Customer " + customerId + " does not exist");
    }

    UserAccount userAccount = customer.getUserAccount();

    if (userAccount == null) {
      return ResponseEntity.status(404)
          .body("User account for customer " + customerId + " does not exist");
    }

    return ResponseEntity.ok(addressRepository.findByUserAccount_Id(userAccount.getId()).stream()
        .map(address -> addressMapper.addressToAddressDTO(address,
            new CycleAvoidingMappingContext())));
  }

  @PutMapping
  public ResponseEntity<Object> addAddress(@PathVariable("id") String customerId,
                                           @RequestBody AddressDTO address) {
    if (customerId == null || customerId.isEmpty() || !customerId.matches("\\d+")) {
      return ResponseEntity.status(400).body("Invalid customer id");
    }

    if (address == null) {
      return ResponseEntity.status(400).body("Address is null");
    }

    Customer customer = customerRepository.findById(Long.parseLong(customerId)).orElse(null);

    if (customer == null) {
      return ResponseEntity.status(404).body("Customer " + customerId + " does not exist");
    }

    UserAccount userAccount = customer.getUserAccount();

    Address addressEntity = addressMapper.addressDTOToAddress(address, userAccount);

    addressRepository.save(addressEntity);

    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{addressId}")
  public ResponseEntity<Object> deleteAddress(@PathVariable("id") String customerId,
                                              @PathVariable("addressId") String addressId) {
    if (customerId == null || customerId.isEmpty() || !customerId.matches("\\d+")) {
      return ResponseEntity.status(400).body("Invalid customer id");
    }

    if (addressId == null || addressId.isEmpty() || !addressId.matches("\\d+")) {
      return ResponseEntity.status(400).body("Invalid address id");
    }

    addressRepository.deleteById(Long.parseLong(addressId));

    return ResponseEntity.ok().build();
  }

  @PostMapping("/{addressId}")
  public ResponseEntity<Object> updateAddress(@PathVariable("id") String customerId,
                                              @PathVariable("addressId") String addressId,
                                              @RequestParam(name = "action", required = false)
                                              String action) {
    if (customerId == null || customerId.isEmpty() || !customerId.matches("\\d+")) {
      return ResponseEntity.status(400).body("Invalid customer id");
    }

    if (addressId == null || addressId.isEmpty() || !addressId.matches("\\d+")) {
      return ResponseEntity.status(400).body("Invalid address id");
    }

    Address address = addressRepository.findById(Long.parseLong(addressId)).orElse(null);

    if (address == null) {
      return ResponseEntity.status(404).body("Address " + addressId + " does not exist");
    }

    if (action.equals("set-default")) {
      addressRepository.setAllDefaultFalse(address.getUserAccount().getId());
      address.setDefault(true);
      addressRepository.save(address);
    }

    return ResponseEntity.ok().build();
  }
}
