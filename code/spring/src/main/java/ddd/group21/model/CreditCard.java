package ddd.group21.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "creditcard")
public class CreditCard {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "card_id")
  private Long id;

  @JoinColumn(name = "customer_id", nullable = false)
  @OneToOne
  private Customer customer;

  @Column(name = "card_number", nullable = false)
  private String cardNumber;

  @Column(name = "cardholder_name", nullable = false)
  private String cardholderName;

  @Column(name = "expiration_date", nullable = false)
  private String expirationDate;

  @Column(name = "cvv", nullable = false)
  private String cvv;

  @JoinColumn(name = "payment_address_id", nullable = false)
  @OneToOne
  private Address paymentAddressId;

  @Column(name = "is_default", nullable = false)
  private boolean isDefault;

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

  public String getCardNumber() {
    return cardNumber;
  }

  public void setCardNumber(String cardNumber) {
    this.cardNumber = cardNumber;
  }

  public String getCardholderName() {
    return cardholderName;
  }

  public void setCardholderName(String cardholderName) {
    this.cardholderName = cardholderName;
  }

  public String getExpirationDate() {
    return expirationDate;
  }

  public void setExpirationDate(String expirationDate) {
    this.expirationDate = expirationDate;
  }

  public String getCvv() {
    return cvv;
  }

  public void setCvv(String cvv) {
    this.cvv = cvv;
  }

  public Address getPaymentAddressId() {
    return paymentAddressId;
  }

  public void setPaymentAddressId(Address paymentAddressId) {
    this.paymentAddressId = paymentAddressId;
  }

  public boolean isDefault() {
    return isDefault;
  }

  public void setDefault(boolean aDefault) {
    isDefault = aDefault;
  }
}