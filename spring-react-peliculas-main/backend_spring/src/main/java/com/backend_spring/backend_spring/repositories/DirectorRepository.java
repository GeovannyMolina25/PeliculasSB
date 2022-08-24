package com.backend_spring.backend_spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend_spring.backend_spring.models.Director;

@Repository
public interface DirectorRepository 
    extends JpaRepository<Director, Long>{
    
}
