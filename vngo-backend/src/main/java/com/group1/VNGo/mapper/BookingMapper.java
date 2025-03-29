package com.group1.VNGo.mapper;

import com.group1.VNGo.dto.request.BookingCreationRequest;
import com.group1.VNGo.dto.response.BookingResponse;
import com.group1.VNGo.entity.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    Booking toBooking(BookingCreationRequest request);

    @Mapping(target = "pickupLocationId", source = "pickupLocation.id")
    @Mapping(target = "destinationLocationId", source = "destinationLocation.id")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "driverId", source = "driver.id")
    BookingResponse toBookingResponse(Booking booking);
}
