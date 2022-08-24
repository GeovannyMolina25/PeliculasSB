package com.backend_spring.backend_spring.services.Genero;

import java.util.List;

import com.backend_spring.backend_spring.models.Genero;



public interface GeneroService {

    // Guardar
    Genero saveGenero(Genero genero);

    // Leer
    List<Genero> fetchGeneroList();

    // Actulizar
    Genero updateGenero(Genero genero, Long generoId);

    // Eliminar
    void deleteGeneroById(Long generoId);
}
