package ddd.group21.model.mapper;

import ddd.group21.model.Address;
import ddd.group21.model.CreditCard;
import ddd.group21.model.Customer;
import ddd.group21.model.dto.CreditCardDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CreditCardMapper {

  CreditCardMapper INSTANCE = Mappers.getMapper(CreditCardMapper.class);

  @Mapping(target = "customerId", source = "customer.id")
  @Mapping(target = "paymentAddressId", source = "paymentAddress.id")
  CreditCardDTO creditCardToCreditCardDTO(CreditCard creditCard,
                                          CycleAvoidingMappingContext context);

  @Mapping(target = "customer", source = "customer")
  @Mapping(target = "paymentAddress", source = "paymentAddress")
  CreditCard creditCardDTOToCreditCard(CreditCardDTO creditCardDTO, Customer customer,
                                       Address paymentAddress);
}
