package ddd.group21.model.mapper;

import ddd.group21.model.Address;
import ddd.group21.model.Supplier;
import ddd.group21.model.dto.SupplierDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SupplierMapper {

  SupplierMapper INSTANCE = Mappers.getMapper(SupplierMapper.class);

  @Mapping(target = "addressId", source = "supplier.address.id")
  SupplierDTO supplierToSupplierDTO(Supplier supplier, CycleAvoidingMappingContext context);

  @Mapping(target = "address", source = "address")
  @Mapping(target = "id", source = "supplierDTO.id")
  Supplier supplierDTOToSupplier(SupplierDTO supplierDTO, Address address,
                                 CycleAvoidingMappingContext context);
}