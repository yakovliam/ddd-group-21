package ddd.group21.model.mapper;


import ddd.group21.model.Customer;

import ddd.group21.model.dto.CustomerInfoDTO;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CustomerInfoMapper {

    CustomerInfoMapper INSTANCE = Mappers.getMapper(CustomerInfoMapper.class);

    @Mapping(target = "customer_id", source = "customer.id")
    CustomerInfoDTO convertCustomerInfoToCustomerInfoDTO(Customer customer);
}
