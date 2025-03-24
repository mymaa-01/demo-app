package com.presidio.Rentify_Backend.service;

import com.presidio.Rentify_Backend.entity.Properties;
import com.presidio.Rentify_Backend.entity.Seller;
import com.presidio.Rentify_Backend.model.PropertyDetails;
import com.presidio.Rentify_Backend.repository.PropertyRepository;
import com.presidio.Rentify_Backend.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyServiceImpl implements PropertyService {
    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public Properties uploadProperty(MultipartFile image, Properties properties, String email) throws IOException {
        Optional<Seller> sellerOptional = sellerRepository.findByEmail(email);
        if(sellerOptional.isPresent()){
            properties.setSeller(sellerOptional.get());
            properties.setImage(image.getBytes());
            return  propertyRepository.save(properties);
        }
        throw new IllegalArgumentException("Seller Not Found");
    }

    @Override
    public List<PropertyDetails> getAllProperties() {
        List<PropertyDetails> propertyDetails = new ArrayList<>();
        List<Properties> all = propertyRepository.findAll();
        for (Properties properties : all) {
            PropertyDetails propertyDetails1 = new PropertyDetails();
            propertyDetails1.setId(properties.getId());
            propertyDetails1.setName(properties.getName());
            propertyDetails1.setBedrooms(properties.getBedrooms());
            propertyDetails1.setAddress(properties.getAddress());
            propertyDetails1.setLikes(properties.getLikes());
            String base64Img = Base64.getEncoder().encodeToString(properties.getImage());
            propertyDetails1.setImage(base64Img);
            propertyDetails1.setRate(properties.getRate());
            propertyDetails1.setAvailable(properties.getAvailable());

            propertyDetails.add(propertyDetails1);

        }
        return propertyDetails ;
    }

    @Override
    public boolean deleteProperty(Long id) {
        propertyRepository.deleteById(id);
        return true;
    }

    @Override
    public List<Properties> getPropertyBySeller(Long id) {
        return  propertyRepository.findBySellerId(id);
    }

    @Override
    public Properties likeProperty(Long id) {
        Optional<Properties> properties = propertyRepository.findById(id);
        if(properties.isPresent()){
            Properties property= properties.get();
            property.setLikes(property.getLikes() + 1);
            propertyRepository.save(property);
            return property;

        }else {
            throw  new RuntimeException("No such Property Present");
        }
    }

    @Override
    public Properties editProprty(MultipartFile image, Properties properties, String email, Long id)throws IOException {
        Optional<Seller> sellerOptional = sellerRepository.findByEmail(email);

        if(sellerOptional.isPresent()){
            Optional<Properties> optionalProperties = propertyRepository.findById(id);
            if(optionalProperties.isPresent()){
                Properties properties1 = optionalProperties.get();
                properties1.setImage(image.getBytes());
                properties1.setAddress(properties.getAddress());
                properties1.setName(properties.getName());
                properties1.setAvailable(properties.getAvailable());
                properties1.setBedrooms(properties.getBedrooms());
               properties1.setRate(properties.getRate());
               properties1.setLikes(properties1.getLikes());
                return propertyRepository.save(properties1);
            }else {
                throw  new IllegalArgumentException("Property Not Found");
            }

        }
        throw new IllegalArgumentException("Seller Not Found");
    }

    @Override
    public Optional<Properties> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }
}
