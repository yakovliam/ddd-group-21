package ddd.group21.model.dto;

import ddd.group21.model.Product;
import ddd.group21.model.Supplier;

import java.math.BigDecimal;

public class SupplierProductDTO {
    private Long id;

    private Supplier supplier;

    private Product product;

    private BigDecimal price;

    private int minimumOrderQuantity;

    private int leadTimeDays;
    public SupplierProductDTO(Long id, Supplier supplier, Product product, BigDecimal price, int minimumOrderQuantity, int leadTimeDays) {
        this.id = id;
        this.supplier = supplier;
        this.product = product;
        this.price = price;
        this.minimumOrderQuantity = minimumOrderQuantity;
        this.leadTimeDays = leadTimeDays;
    }
    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public Supplier getSupplier() {return supplier;}
    public void setSupplier(Supplier supplier) {this.supplier = supplier;}
    public Product getProduct() {return product;}
    public void setProduct(Product product) {this.product = product;}
    public BigDecimal getPrice() {return price;}
    public void setPrice(BigDecimal price) {this.price = price;}
    public int getMinimumOrderQuantity() {return minimumOrderQuantity;}
    public void setMinimumOrderQuantity(int minimumOrderQuantity) {
        this.minimumOrderQuantity = minimumOrderQuantity;
    }
    public int getLeadTimeDays() {return leadTimeDays;}
    public void setLeadTimeDays(int leadTimeDays) {
        this.leadTimeDays = leadTimeDays;
    }
}
