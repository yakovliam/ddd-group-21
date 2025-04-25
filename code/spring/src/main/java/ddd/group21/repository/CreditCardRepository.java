package ddd.group21.repository;

import ddd.group21.model.CreditCard;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {

  Set<CreditCard> findByCustomer_Id(Long customerId);

}
