package com.group1.VNGo.controller;

import com.group1.VNGo.dto.request.BookingCreationRequest;
import com.group1.VNGo.dto.response.ApiResponse;
import com.group1.VNGo.dto.response.BookingResponse;
import com.group1.VNGo.service.BookingService;
import com.group1.VNGo.service.DriverWalletService;
import com.group1.VNGo.service.SocketNotificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingController {

    BookingService bookingService;

    @Autowired
    SocketNotificationService service;

    @PostMapping()
    ApiResponse<BookingResponse> createBooking(@RequestBody BookingCreationRequest request) {
        BookingResponse bookingResponse = bookingService.createBooking(request);
        service.notifyDrivers(bookingResponse);
        return ApiResponse.<BookingResponse>builder()
                .result(bookingResponse)
                .build();
    }

    @GetMapping()
    ApiResponse<List<BookingResponse>> getAllBookings() {
        return ApiResponse.<List<BookingResponse>>builder()
                .result(bookingService.getAllBookings())
                .build();
    }

    @GetMapping("/{bookingId}")
    ApiResponse<BookingResponse> getBooking(@PathVariable String bookingId) {
        return ApiResponse.<BookingResponse>builder()
                .result(bookingService.getBooking(bookingId))
                .build();
    }

    @PutMapping("/{bookingId}/accept")
    ApiResponse<BookingResponse> acceptBooking(@PathVariable String bookingId) {
        BookingResponse bookingResponse = bookingService.acceptBooking(bookingId);
        service.notifyUser(bookingResponse.getUserId(),bookingResponse);
        return ApiResponse.<BookingResponse>builder()
                .result(bookingResponse)
                .build();
    }

    @PutMapping("/{bookingId}/pickup")
    ApiResponse<BookingResponse> pickupBooking(@PathVariable String bookingId) {
        BookingResponse bookingResponse = bookingService.pickupBooking(bookingId);
        service.notifyUser(bookingResponse.getUserId(), bookingResponse);
        return ApiResponse.<BookingResponse>builder()
                .result(bookingResponse)
                .build();
    }

    @PutMapping("/{bookingId}/finish")
    ApiResponse<BookingResponse> finishBooking(@PathVariable String bookingId) {
        BookingResponse bookingResponse = bookingService.finishBooking(bookingId);
        service.notifyUserFinish(bookingResponse.getUserId(), bookingResponse);
        return ApiResponse.<BookingResponse>builder()
                .result(bookingService.finishBooking(bookingId))
                .build();
    }

    @DeleteMapping("/{bookingId}")
    ApiResponse<Void> deleteBooking(@PathVariable String bookingId) {
        bookingService.deleteBooking(bookingId);
        return ApiResponse.<Void>builder()
                .result(null)
                .build();
    }
}
