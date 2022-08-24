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

@Entity
@Table(name="socios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Socio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cedula;
    private String nombre;
    private String direccion;
    private String telefono;
    private String correo;

}
