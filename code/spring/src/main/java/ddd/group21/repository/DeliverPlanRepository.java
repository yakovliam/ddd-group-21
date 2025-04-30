package ddd.group21.repository;

import ddd.group21.model.DeliveryPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliverPlanRepository extends JpaRepository<DeliveryPlan, Long> {
}
