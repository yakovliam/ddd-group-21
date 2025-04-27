package ddd.group21.model.mapper;

import ddd.group21.model.Product;
import ddd.group21.model.dto.CreateProductDTO;
import ddd.group21.model.dto.ProductDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductMapper {

  ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

  @Mapping(target = "categoryId", source = "product.category.id")
  ProductDTO productToProductDTO(Product product, CycleAvoidingMappingContext context);

  ProductDTO createProductDTOToProductDTO(CreateProductDTO createProductDTO,
                                          CycleAvoidingMappingContext context);
}
