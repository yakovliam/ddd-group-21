package ddd.group21.repository;

import ddd.group21.model.Address;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

  Set<Address> findByUserAccount_Id(Long userAccountId);

  @Query("update Address a set a.isDefault = false where a.userAccount.id = :userAccountId")
  @Modifying
  @Transactional
  void setAllDefaultFalse(Long userAccountId);

  @Query("select a from Address a where a.userAccount.id = :userAccountId and a.isDefault = :isDefault")
  Optional<Address> findByUserAccount_IdAndDefaultIs(Long userAccountId, boolean isDefault);
}
