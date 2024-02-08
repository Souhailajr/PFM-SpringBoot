package com.master.s3.centre_formation_spring.services;

import com.master.s3.centre_formation_spring.entities.Categorie;

import java.util.List;

public interface CategorieService {
    public Categorie findById(Long id);
    public List<Categorie> findAll();
    public Categorie save(Categorie categorie) ;
    public Categorie update(Categorie categorie) ;
    public void deleteById(Long id) ;
}
