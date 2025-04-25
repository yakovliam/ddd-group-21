package ddd.group21.model.mapper;

import ddd.group21.model.Address;
import ddd.group21.model.UserAccount;
import ddd.group21.model.dto.AddressDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AddressMapper {

  AddressMapper INSTANCE = Mappers.getMapper(AddressMapper.class);

  @Mapping(target = "userAccountId", source = "userAccount.id")
  AddressDTO addressToAddressDTO(Address userAccount, CycleAvoidingMappingContext context);

  @Mapping(target = "userAccount", source = "userAccountEntity")
  @Mapping(target = "id", source = "addressDTO.id")
  Address addressDTOToAddress(AddressDTO addressDTO, UserAccount userAccountEntity);
}
