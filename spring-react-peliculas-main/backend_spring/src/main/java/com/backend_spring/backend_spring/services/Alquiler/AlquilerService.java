package com.backend_spring.backend_spring.services.Alquiler;

import java.util.List;

import com.backend_spring.backend_spring.models.Alquiler;

public interface AlquilerService {
    // Guardar
    Alquiler saveAlquiler(Alquiler alquiler);

    // Leer
    List<Alquiler> fetchAlquilerList();

    // Actulizar
    Alquiler updateAlquiler(Alquiler alquiler, Long alquilerId);

    // Eliminar
    void deleteAlquilerById(Long alquilerId);
}
