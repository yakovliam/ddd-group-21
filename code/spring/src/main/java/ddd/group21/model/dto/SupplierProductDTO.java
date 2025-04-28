package ddd.group21.model.dto;

import java.math.BigDecimal;

public class SupplierProductDTO {

  private Long id;

  private Long supplierId;

  private Long productId;

  private BigDecimal price;

  private int minimumOrderQuantity;

  private int leadTimeDays;

  public SupplierProductDTO(Long id, Long supplierId, Long productId, BigDecimal price,
                            int minimumOrderQuantity, int leadTimeDays) {
    this.id = id;
    this.supplierId = supplierId;
    this.productId = productId;
    this.price = price;
    this.minimumOrderQuantity = minimumOrderQuantity;
    this.leadTimeDays = leadTimeDays;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getSupplierId() {
    return supplierId;
  }

  public void setSupplierId(Long supplierId) {
    this.supplierId = supplierId;
  }

  public Long getProductId() {
    return productId;
  }

  public void setProductId(Long productId) {
    this.productId = productId;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public int getMinimumOrderQuantity() {
    return minimumOrderQuantity;
  }

  public void setMinimumOrderQuantity(int minimumOrderQuantity) {
    this.minimumOrderQuantity = minimumOrderQuantity;
  }

  public int getLeadTimeDays() {
    return leadTimeDays;
  }

  public void setLeadTimeDays(int leadTimeDays) {
    this.leadTimeDays = leadTimeDays;
  }
}
