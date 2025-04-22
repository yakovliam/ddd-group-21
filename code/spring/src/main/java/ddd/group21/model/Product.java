package ddd.group21.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "product")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "product_id")
  private Long id;

  @JoinColumn(name = "category_id", nullable = false)
  @OneToOne
  private ProductCategory category;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "brand", nullable = false)
  private String brand;

  @Column(name = "description", nullable = false)
  private String description;

  @Column(name = "size", nullable = false)
  private String size;

  @Digits(integer = 10, fraction = 2)
  @Column(name = "weight", precision = 10, scale = 2, nullable = false)
  private BigDecimal weight;

  @Digits(integer = 10, fraction = 2)
  @Column(name = "current_price", precision = 10, scale = 2, nullable = false)
  private BigDecimal currentPrice;

  @Column(name = "image_url", nullable = false)
  private String imageUrl;

  @Column(name = "creation_date", nullable = false)
  private Timestamp creationDate;

  @Column(name = "last_updated", nullable = false)
  private Timestamp lastUpdated;

  @Column(name = "product_type", nullable = false)
  private String productType;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public ProductCategory getCategory() {
    return category;
  }

  public void setCategory(ProductCategory category) {
    this.category = category;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getBrand() {
    return brand;
  }

  public void setBrand(String brand) {
    this.brand = brand;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getSize() {
    return size;
  }

  public void setSize(String size) {
    this.size = size;
  }

  public BigDecimal getWeight() {
    return weight;
  }

  public void setWeight(BigDecimal weight) {
    this.weight = weight;
  }

  public BigDecimal getCurrentPrice() {
    return currentPrice;
  }

  public void setCurrentPrice(BigDecimal currentPrice) {
    this.currentPrice = currentPrice;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public Timestamp getCreationDate() {
    return creationDate;
  }

  public void setCreationDate(Timestamp creationDate) {
    this.creationDate = creationDate;
  }

  public Timestamp getLastUpdated() {
    return lastUpdated;
  }

  public void setLastUpdated(Timestamp lastUpdated) {
    this.lastUpdated = lastUpdated;
  }

  public String getProductType() {
    return productType;
  }

  public void setProductType(String productType) {
    this.productType = productType;
  }
}
