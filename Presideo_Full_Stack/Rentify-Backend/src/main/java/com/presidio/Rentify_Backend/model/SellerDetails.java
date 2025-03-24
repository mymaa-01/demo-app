package com.presidio.Rentify_Backend.model;

import com.presidio.Rentify_Backend.entity.Role;
import com.presidio.Rentify_Backend.entity.Seller;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@NotEmpty

public class SellerDetails {

    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String mobile;
    private Role role;

    public SellerDetails(Seller seller) {
        this.id = seller.getId();
        this.firstname = seller.getFirstname();
        this.lastname = seller.getLastname();
        this.email = seller.getEmail();
        this.mobile = seller.getMobie();
        this.role = seller.getRole();
    }
}
