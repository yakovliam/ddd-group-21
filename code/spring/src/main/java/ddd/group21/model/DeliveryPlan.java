package ddd.group21.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "deliveryplan")
public class DeliveryPlan {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "delivery_id")
  private Long id;

  @JoinColumn(name = "order_id", nullable = false)
  @OneToOne
  private CustomerOrder customerOrder;

  @Column(name = "delivery_type", nullable = false)
  @Enumerated(EnumType.STRING)
  private DeliveryType deliveryType;

  @Digits(integer = 10, fraction = 2)
  @Column(name = "delivery_price", precision = 10, scale = 2, nullable = false)
  private BigDecimal deliveryPrice;

  @Column(name = "ship_date", nullable = false)
  private LocalDate shipDate;

  @Column(name = "delivery_date", nullable = false)
  private LocalDate deliveryDate;

  @JoinColumn(name = "delivery_address_id", nullable = false)
  @ManyToOne
  private Address deliveryAddress;

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

  public DeliveryType getDeliveryType() {
    return deliveryType;
  }

  public void setDeliveryType(DeliveryType deliveryType) {
    this.deliveryType = deliveryType;
  }

  public BigDecimal getDeliveryPrice() {
    return deliveryPrice;
  }

  public void setDeliveryPrice(BigDecimal deliveryPrice) {
    this.deliveryPrice = deliveryPrice;
  }

  public LocalDate getShipDate() {
    return shipDate;
  }

  public void setShipDate(LocalDate shipDate) {
    this.shipDate = shipDate;
  }

  public LocalDate getDeliveryDate() {
    return deliveryDate;
  }

  public void setDeliveryDate(LocalDate deliveryDate) {
    this.deliveryDate = deliveryDate;
  }

  public Address getDeliveryAddress() {
    return deliveryAddress;
  }

  public void setDeliveryAddress(Address deliveryAddress) {
    this.deliveryAddress = deliveryAddress;
  }
}
