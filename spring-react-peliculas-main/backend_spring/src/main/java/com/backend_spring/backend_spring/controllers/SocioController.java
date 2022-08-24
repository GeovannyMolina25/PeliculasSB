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

import com.backend_spring.backend_spring.models.Socio;
import com.backend_spring.backend_spring.services.Socio.SocioService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SocioController {
    @Autowired
    private SocioService socioService;

    // Guardar
    @PostMapping("/socios")
    public Socio saveSocio(@Valid @RequestBody Socio socio) {
        return socioService.saveSocio(socio);
    }

    // Leer
    @GetMapping("/socios")
    public List<Socio> fetchSocioList() {
        return socioService.fetchSocioList();
    }

    // Actualizar
    @PutMapping("/socios/{id}")
    public Socio updateSocio(@RequestBody Socio socio, @PathVariable("id") Long socioId) {
        return socioService.updateSocio(socio, socioId);
    }

    // Eliminar
    @DeleteMapping("/socios/{id}")
    public String deleteSocioById(@PathVariable("id") Long socioId) {
        socioService.deleteSocioById(socioId);
        return "Eliminado Exitosamente";
    }
}
