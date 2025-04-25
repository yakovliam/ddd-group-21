package ddd.group21.model.dto;

import ddd.group21.model.OrderStatus;
import java.math.BigDecimal;
import java.sql.Timestamp;

public class CustomerOrderDTO {

  private Long id;

  private Long customerId;

  private Timestamp orderDate;

  private OrderStatus orderStatus;

  private Long creditCardId;

  private BigDecimal totalAmount;

  public CustomerOrderDTO(Long id, Long customerId, Timestamp orderDate, OrderStatus orderStatus,
                          Long creditCardId, BigDecimal totalAmount) {
    this.id = id;
    this.customerId = customerId;
    this.orderDate = orderDate;
    this.orderStatus = orderStatus;
    this.creditCardId = creditCardId;
    this.totalAmount = totalAmount;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getCustomerId() {
    return customerId;
  }

  public void setCustomerId(Long customerId) {
    this.customerId = customerId;
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

  public Long getCreditCardId() {
    return creditCardId;
  }

  public void setCreditCardId(Long creditCardId) {
    this.creditCardId = creditCardId;
  }

  public BigDecimal getTotalAmount() {
    return totalAmount;
  }

  public void setTotalAmount(BigDecimal totalAmount) {
    this.totalAmount = totalAmount;
  }
}
