package ddd.group21.model.mapper;

import ddd.group21.model.CustomerOrder;
import ddd.group21.model.dto.CustomerOrderDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CustomerOrderMapper {

  CustomerOrderMapper INSTANCE = Mappers.getMapper(CustomerOrderMapper.class);

  @Mapping(target = "customerId", source = "customerOrder.customer.id")
  @Mapping(target = "creditCardId", source = "customerOrder.creditCard.id")
  CustomerOrderDTO customerOrderToCustomerOrderDTO(CustomerOrder customerOrder,
                                                   CycleAvoidingMappingContext context);
}
