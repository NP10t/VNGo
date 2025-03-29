package com.group1.VNGo.service;

import com.group1.VNGo.dto.request.UserCreationRequest;
import com.group1.VNGo.dto.request.UserUpdateRequest;
import com.group1.VNGo.dto.response.UserResponse;
import com.group1.VNGo.entity.User;
import com.group1.VNGo.exception.AppException;
import com.group1.VNGo.exception.ErrorCode;
import com.group1.VNGo.mapper.UserMapper;
import com.group1.VNGo.repository.UserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) throw new AppException(ErrorCode.USER_EXISTED);

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public UserResponse getUserByPhoneNumber(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));  // Nếu không tìm thấy, ném lỗi

        return userMapper.toUserResponse(user);  // Trả về thông tin người dùng
    }

    public User getUser(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        var phoneNumber = context.getAuthentication().getName();
        var user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    // Lấy tất cả người dùng
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    // Cập nhật thông tin người dùng
    public UserResponse updateUser(String phoneNumber, UserUpdateRequest request) {
        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));  // Nếu không tìm thấy, ném lỗi

        userMapper.updateUserFromDto(request, user);  // Cập nhật thông tin người dùng từ DTO

        // Mã hóa mật khẩu nếu có thay đổi
        if (request.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return userMapper.toUserResponse(userRepository.save(user));  // Lưu và trả về phản hồi
    }

    // Xóa người dùng
    public void deleteUser(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));  // Nếu không tìm thấy, ném lỗi

        userRepository.delete(user);  // Xóa người dùng
    }
}
