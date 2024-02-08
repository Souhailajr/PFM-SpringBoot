package com.master.s3.centre_formation_spring.services;

import com.master.s3.centre_formation_spring.entities.Categorie;
import com.master.s3.centre_formation_spring.repositories.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class CategorieServiceImpl implements CategorieService {
    @Autowired
    private CategorieRepository categorieRepository;

    @Override
    public Categorie findById(Long id) {
        return categorieRepository.findById(id).get();
    }

    @Override
    public List<Categorie> findAll() {
        return categorieRepository.findAll();
    }

    @Override
    public Categorie save(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    @Override
    public Categorie update(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    @Override
    public void deleteById(Long id) {
        categorieRepository.deleteById(id);
    }
}
