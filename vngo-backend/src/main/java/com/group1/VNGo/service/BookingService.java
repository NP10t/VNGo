package com.group1.VNGo.service;

import com.group1.VNGo.dto.request.BookingCancellationRequest;
import com.group1.VNGo.dto.request.BookingCreationRequest;
import com.group1.VNGo.dto.response.BookingResponse;
import com.group1.VNGo.enums.BookingStatus;
import com.group1.VNGo.exception.AppException;
import com.group1.VNGo.exception.ErrorCode;
import com.group1.VNGo.mapper.BookingMapper;
import com.group1.VNGo.mapper.LocationMapper;
import com.group1.VNGo.repository.BookingRepository;
import com.group1.VNGo.repository.DriverRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Builder
@Service
@RequiredArgsConstructor
@Slf4j
public class BookingService {
    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;
    private final UserService userService;
    private final LocationService locationService;
    private final LocationMapper locationMapper;
    private final DriverRepository driverRepository;
    private final DriverWalletService driverWalletService;

    public BookingResponse createBooking(BookingCreationRequest request) {
        var booking = bookingMapper.toBooking(request);
        var context = SecurityContextHolder.getContext();
        var userPhoneNumber = context.getAuthentication().getName();
        booking.setUser(userService.getUser(userPhoneNumber));
        booking.setBookingStatus(BookingStatus.PENDING);
        booking.setPickupLocation(locationService.createLocation(request.getPickupLocation()));
        booking.setDestinationLocation(locationService.createLocation(request.getDestinationLocation()));
        return bookingMapper.toBookingResponse(bookingRepository.save(booking));
    }

    public BookingResponse cancelBooking(BookingCancellationRequest request) {
        var booking = bookingRepository.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.BOOKING_NOT_EXISTED));
        booking.setCancellationReason(request.getCancellationReason());
        booking.setBookingStatus(BookingStatus.CANCELLED);
        return bookingMapper.toBookingResponse(booking);
    }

    public BookingResponse acceptBooking(String bookingId) {
        var booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOKING_NOT_EXISTED));
        var context = SecurityContextHolder.getContext();
        var driver = driverRepository.findByPhoneNumber(context.getAuthentication().getName())
                .orElseThrow(() -> new AppException(ErrorCode.DRIVER_NOT_EXISTED));
        if (booking.getBookingStatus() != BookingStatus.PENDING) throw new AppException(ErrorCode.BOOKING_INVALID_STATUS);
        if (Boolean.TRUE.equals(driver.getWorkingStatus())) throw new AppException(ErrorCode.DRIVER_INVALID_STATUS);
        booking.setDriver(driver);
        booking.setBookingStatus(BookingStatus.ACCEPTED);
        return bookingMapper.toBookingResponse(bookingRepository.save(booking));
    }

    public BookingResponse pickupBooking(String bookingId) {
        var booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOKING_NOT_EXISTED));
        booking.setBookingStatus(BookingStatus.IN_PROGRESS);
        return bookingMapper.toBookingResponse(bookingRepository.save(booking));
    }

    public BookingResponse finishBooking(String bookingId) {
        var booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOKING_NOT_EXISTED));
        booking.setBookingStatus(BookingStatus.COMPLETED);
        return bookingMapper.toBookingResponse(bookingRepository.save(booking));
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(bookingMapper::toBookingResponse)
                .toList();
    }

    public BookingResponse getBooking(String id) {
        var booking = bookingRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BOOKING_NOT_EXISTED));
        return bookingMapper.toBookingResponse(booking);
    }

    public void deleteBooking(String id) {
        bookingRepository.deleteById(id);
    }
}
