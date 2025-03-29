package com.group1.VNGo.repository;

import com.group1.VNGo.entity.Admin;
import com.group1.VNGo.entity.Driver;
import com.group1.VNGo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByPhoneNumber(String phoneNumber);

    boolean existsByPhoneNumber(String phoneNumber);


}