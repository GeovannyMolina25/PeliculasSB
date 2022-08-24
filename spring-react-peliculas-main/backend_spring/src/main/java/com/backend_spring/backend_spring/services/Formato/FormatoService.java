package com.backend_spring.backend_spring.services.Formato;

import java.util.List;

import com.backend_spring.backend_spring.models.Formato;

public interface FormatoService {
    // Guardar
    Formato saveFormato(Formato formato);

    // Leer
    List<Formato> fetchFormatoList();

    // Actulizar
    Formato updateFormato(Formato formato, Long formatoId);

    // Eliminar
    void deleteFormatoById(Long formatoId);
}
