package com.backend_spring.backend_spring.services.Alquiler;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_spring.backend_spring.models.Alquiler;
import com.backend_spring.backend_spring.repositories.AlquilerRepository;

@Service
public class AlquilerServiceImpl implements AlquilerService{
    @Autowired
    private AlquilerRepository alquilerRepository;

    // Guardar
    @Override
    public Alquiler saveAlquiler(Alquiler alquiler) {
        return alquilerRepository.save(alquiler);
    }

    // Leer
    @Override
    public List<Alquiler> fetchAlquilerList() {
        return (List<Alquiler>) alquilerRepository.findAll();
    }

    // Actualizar
    @Override
    public Alquiler updateAlquiler(Alquiler alquiler, Long alquilerId) {

        Alquiler alquilerDB = alquilerRepository.findById(alquilerId).get();

        if (Objects.nonNull(alquiler.getSoc_id()) && ! (0 == alquiler.getSoc_id())) {
            alquilerDB.setSoc_id(alquiler.getSoc_id());
        }

        if (Objects.nonNull(alquiler.getPel_id()) && ! (0 == alquiler.getPel_id())) {
            alquilerDB.setPel_id(alquiler.getPel_id());
        }

        if(Objects.nonNull(alquiler.getDesde())) {
            alquiler.setDesde(alquiler.getDesde());
        }

        if(Objects.nonNull(alquiler.getHasta())) {
            alquiler.setHasta(alquiler.getHasta());
        }

        if (Objects.nonNull(alquiler.getValor()) && ! (0 == alquiler.getValor())) {
            alquilerDB.setValor(alquiler.getValor());
        }

        if(Objects.nonNull(alquiler.getEntrega())) {
            alquiler.setEntrega(alquiler.getEntrega());
        }

        return alquilerRepository.save(alquilerDB);
    }

    // Eliminar
    @Override
    public void deleteAlquilerById(Long alquilerId) {
        alquilerRepository.deleteById(alquilerId);
    }
}
