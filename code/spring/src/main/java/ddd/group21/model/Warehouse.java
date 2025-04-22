package ddd.group21.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "warehouse")
public class Warehouse {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "warehouse_id")
  private Long id;

  @Column(name = "warehouse_name", nullable = false)
  private String warehouseName;

  @Column(name = "quantity", nullable = false)
  private Integer quantity;

  @Digits(integer = 10, fraction = 2)
  @Column(name = "unit_size", precision = 10, scale = 2, nullable = false)
  private BigDecimal unitSize;

  @Column(name = "last_restocked", nullable = false)
  private Timestamp lastRestocked;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getWarehouseName() {
    return warehouseName;
  }

  public void setWarehouseName(String warehouseName) {
    this.warehouseName = warehouseName;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public BigDecimal getUnitSize() {
    return unitSize;
  }

  public void setUnitSize(BigDecimal unitSize) {
    this.unitSize = unitSize;
  }

  public Timestamp getLastRestocked() {
    return lastRestocked;
  }

  public void setLastRestocked(Timestamp lastRestocked) {
    this.lastRestocked = lastRestocked;
  }
}
