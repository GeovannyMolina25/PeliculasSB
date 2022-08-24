package com.backend_spring.backend_spring.services.Pelicula;

import java.util.List;

import com.backend_spring.backend_spring.models.Pelicula;

public interface PeliculaService {
    // Guardar
    Pelicula savePelicula(Pelicula pelicula);

    // Leer
    List<Pelicula> fetchPeliculaList();

    // Actulizar
    Pelicula updatePelicula(Pelicula pelicula, Long peliculaId);

    // Eliminar
    void deletePeliculaById(Long peliculaId);
}
