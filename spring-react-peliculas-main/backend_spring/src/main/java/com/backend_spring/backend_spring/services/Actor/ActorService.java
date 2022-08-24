package com.backend_spring.backend_spring.services.Actor;

import java.util.List;

import com.backend_spring.backend_spring.models.Actor;

public interface ActorService {
    // Guardar
    Actor saveActor(Actor actor);

    // Leer
    List<Actor> fetchActorList();

    // Actulizar
    Actor updateActor(Actor actor, Long actorId);

    // Eliminar
    void deleteActorById(Long actorId);
}
