package ddd.group21.repository;

import ddd.group21.model.Address;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

  Set<Address> findByUserAccount_Id(Long userAccountId);

}
