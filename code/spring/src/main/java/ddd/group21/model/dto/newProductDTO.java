package ddd.group21.model.dto;

import ddd.group21.model.ProductCategory;
import java.math.BigDecimal;
import java.sql.Timestamp;

public class newProductDTO {

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
    private String warehouseid;
    private String supplierid;
    private int stock;

    public newProductDTO(Long id, ProductCategory category, String name, String brand,
                      String description,
                      String size, BigDecimal weight, BigDecimal currentPrice, String imageUrl,
                      Timestamp creationDate, Timestamp lastUpdated, String productType, Integer stock, String warehouseid, String supplierid) {
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
        this.warehouseid = warehouseid;
        this.supplierid = supplierid;
        this.stock = stock;

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

    public void setProductType(String productType) {
        this.productType = productType;
    }
    public String getWarehouseid() {return warehouseid;}
    public void setWarehouseid(String warehouseid) {this.warehouseid = warehouseid;}
    public String getSupplierid() {return supplierid;}
    public void setSupplierid(String supplierid) {this.supplierid = supplierid;}
    public int getStock() {return stock;}
    public void setStock(int stock) {this.stock = stock;}
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
