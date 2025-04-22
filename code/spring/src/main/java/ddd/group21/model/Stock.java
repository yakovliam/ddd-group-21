package ddd.group21.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "stock")
public class Stock {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "stock_id")
  private Long id;

  @JoinColumn(name = "product_id", nullable = false)
  @ManyToOne
  private Product product;

  @JoinColumn(name = "warehouse_id", nullable = false)
  @ManyToOne
  private Warehouse warehouse;

  @Column(name = "quantity", nullable = false)
  private int quantity;

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

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public Warehouse getWarehouse() {
    return warehouse;
  }

  public void setWarehouse(Warehouse warehouse) {
    this.warehouse = warehouse;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
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
