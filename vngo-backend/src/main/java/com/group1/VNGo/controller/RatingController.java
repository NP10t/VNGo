package com.group1.VNGo.controller;

import com.group1.VNGo.dto.request.RatingCreationRequest;
import com.group1.VNGo.dto.response.ApiResponse;
import com.group1.VNGo.dto.response.RatingResponse;
import com.group1.VNGo.service.RatingService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ratings")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RatingController {
    RatingService ratingService;

    @PostMapping()
    ApiResponse<RatingResponse> createRating(@RequestBody @Valid RatingCreationRequest request) {
        return ApiResponse.<RatingResponse>builder()
                .result(ratingService.createRating(request))
                .build();
    }

    @GetMapping("/{ratingId}")
    ApiResponse<RatingResponse> getRating(@PathVariable String ratingId) {
        return ApiResponse.<RatingResponse>builder()
                .result(ratingService.getRating(ratingId))
                .build();
    }
}
