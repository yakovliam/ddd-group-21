package ddd.group21.model.dto;

import java.math.BigDecimal;

public class StockDTO {

  private Long id;

  private Long productId;

  private Long warehouseId;

  private int quantity;

  private BigDecimal unitSize;

  public StockDTO(Long id, Long productId, Long warehouseId, int quantity, BigDecimal unitSize) {
    this.id = id;
    this.productId = productId;
    this.warehouseId = warehouseId;
    this.quantity = quantity;
    this.unitSize = unitSize;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getProductId() {
    return productId;
  }

  public void setProductId(Long productId) {
    this.productId = productId;
  }

  public Long getWarehouseId() {
    return warehouseId;
  }

  public void setWarehouseId(Long warehouseId) {
    this.warehouseId = warehouseId;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public BigDecimal getUnitSize() {
    return unitSize;
  }

  public void setUnitSize(BigDecimal unitSize) {
    this.unitSize = unitSize;
  }
}
