package com.presidio.Rentify_Backend.repository;

import com.presidio.Rentify_Backend.entity.Properties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository<Properties,Long> {

    Optional<Properties> findById(Long id);

    List<Properties> findBySellerId(Long id);
}
