package com.presidio.Rentify_Backend.controller;

import com.presidio.Rentify_Backend.entity.Properties;
import com.presidio.Rentify_Backend.model.Likes;
import com.presidio.Rentify_Backend.model.PropertyDetails;
import com.presidio.Rentify_Backend.model.SellerDetails;
import com.presidio.Rentify_Backend.service.PropertyService;
import com.presidio.Rentify_Backend.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buyer")
@CrossOrigin
@ControllerAdvice

public class BuyerController {

    @Autowired
    private SellerService sellerService;

    @Autowired
    private PropertyService propertyService;

    @GetMapping("/viewSellerDetails/{propertyId}")
    public ResponseEntity<SellerDetails> viewSellerDetails(@PathVariable Long propertyId) {
        SellerDetails sellerDetails = (SellerDetails) sellerService.findSellerByPropertyId(propertyId);
        return  ResponseEntity.ok(sellerDetails);
    }

    @GetMapping("/allProperties")
    public ResponseEntity<List<PropertyDetails>> getAllProperties(){
        List<PropertyDetails> properties = propertyService.getAllProperties();
        return ResponseEntity.ok(properties);
    }

    @PostMapping("/like/{id}")
    public ResponseEntity<Likes> likeProperty(@PathVariable Long id){
        Properties properties = propertyService.likeProperty(id);
        if (properties != null) {
            Likes likes = new Likes(properties.getLikes());
            return ResponseEntity.ok(likes);
        }else{
            return ResponseEntity.notFound().build();
        }

    }
}
