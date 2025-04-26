package ddd.group21.model.mapper;

import ddd.group21.model.Product;
import ddd.group21.model.dto.ProductDTO;
import ddd.group21.model.dto.newProductDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductMapper {

  ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

  ProductDTO productToProductDTO(Product product, CycleAvoidingMappingContext context);
  Product newProductDTOToProduct(newProductDTO newProductDTO, CycleAvoidingMappingContext context);
}
