package com.backend_spring.backend_spring.repositories;

import com.backend_spring.backend_spring.models.ActorPelicula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorPeliculaRepository
    extends JpaRepository<ActorPelicula, Long>{
}
