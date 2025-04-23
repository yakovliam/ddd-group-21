package ddd.group21.repository;

import ddd.group21.model.Customer;
import ddd.group21.model.CustomerOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerOrdersRepository extends JpaRepository<CustomerOrder, Long> {

  Page<CustomerOrder> getByCustomer_Id(Long customerId, Pageable pageable);

  Page<CustomerOrder> getByCustomer(Customer customer, Pageable pageable);
}
