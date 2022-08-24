package com.backend_spring.backend_spring.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;

@Entity
@Table(name="peliculas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pelicula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long gen_id;
    private Long dir_id;
    private Long for_id;
    private String nombre;
    private double costo;
    private Date estreno;
}

