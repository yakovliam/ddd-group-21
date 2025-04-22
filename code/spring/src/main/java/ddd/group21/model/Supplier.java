package ddd.group21.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "supplier")
public class Supplier {

  @Id
  @GeneratedValue(
      strategy = GenerationType.IDENTITY)
  @Column(name = "supplier_id")
  private Long id;

  @Column(name = "supplier_name", nullable = false)
  private String supplierName;

  @JoinColumn(name = "address_id", nullable = false)
  @ManyToOne
  private Address address;

  @Column(name = "contact_name", nullable = false)
  private String contactName;

  @Column(name = "contact_email", nullable = false)
  private String contactEmail;

  @Column(name = "contact_phone", nullable = false)
  private String contactPhone;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getSupplierName() {
    return supplierName;
  }

  public void setSupplierName(String supplierName) {
    this.supplierName = supplierName;
  }

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  public String getContactName() {
    return contactName;
  }

  public void setContactName(String contactName) {
    this.contactName = contactName;
  }

  public String getContactEmail() {
    return contactEmail;
  }

  public void setContactEmail(String contactEmail) {
    this.contactEmail = contactEmail;
  }

  public String getContactPhone() {
    return contactPhone;
  }

  public void setContactPhone(String contactPhone) {
    this.contactPhone = contactPhone;
  }
}
