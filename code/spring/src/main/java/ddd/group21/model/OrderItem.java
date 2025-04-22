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
@Table(name = "orderitem")
public class OrderItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "order_item_id")
  private Long id;

  @JoinColumn(name = "order_id", nullable = false)
  @ManyToOne
  private CustomerOrder customerOrder;

  @JoinColumn(name = "product_id", nullable = false)
  @ManyToOne
  private Product product;

  @Column(name = "quantity", nullable = false)
  private int quantity;

  @Digits(integer = 10, fraction = 2)
  @Column(name = "price_at_purchase", precision = 10, scale = 2, nullable = false)
  private BigDecimal priceAtPurchase;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public CustomerOrder getCustomerOrder() {
    return customerOrder;
  }

  public void setCustomerOrder(CustomerOrder customerOrder) {
    this.customerOrder = customerOrder;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public BigDecimal getPriceAtPurchase() {
    return priceAtPurchase;
  }

  public void setPriceAtPurchase(BigDecimal priceAtPurchase) {
    this.priceAtPurchase = priceAtPurchase;
  }
}
