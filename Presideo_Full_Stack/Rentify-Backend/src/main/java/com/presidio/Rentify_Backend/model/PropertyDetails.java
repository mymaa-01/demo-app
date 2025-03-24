package com.presidio.Rentify_Backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@NotEmpty
public class PropertyDetails {

    private Long id;
    private String name;
    private String address;
    private Integer bedrooms;
    private Date available;
    private  String image;
    private double rate;
    private Integer likes;
}
