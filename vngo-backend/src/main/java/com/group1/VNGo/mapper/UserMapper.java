package com.group1.VNGo.mapper;

import com.group1.VNGo.dto.request.UserCreationRequest;
import com.group1.VNGo.dto.request.UserUpdateRequest;
import com.group1.VNGo.dto.response.UserResponse;
import com.group1.VNGo.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toUserResponse(User user);

    @Mapping(target = "favouriteLocations", ignore = true)
    User toUser(UserCreationRequest request);

    void updateUserFromDto(UserUpdateRequest dto, @MappingTarget User user);

}
