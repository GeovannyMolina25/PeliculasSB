package com.backend_spring.backend_spring.services.ActorPelicula;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_spring.backend_spring.models.ActorPelicula;
import com.backend_spring.backend_spring.repositories.ActorPeliculaRepository;

@Service
public class ActorPeliculaServiceImpl implements ActorPeliculaService{
    @Autowired
    private ActorPeliculaRepository actorpeliculaRepository;

    // Guardar
    @Override
    public ActorPelicula saveActorPelicula(ActorPelicula actorpelicula) {
        return actorpeliculaRepository.save(actorpelicula);
    }

    // Leer
    @Override
    public List<ActorPelicula> fetchActorPeliculaList() {
        return (List<ActorPelicula>) actorpeliculaRepository.findAll();
    }

    // Actualizar
    @Override
    public ActorPelicula updateActorPelicula(ActorPelicula actorpelicula, Long actorpeliculaId) {

        ActorPelicula actorpeliculaDB = actorpeliculaRepository.findById(actorpeliculaId).get();

        if (Objects.nonNull(actorpelicula.getAct_id()) && ! (0 == actorpelicula.getAct_id())) {
            actorpeliculaDB.setAct_id(actorpelicula.getAct_id());
        }

        if (Objects.nonNull(actorpelicula.getPel_id()) && ! (0 == actorpelicula.getPel_id())) {
            actorpeliculaDB.setPel_id(actorpelicula.getPel_id());
        }

        if (Objects.nonNull(actorpelicula.getPapel()) && !"".equalsIgnoreCase(actorpelicula.getPapel())) {
            actorpeliculaDB.setPapel(actorpelicula.getPapel());
        }

        return actorpeliculaRepository.save(actorpeliculaDB);
    }

    // Eliminar
    @Override
    public void deleteActorPeliculaById(Long actorpeliculaId) {
        actorpeliculaRepository.deleteById(actorpeliculaId);
    }
}
