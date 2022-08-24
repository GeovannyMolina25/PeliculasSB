package com.backend_spring.backend_spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend_spring.backend_spring.models.Formato;

public interface FormatoRepository
    extends JpaRepository<Formato, Long>{
}
