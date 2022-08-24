package com.backend_spring.backend_spring.services.Director;

import java.util.List;

import com.backend_spring.backend_spring.models.Director;

public interface DirectorService {
    // Guardar
    Director saveDirector(Director director);

    // Leer
    List<Director> fetchDirectorList();

    // Actulizar
    Director updateDirector(Director director, Long directorId);

    // Eliminar
    void deleteDirectorById(Long directorId);
}
