package com.group1.VNGo.service;

import com.group1.VNGo.dto.request.RatingCreationRequest;
import com.group1.VNGo.dto.response.RatingResponse;
import com.group1.VNGo.exception.AppException;
import com.group1.VNGo.exception.ErrorCode;
import com.group1.VNGo.mapper.RatingMapper;
import com.group1.VNGo.repository.RatingRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Builder
@Service
@RequiredArgsConstructor
@Slf4j
public class RatingService {
    private final RatingRepository ratingRepository;
    private final RatingMapper ratingMapper;

    public RatingResponse createRating(RatingCreationRequest request) {
        var rating = ratingMapper.toRating(request);
        return ratingMapper.toRatingResponse(ratingRepository.save(rating));
    }

    public RatingResponse getRating(String id) {
        var rating = ratingRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.RATING_NOT_EXISTED));
        return ratingMapper.toRatingResponse(rating);
    }
}
