package com.backend_spring.backend_spring.services.ActorPelicula;

import java.util.List;

import com.backend_spring.backend_spring.models.ActorPelicula;

public interface ActorPeliculaService {
    // Guardar
    ActorPelicula saveActorPelicula(ActorPelicula actorpelicula);

    // Leer
    List<ActorPelicula> fetchActorPeliculaList();

    // Actulizar
    ActorPelicula updateActorPelicula(ActorPelicula actorpelicula, Long actorpeliculaId);

    // Eliminar
    void deleteActorPeliculaById(Long actorpeliculaId);
}
