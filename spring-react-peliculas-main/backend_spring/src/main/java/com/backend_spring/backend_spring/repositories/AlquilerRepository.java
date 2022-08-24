package com.backend_spring.backend_spring.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend_spring.backend_spring.models.Alquiler;

@Repository
public interface AlquilerRepository
        extends JpaRepository<Alquiler, Long> {

}
