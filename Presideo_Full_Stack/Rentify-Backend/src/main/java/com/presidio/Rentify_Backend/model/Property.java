package com.presidio.Rentify_Backend.model;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@NotEmpty
public class Property {

    private Long id;
    private String name;
    private String address;
    private Integer bedrooms;
    private Date available;
    private  String image;
    private double rate;

}
