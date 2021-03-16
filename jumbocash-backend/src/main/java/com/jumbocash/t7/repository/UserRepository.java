package com.jumbocash.t7.repository;

import java.math.BigInteger;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jumbocash.t7.dto.AppUser;

@Repository
public interface UserRepository extends JpaRepository<AppUser, BigInteger> {

}
