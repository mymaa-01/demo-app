package com.presidio.Rentify_Backend.service;

import com.presidio.Rentify_Backend.entity.Properties;
import com.presidio.Rentify_Backend.model.PropertyDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface PropertyService {
    Properties uploadProperty(MultipartFile image, Properties properties, String email) throws IOException;

    List<PropertyDetails> getAllProperties();

    boolean deleteProperty(Long id);

    List<Properties> getPropertyBySeller(Long id);

    Properties likeProperty(Long id);

    Properties editProprty(MultipartFile image, Properties properties, String email, Long id) throws IOException;

    Optional<Properties> getPropertyById(Long id);
}
