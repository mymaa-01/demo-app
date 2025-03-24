package com.presidio.Rentify_Backend.repository;

import com.presidio.Rentify_Backend.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer,Long> {

    Optional<Buyer> findByEmail(String email);
}
