package com.example.backend.repository;

import com.example.backend.entity.AwsAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AwsAccountRepository extends JpaRepository<AwsAccountEntity,Long> {

    Optional<AwsAccountEntity> findByAccountArn(String accountArn);
}
