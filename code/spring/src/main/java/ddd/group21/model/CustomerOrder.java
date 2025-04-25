package ddd.group21.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "customerorder")
public class CustomerOrder {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "order_id")
  private Long id;

  @JoinColumn(name = "customer_id", nullable = false)
  @OneToOne
  private Customer customer;

  @Column(name = "order_date", nullable = false)
  private Timestamp orderDate;

  @Column(name = "order_status", nullable = false)
  @Enumerated(EnumType.STRING)
  private OrderStatus orderStatus;

  @JoinColumn(name = "card_id", nullable = false)
  @ManyToOne(fetch = FetchType.EAGER, optional = false)
  private CreditCard creditCard;

  @Digits(integer = 10, fraction = 2)
  @Column(name = "total_amount", precision = 10, scale = 2, nullable = false)
  private BigDecimal totalAmount;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Customer getCustomer() {
    return customer;
  }

  public void setCustomer(Customer customer) {
    this.customer = customer;
  }

  public Timestamp getOrderDate() {
    return orderDate;
  }

  public void setOrderDate(Timestamp orderDate) {
    this.orderDate = orderDate;
  }

  public OrderStatus getOrderStatus() {
    return orderStatus;
  }

  public void setOrderStatus(OrderStatus orderStatus) {
    this.orderStatus = orderStatus;
  }

  public CreditCard getCreditCard() {
    return creditCard;
  }

  public void setCreditCard(CreditCard creditCard) {
    this.creditCard = creditCard;
  }

  public BigDecimal getTotalAmount() {
    return totalAmount;
  }

  public void setTotalAmount(BigDecimal totalAmount) {
    this.totalAmount = totalAmount;
  }
}
