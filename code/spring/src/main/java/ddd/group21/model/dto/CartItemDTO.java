package ddd.group21.model.dto;

import java.math.BigDecimal;

public class CartItemDTO {

  private String id;

  private String productId;

  private String name;

  private BigDecimal price;

  private int quantity;

  public CartItemDTO(String id, String productId, String name, BigDecimal price, int quantity) {
    this.id = id;
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getProductId() {
    return productId;
  }

  public void setProductId(String productId) {
    this.productId = productId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }
}
