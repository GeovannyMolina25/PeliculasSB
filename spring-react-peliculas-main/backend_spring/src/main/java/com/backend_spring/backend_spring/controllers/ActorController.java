package com.backend_spring.backend_spring.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend_spring.backend_spring.models.Actor;
import com.backend_spring.backend_spring.services.Actor.ActorService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ActorController {
    @Autowired
    private ActorService actorService;

    // Guardar
    @PostMapping("/actores")
    public Actor saveActor(@Valid @RequestBody Actor actor) {
        return actorService.saveActor(actor);
    }

    // Leer
    @GetMapping("/actores")
    public List<Actor> fetchActorList() {
        return actorService.fetchActorList();
    }

    // Actualizar
    @PutMapping("/actores/{id}")
    public Actor updateActor(@RequestBody Actor actor, @PathVariable("id") Long actorId) {
        return actorService.updateActor(actor, actorId);
    }

    // Eliminar
    @DeleteMapping("/actores/{id}")
    public String deleteActorById(@PathVariable("id") Long actorId) {
        actorService.deleteActorById(actorId);
        return "Eliminado Exitosamente";
    }
}
