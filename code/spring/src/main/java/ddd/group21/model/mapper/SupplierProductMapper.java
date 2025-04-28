package ddd.group21.model.mapper;

import ddd.group21.model.Product;
import ddd.group21.model.Supplier;
import ddd.group21.model.SupplierProduct;
import ddd.group21.model.dto.SupplierProductDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface SupplierProductMapper {

  SupplierProductMapper INSTANCE =
      org.mapstruct.factory.Mappers.getMapper(SupplierProductMapper.class);

  @Mapping(target = "supplierId", source = "supplierProduct.id")
  @Mapping(target = "productId", source = "supplierProduct.product.id")
  SupplierProductDTO supplierProductToSupplierProductDTO(SupplierProduct supplierProduct,
                                                         CycleAvoidingMappingContext context);

  @Mapping(target = "supplier", source = "supplier")
  @Mapping(target = "product", source = "product")
  @Mapping(target = "id", source = "supplierProductDTO.id")
  SupplierProduct supplierProductDTOToSupplierProduct(SupplierProductDTO supplierProductDTO,
                                                      Supplier supplier, Product product,
                                                      CycleAvoidingMappingContext context);
}