package com.group1.VNGo.repository;

import com.group1.VNGo.entity.Voucher;
import com.group1.VNGo.enums.VoucherStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    List<Voucher> findByStatus(VoucherStatus status);

    // List<Voucher> findByValidFromBeforeAndValidToAfter(LocalDateTime now);

    Voucher findByCode(String code);

    // Collection<Voucher> findByRecipientId(String recipientId);
}