package com.presidio.Rentify_Backend.service;

import com.presidio.Rentify_Backend.entity.Properties;
import com.presidio.Rentify_Backend.entity.Seller;
import com.presidio.Rentify_Backend.model.SellerDetails;
import com.presidio.Rentify_Backend.repository.PropertyRepository;
import com.presidio.Rentify_Backend.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SellerServiceImpl implements  SellerService{

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public Optional<Seller> findSellerByPropId(Long id) {
        return sellerRepository.findAll().stream()
                .filter(seller -> seller.getProperties().stream().anyMatch(properties -> properties.getId().equals(id)))
                .findFirst();
    }

    @Override
    public SellerDetails findSellerByPropertyId(Long propertyId) {
        Properties properties = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        Seller seller = properties.getSeller();
        SellerDetails sellerDetails =new SellerDetails();
        sellerDetails.setId(seller.getId());
        sellerDetails.setFirstname(seller.getFirstname());
        sellerDetails.setLastname(seller.getLastname());
        sellerDetails.setEmail(seller.getEmail());
        sellerDetails.setRole(seller.getRole());
        sellerDetails.setMobile(seller.getMobie());

        return  sellerDetails;

    }

    @Override
    public List<Seller> getallsellers() {
        return sellerRepository.findAll();
    }

    @Override
    public Optional<SellerDetails> getSellerByEmail(String email) {
        SellerDetails sellerDetails = new SellerDetails();
        return sellerRepository.findByEmail(email).map(SellerDetails::new);
    }


}
