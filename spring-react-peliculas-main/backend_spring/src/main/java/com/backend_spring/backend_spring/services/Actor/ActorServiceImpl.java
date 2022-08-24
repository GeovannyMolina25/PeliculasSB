package com.backend_spring.backend_spring.services.Actor;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_spring.backend_spring.models.Actor;
import com.backend_spring.backend_spring.repositories.ActorRepository;

@Service
public class ActorServiceImpl implements ActorService{
    @Autowired
    private ActorRepository actorRepository;

    // Guardar
    @Override
    public Actor saveActor(Actor actor) {
        return actorRepository.save(actor);
    }

    // Leer
    @Override
    public List<Actor> fetchActorList() {
        return (List<Actor>) actorRepository.findAll();
    }

    // Actualizar
    @Override
    public Actor updateActor(Actor actor, Long actorId) {

        Actor actorDB = actorRepository.findById(actorId).get();

        if (Objects.nonNull(actor.getNombre()) && !"".equalsIgnoreCase(actor.getNombre())) {
            actorDB.setNombre(actor.getNombre());
        }
        if (Objects.nonNull(actor.getSex_id()) && ! (0 == actor.getSex_id())) {
            actorDB.setSex_id(actor.getSex_id());
        }

        return actorRepository.save(actorDB);
    }

    // Eliminar
    @Override
    public void deleteActorById(Long actorId) {
        actorRepository.deleteById(actorId);
    }
}
