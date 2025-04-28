package ddd.group21.model.mapper;

import ddd.group21.model.Warehouse;
import ddd.group21.model.dto.WarehouseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface WarehouseMapper {

  WarehouseMapper INSTANCE = org.mapstruct.factory.Mappers.getMapper(WarehouseMapper.class);

  @Mapping(target = "addressId", source = "warehouse.address.id")
  WarehouseDTO warehouseToWarehouseDTO(Warehouse warehouse, CycleAvoidingMappingContext context);

  @Mapping(target = "address", source = "address")
  @Mapping(target = "id", source = "warehouseDTO.id")
  Warehouse warehouseDTOToWarehouse(WarehouseDTO warehouseDTO, ddd.group21.model.Address address,
                                    CycleAvoidingMappingContext context);
}
