package ddd.group21.model.mapper;

import ddd.group21.model.Stock;
import ddd.group21.model.dto.StockDTO;
import java.sql.Timestamp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface StockMapper {

  StockMapper INSTANCE = Mappers.getMapper(StockMapper.class);

  @Mapping(target = "productId", source = "stock.product.id")
  @Mapping(target = "warehouseId", source = "stock.warehouse.id")
  StockDTO stockToStockDTO(Stock stock, CycleAvoidingMappingContext context);

  @Mapping(target = "product", source = "product")
  @Mapping(target = "warehouse", source = "warehouse")
  @Mapping(target = "id", source = "stockDTO.id")
  @Mapping(target = "lastRestocked", source = "lastRestocked")
  Stock stockDTOToStock(StockDTO stockDTO, ddd.group21.model.Product product,
                        ddd.group21.model.Warehouse warehouse, Timestamp lastRestocked,
                        CycleAvoidingMappingContext context);
}