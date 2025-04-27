package ddd.group21.repository;

import ddd.group21.model.SupplierProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierProductRepository extends JpaRepository<SupplierProduct, Long> {
}
