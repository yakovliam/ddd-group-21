package ddd.group21.model.dto;

import java.math.BigDecimal;

public class WarehouseDTO {

  private Long id;

  private String warehouseName;

  private Long addressId;

  private BigDecimal capacity;

  public WarehouseDTO(Long id, String warehouseName, Long addressId, BigDecimal capacity) {
    this.id = id;
    this.warehouseName = warehouseName;
    this.addressId = addressId;
    this.capacity = capacity;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getWarehouseName() {
    return warehouseName;
  }

  public void setWarehouseName(String warehouseName) {
    this.warehouseName = warehouseName;
  }

  public Long getAddressId() {
    return addressId;
  }

  public void setAddressId(Long addressId) {
    this.addressId = addressId;
  }

  public BigDecimal getCapacity() {
    return capacity;
  }

  public void setCapacity(BigDecimal capacity) {
    this.capacity = capacity;
  }
}
