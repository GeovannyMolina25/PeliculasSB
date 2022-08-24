package com.backend_spring.backend_spring.services.Socio;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_spring.backend_spring.models.Socio;
import com.backend_spring.backend_spring.repositories.SocioRepository;

@Service
public class SocioServiceImpl implements SocioService {
    @Autowired
    private SocioRepository socioRepository;

    // Guardar
    @Override
    public Socio saveSocio(Socio socio) {
        return socioRepository.save(socio);
    }

    // Leer
    @Override
    public List<Socio> fetchSocioList() {
        return (List<Socio>) socioRepository.findAll();
    }

    // Actualizar
    @Override
    public Socio updateSocio(Socio socio, Long socioId) {

        Socio socioDB = socioRepository.findById(socioId).get();

        if (Objects.nonNull(socio.getCedula()) && !"".equalsIgnoreCase(socio.getCedula())) {
            socioDB.setCedula(socio.getCedula());
        }

        if (Objects.nonNull(socio.getNombre()) && !"".equalsIgnoreCase(socio.getNombre())) {
            socioDB.setNombre(socio.getNombre());
        }

        if (Objects.nonNull(socio.getDireccion()) && !"".equalsIgnoreCase(socio.getDireccion())) {
            socioDB.setDireccion(socio.getDireccion());
        }

        if (Objects.nonNull(socio.getTelefono()) && !"".equalsIgnoreCase(socio.getTelefono())) {
            socioDB.setCedula(socio.getTelefono());
        }

        if (Objects.nonNull(socio.getCorreo()) && !"".equalsIgnoreCase(socio.getCorreo())) {
            socioDB.setDireccion(socio.getCorreo());
        }

        return socioRepository.save(socioDB);
    }

    // Eliminar
    @Override
    public void deleteSocioById(Long socioId) {
        socioRepository.deleteById(socioId);
    }
}
