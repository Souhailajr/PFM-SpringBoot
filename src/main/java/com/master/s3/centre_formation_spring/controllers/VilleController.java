package com.master.s3.centre_formation_spring.controllers;

import com.master.s3.centre_formation_spring.entities.Ville;
import com.master.s3.centre_formation_spring.services.VilleService;
import com.master.s3.centre_formation_spring.services.VilleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/villes")
@CrossOrigin
public class VilleController {
    @Autowired
    private VilleService villeService ;

    @GetMapping("/{id}")
    public Ville findById(@PathVariable Long id) {
        return villeService.findById(id);
    }
    @GetMapping
    public List<Ville> findAll() {
        return villeService.findAll();
    }

    @PostMapping
    public Ville save(@RequestBody Ville ville) {
        return villeService.save(ville);
    }

    @PutMapping
    public Ville update(@RequestBody Ville ville) {
        return villeService.update(ville);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        villeService.deleteById(id);
    }
}
