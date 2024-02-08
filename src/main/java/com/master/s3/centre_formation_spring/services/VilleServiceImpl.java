package com.master.s3.centre_formation_spring.services;

import com.master.s3.centre_formation_spring.entities.Ville;
import com.master.s3.centre_formation_spring.repositories.VilleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VilleServiceImpl implements VilleService{
    @Autowired
    private VilleRepository villeRepository ;

    @Override
    public Ville findById(Long id) {
        return villeRepository.findById(id).orElse(null);
    }

    @Override
    public List<Ville> findAll() {
        return villeRepository.findAll();
    }

    @Override
    public Ville save(Ville ville) {
        return villeRepository.save(ville);
    }

    @Override
    public Ville update(Ville ville) {
        return villeRepository.save(ville);
    }

    @Override
    public void deleteById(Long id) {
        villeRepository.deleteById(id);
    }
}
