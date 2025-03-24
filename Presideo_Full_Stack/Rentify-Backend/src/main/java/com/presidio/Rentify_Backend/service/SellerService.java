package com.presidio.Rentify_Backend.service;

import com.presidio.Rentify_Backend.entity.Seller;
import com.presidio.Rentify_Backend.model.SellerDetails;

import java.util.List;
import java.util.Optional;

public interface SellerService {
    Optional<Seller> findSellerByPropId(Long id);

    SellerDetails findSellerByPropertyId(Long propertyId);

    List<Seller> getallsellers();

    Optional<SellerDetails> getSellerByEmail(String email);
}
