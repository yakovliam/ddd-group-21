package ddd.group21.model.dto;

import ddd.group21.model.Product;
import ddd.group21.model.Supplier;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Digits;

import java.math.BigDecimal;

public class SupplierDTO {

    private Long id;

    private Supplier supplier;

    private Product product;

    private BigDecimal price;

    private int minimumOrderQuantity;

    private int leadTimeDays;

    public SupplierDTO(Long id, Supplier supplier, Product product, BigDecimal price, int minimumOrderQuantity, int leadTimeDays) {
        this.id = id;
        this.supplier = supplier;
        this.product = product;
        this.price = price;
        this.minimumOrderQuantity = minimumOrderQuantity;
        this.leadTimeDays = leadTimeDays;
    }
    public Long getId() {return id;}
    public Supplier getSupplier() {return supplier;}
    public Product getProduct() {return product;}
    public BigDecimal getPrice() {return price;}
    public int getMinimumOrderQuantity() {return minimumOrderQuantity;}
    public int getLeadTimeDays() {return leadTimeDays;}

    public void setId(Long id) {this.id = id;}
    public void setSupplier(Supplier supplier) {this.supplier = supplier;}
    public void setProduct(Product product) {this.product = product;}
    public void setPrice(BigDecimal price) {this.price = price;}
    public void setMinimumOrderQuantity(int minimumOrderQuantity) {
        this.minimumOrderQuantity = minimumOrderQuantity;

    }
    public void setLeadTimeDays(int leadTimeDays) {
        this.leadTimeDays = leadTimeDays;
    }
}
