package com.backend_spring.backend_spring.services.Socio;

import java.util.List;


import com.backend_spring.backend_spring.models.Socio;

public interface SocioService {
    // Guardar
    Socio saveSocio(Socio socio);

    // Leer
    List<Socio> fetchSocioList();

    // Actulizar
    Socio updateSocio(Socio socio, Long socioId);

    // Eliminar
    void deleteSocioById(Long socioId);
}
