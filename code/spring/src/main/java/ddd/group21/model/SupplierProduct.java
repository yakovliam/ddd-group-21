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

@Entity
@Table(name = "supplierproduct")
public class SupplierProduct {

  @Id
  @GeneratedValue(
      strategy = GenerationType.IDENTITY)
  @Column(name = "supplier_product_id")
  private Long id;

  @JoinColumn(name = "supplier_id", nullable = false)
  @ManyToOne
  private Supplier supplier;

  @JoinColumn(name = "product_id", nullable = false)
  @ManyToOne
  private Product product;

  @Digits(integer = 10, fraction = 2)
  @Column(name = "supplier_price", precision = 10, scale = 2, nullable = false)
  private BigDecimal price;

  @Column(name = "minimum_order_quantity", nullable = false)
  private int minimumOrderQuantity;

  @Column(name = "lead_time_days", nullable = false)
  private int leadTimeDays;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Supplier getSupplier() {
    return supplier;
  }

  public void setSupplier(Supplier supplier) {
    this.supplier = supplier;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public int getMinimumOrderQuantity() {
    return minimumOrderQuantity;
  }

  public void setMinimumOrderQuantity(int minimumOrderQuantity) {
    this.minimumOrderQuantity = minimumOrderQuantity;
  }

  public int getLeadTimeDays() {
    return leadTimeDays;
  }

  public void setLeadTimeDays(int leadTimeDays) {
    this.leadTimeDays = leadTimeDays;
  }
}
