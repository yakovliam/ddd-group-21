package ddd.group21.repository;

import ddd.group21.model.Customer;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

  Set<Customer> getByUserAccount_KeycloakId(String userAccountKeycloakId);

}
