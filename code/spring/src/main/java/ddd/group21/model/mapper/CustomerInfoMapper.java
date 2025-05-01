package ddd.group21.model.mapper;


import ddd.group21.model.Customer;

import ddd.group21.model.dto.CustomerInfoDTO;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CustomerInfoMapper {

    CustomerInfoMapper INSTANCE = Mappers.getMapper(CustomerInfoMapper.class);
    @Mapping(target = "userAccountId", source = "customer.userAccount.id")
    @Mapping(target = "id", source = "customer.id")
    @Mapping(target = "firstName", source = "customer.firstName")
    @Mapping(target = "lastName", source = "customer.lastName")
    @Mapping(target = "accountBalance", source = "customer.accountBalance")
    CustomerInfoDTO convertCustomerInfoToCustomerInfoDTO(Customer customer);
}
