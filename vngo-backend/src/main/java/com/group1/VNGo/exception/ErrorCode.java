package com.group1.VNGo.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    KEY_INVALID(1001, "Invalid message key", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must have at least {min} characters", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1004, "Password must have at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    DOB_INVALID(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    LOCATION_NOT_EXISTED(1009, "Location is not existed", HttpStatus.INTERNAL_SERVER_ERROR),
    BOOKING_NOT_EXISTED(1010, "Booking is not existed", HttpStatus.BAD_REQUEST),
    DRIVER_NOT_EXISTED(1011, "Driver is not existed", HttpStatus.BAD_REQUEST),

    PAYMENT_NOT_EXISTED(1017, "Payment is not existed", HttpStatus.BAD_REQUEST),
    BOOKING_INVALID_STATUS(1012, "Booking is not available", HttpStatus.BAD_REQUEST),
    DRIVER_INVALID_STATUS(1013, "Driver is not available", HttpStatus.BAD_REQUEST),
    RATING_NOT_EXISTED(1014, "Rating is not existed", HttpStatus.BAD_REQUEST),
    REPORT_NOT_EXISTED(1015, "Report is not existed", HttpStatus.BAD_REQUEST),
    ADMIN_NOT_EXISTED(1016, "Admin is not existed", HttpStatus.BAD_REQUEST),
    DRIVER_WALLET_NOT_EXISTED(1018, "Driver wallet is not existed", HttpStatus.BAD_REQUEST);
    private int code;
    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}
