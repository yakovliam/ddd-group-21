package ddd.group21.model.mapper;

import ddd.group21.model.Product;
import ddd.group21.model.Stock;
import ddd.group21.model.dto.ProductDTO;
import ddd.group21.model.dto.newProductDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface StockMapper {

    StockMapper INSTANCE = Mappers.getMapper(StockMapper.class);

   Stock newProductDTOToStock(newProductDTO productDTO, CycleAvoidingMappingContext context);
}
