package com.jumbocash.t7.repository;

import java.math.BigInteger;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jumbocash.t7.dto.TranMaster;

@Repository
public interface TransactionRepository extends JpaRepository<TranMaster, BigInteger>,TransactionCustomRepository {

}
