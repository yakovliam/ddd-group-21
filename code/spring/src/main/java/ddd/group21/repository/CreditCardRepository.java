package ddd.group21.repository;

import ddd.group21.model.CreditCard;
import ddd.group21.model.Customer;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {

  Set<CreditCard> findByCustomer_Id(Long customerId);

  Optional<CreditCard> findByCustomerAndDefault(Customer customer, boolean aDefault);

  @Modifying
  @Transactional
  @Query("update CreditCard c set c.isDefault = false where c.customer.id = :customerId")
  void setAllDefaultFalse(Long customerId);
}
