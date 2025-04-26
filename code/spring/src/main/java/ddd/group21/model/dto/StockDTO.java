package ddd.group21.model.dto;

import ddd.group21.model.Product;
import ddd.group21.model.Warehouse;
import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class StockDTO {

    private Long id;

    private Product product;

    private Warehouse warehouse;

    private int quantity;

    private BigDecimal unitSize;

    private Timestamp lastRestocked;
public StockDTO(Long id, Product product, Warehouse warehouse, int quantity, BigDecimal unitSize) {
    this.id = id;
    this.product = product;
    this.warehouse = warehouse;
    this.quantity = quantity;
    this.unitSize = unitSize;
    this.lastRestocked = new Timestamp(System.currentTimeMillis());
}
public Long getId() {return this.id;}
    public Product getProduct() {return this.product;}
    public Warehouse getWarehouse() {return this.warehouse;}
    public int getQuantity() {return this.quantity;}
    public BigDecimal getUnitSize() {return this.unitSize;}
    public Timestamp getLastRestocked() {return this.lastRestocked;}
    public void setId(Long id) {this.id = id;}
    public void setProduct(Product product) {this.product = product;}
    public void setWarehouse(Warehouse warehouse) {this.warehouse = warehouse;}
    public void setQuantity(int quantity) {this.quantity = quantity;}
    public void setUnitSize(BigDecimal unitSize) {this.unitSize = unitSize;}

}
