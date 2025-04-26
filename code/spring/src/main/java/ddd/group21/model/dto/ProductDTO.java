package ddd.group21.model.dto;

import ddd.group21.model.ProductCategory;
import java.math.BigDecimal;
import java.sql.Timestamp;

public class ProductDTO {

  private Long id;

  private ProductCategory category;

  private String name;

  private String brand;

  private String description;

  private String size;

  private BigDecimal weight;

  private BigDecimal currentPrice;

  private String imageUrl;

  private Timestamp creationDate;

  private Timestamp lastUpdated;

  private String productType;


  public ProductDTO(Long id, ProductCategory category, String name, String brand,
                    String description,
                    String size, BigDecimal weight, BigDecimal currentPrice, String imageUrl,
                    Timestamp creationDate, Timestamp lastUpdated, String productType) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.brand = brand;
    this.description = description;
    this.size = size;
    this.weight = weight;
    this.currentPrice = currentPrice;
    this.imageUrl = imageUrl;
    this.creationDate = creationDate;
    this.lastUpdated = lastUpdated;
    this.productType = productType;

  }

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

  @Override
  public String toString() {
    return "ProductDTO{" +
            "id=" + id +
            ", category=" + (category != null ? category.getId() : null) +
            ", name='" + name + '\'' +
            ", brand='" + brand + '\'' +
            ", description='" + description + '\'' +
            ", size='" + size + '\'' +
            ", weight=" + weight +
            ", currentPrice=" + currentPrice +
            ", imageUrl='" + imageUrl + '\'' +
            ", creationDate=" + creationDate +
            ", lastUpdated=" + lastUpdated +
            ", productType='" + productType + '\'' +
            '}';
  }
}
