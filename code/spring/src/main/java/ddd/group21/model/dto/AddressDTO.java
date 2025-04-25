package ddd.group21.model.dto;

import ddd.group21.model.AddressType;

public class AddressDTO {

  private Long id;

  private Long userAccountId;

  private AddressType addressType;

  private String streetAddress;

  private String city;

  private String state;

  private String postalCode;

  private String country;

  private boolean isDefault;

  public AddressDTO(Long id, Long userAccountId, AddressType addressType, String streetAddress,
                    String city, String state, String postalCode, String country,
                    boolean isDefault) {
    this.id = id;
    this.userAccountId = userAccountId;
    this.addressType = addressType;
    this.streetAddress = streetAddress;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
    this.isDefault = isDefault;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getUserAccountId() {
    return userAccountId;
  }

  public void setUserAccountId(Long userAccountId) {
    this.userAccountId = userAccountId;
  }

  public AddressType getAddressType() {
    return addressType;
  }

  public void setAddressType(AddressType addressType) {
    this.addressType = addressType;
  }

  public String getStreetAddress() {
    return streetAddress;
  }

  public void setStreetAddress(String streetAddress) {
    this.streetAddress = streetAddress;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public String getPostalCode() {
    return postalCode;
  }

  public void setPostalCode(String postalCode) {
    this.postalCode = postalCode;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public boolean isDefault() {
    return isDefault;
  }

  public void setDefault(boolean aDefault) {
    isDefault = aDefault;
  }
}