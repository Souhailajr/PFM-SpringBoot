package com.master.s3.centre_formation_spring.services;


import com.master.s3.centre_formation_spring.entities.Ville;

import java.util.List;

public interface VilleService {

    public Ville findById(Long id);
    public List<Ville> findAll();
    public Ville save(Ville ville) ;
    public Ville update(Ville ville) ;
    public void deleteById(Long id) ;
}
