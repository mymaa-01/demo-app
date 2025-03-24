package com.presidio.Rentify_Backend.repository;

import com.presidio.Rentify_Backend.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerRepository extends JpaRepository<Seller,Long> {

    Optional<Seller> findByEmail(String email);
}
