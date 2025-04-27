package ddd.group21.model.dto;

import java.math.BigDecimal;

public class CreateProductDTO {

  private Long id;

  private Long categoryId;

  private String name;

  private String brand;

  private String description;

  private String size;

  private BigDecimal weight;

  private BigDecimal currentPrice;

  private String imageUrl;

  private String productType;

  public CreateProductDTO(Long id, Long categoryId, String name, String brand, String description,
                          String size, BigDecimal weight, BigDecimal currentPrice, String imageUrl,
                          String productType) {
    this.id = id;
    this.categoryId = categoryId;
    this.name = name;
    this.brand = brand;
    this.description = description;
    this.size = size;
    this.weight = weight;
    this.currentPrice = currentPrice;
    this.imageUrl = imageUrl;
    this.productType = productType;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(Long categoryId) {
    this.categoryId = categoryId;
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

  public String getProductType() {
    return productType;
  }

  public void setProductType(String productType) {
    this.productType = productType;
  }
}