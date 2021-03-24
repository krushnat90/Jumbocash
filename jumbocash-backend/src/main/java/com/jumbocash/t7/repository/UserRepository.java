package com.jumbocash.t7.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jumbocash.t7.dto.AppUser;

@Repository
public interface UserRepository extends JpaRepository<AppUser, BigInteger> {
	
	List<AppUser> findByEmail(String email);

}
