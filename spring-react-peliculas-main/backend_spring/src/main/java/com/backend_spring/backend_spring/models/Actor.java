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
@Table(name="actores")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String nombre;
    Long sex_id;
}
