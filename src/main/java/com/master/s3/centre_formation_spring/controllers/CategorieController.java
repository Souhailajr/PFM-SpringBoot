package com.master.s3.centre_formation_spring.controllers;

import com.master.s3.centre_formation_spring.entities.Categorie;
import com.master.s3.centre_formation_spring.services.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin
public class CategorieController {

    @Autowired
    private CategorieService categorieService;

    @GetMapping("/{id}")
    public Categorie findById(@PathVariable Long id) {
        return categorieService.findById(id);
    }
    @GetMapping
    public List<Categorie> findAll() {
        return categorieService.findAll();
    }

    @PostMapping
    public Categorie save(@RequestBody Categorie categorie) {
        return categorieService.save(categorie);
    }

    @PutMapping
    public Categorie update(@RequestBody Categorie categorie) {
        return categorieService.update(categorie);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        categorieService.deleteById(id);
    }
}
