package com.presidio.Rentify_Backend.controller;

import com.presidio.Rentify_Backend.entity.Properties;
import com.presidio.Rentify_Backend.entity.Seller;
import com.presidio.Rentify_Backend.model.SellerDetails;
import com.presidio.Rentify_Backend.service.PropertyService;
import com.presidio.Rentify_Backend.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/seller")
@CrossOrigin
@ControllerAdvice

public class SellerController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private SellerService sellerService;

    @PostMapping("/addproperty")
    public ResponseEntity<String> saveProperty(@RequestPart(value = "image" , required = false)MultipartFile image,
                                               @RequestPart(value = "json",required = false) Properties properties,
                                               @RequestPart(value = "email",required = false)String email) throws IOException {

        Properties properties1 = propertyService.uploadProperty(image,properties,email);
        if(properties != null){
            return ResponseEntity.ok("Property uploaded Successfully");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }

    @PutMapping("/editproperty/{id}")
    public ResponseEntity<String> editProperty(@RequestPart(value = "image" , required = false)MultipartFile image,
                                               @RequestPart(value = "json",required = false) Properties properties,
                                               @RequestPart(value = "email",required = false)String email,
                                               @PathVariable Long id)  throws IOException {

        Properties property=propertyService.editProprty(image,properties,email,id);
        if(property != null){
            return ResponseEntity.ok("Property edited Successfully");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/deleteProperty/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteProperty(@PathVariable Long id){
        boolean deleted =false;
        deleted = propertyService.deleteProperty(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",deleted);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getallsellers")
    public ResponseEntity<List<Seller>> getallSellers(){
        List<Seller> sellers = sellerService.getallsellers();
        return  ResponseEntity.ok(sellers);
    }

    @GetMapping("/seller/{id}")
    public ResponseEntity<List<Properties>> getpropertiesBySeller(@PathVariable Long id){
        List<Properties> properties = propertyService.getPropertyBySeller(id);
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/details")
    public ResponseEntity<SellerDetails> getsellerbyemail(@RequestParam String email){
        Optional<SellerDetails> sellerDetails = sellerService.getSellerByEmail(email);
        return sellerDetails.map(ResponseEntity::ok)
                .orElseGet(()->ResponseEntity.notFound().build());
    }

    @GetMapping("/property/{id}")
    public ResponseEntity<Optional<Properties>> getpropertyById(@PathVariable Long id){
        Optional<Properties> properties = propertyService.getPropertyById(id);
        return ResponseEntity.ok(properties);
    }


}
