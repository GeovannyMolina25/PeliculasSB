package com.backend_spring.backend_spring.repositories;

import com.backend_spring.backend_spring.models.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeliculaRepository
    extends JpaRepository<Pelicula, Long>{
}
