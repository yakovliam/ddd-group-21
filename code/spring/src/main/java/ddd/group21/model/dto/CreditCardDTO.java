package ddd.group21.model.dto;

public class CreditCardDTO {

  private Long id;

  private Long customerId;

  private String cardNumber;

  private String cardholderName;

  private String expirationDate;

  private String cvv;

  private Long paymentAddressId;

  private boolean isDefault;

  public CreditCardDTO(Long id, Long customerId, String cardNumber, String cardholderName,
                       String expirationDate, String cvv, Long paymentAddressId,
                       boolean isDefault) {
    this.id = id;
    this.customerId = customerId;
    this.cardNumber = cardNumber;
    this.cardholderName = cardholderName;
    this.expirationDate = expirationDate;
    this.cvv = cvv;
    this.paymentAddressId = paymentAddressId;
    this.isDefault = isDefault;
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

  public Long getPaymentAddressId() {
    return paymentAddressId;
  }

  public void setPaymentAddressId(Long paymentAddressId) {
    this.paymentAddressId = paymentAddressId;
  }

  public boolean isDefault() {
    return isDefault;
  }

  public void setDefault(boolean aDefault) {
    isDefault = aDefault;
  }
}