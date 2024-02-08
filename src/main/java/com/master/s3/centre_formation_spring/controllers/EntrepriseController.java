package com.master.s3.centre_formation_spring.controllers;

import com.master.s3.centre_formation_spring.entities.Entreprise;
import com.master.s3.centre_formation_spring.services.EntrepriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/entreprises")
@CrossOrigin
public class EntrepriseController {
    @Autowired
    private EntrepriseService entrepriseService  ;
    @GetMapping("/{id}")
    public Entreprise findById(@PathVariable Long id) {
        return entrepriseService.findById(id);
    }
    @GetMapping
    public List<Entreprise> findAll() {
        return entrepriseService.findAll();
    }

    @PostMapping
    public Entreprise save(@RequestBody Entreprise entreprise) {
        return entrepriseService.save(entreprise);
    }

    @PutMapping
    public Entreprise update(@RequestBody Entreprise entreprise) {
        return entrepriseService.update(entreprise);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
            entrepriseService.deleteById(id);
    }
}
