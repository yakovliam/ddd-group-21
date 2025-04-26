package ddd.group21.model.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class WarehouseDTO {
    private Long id;


    private String warehouseName;

    private Integer quantity;

    private BigDecimal unitSize;

    private Timestamp lastRestocked;

    public WarehouseDTO(Long id, String warehouseName, Integer quantity, BigDecimal unitSize, Timestamp lastRestocked) {
        this.id = id;
        this.warehouseName = warehouseName;
        this.quantity = quantity;
        this.unitSize = unitSize;
        this.lastRestocked = lastRestocked;
    }

}
