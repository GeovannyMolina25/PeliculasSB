package com.backend_spring.backend_spring.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="alquilers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alquiler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long soc_id;
    private Long pel_id;
    private Date desde;
    private Date hasta;
    private double valor;
    private Date entrega;
}