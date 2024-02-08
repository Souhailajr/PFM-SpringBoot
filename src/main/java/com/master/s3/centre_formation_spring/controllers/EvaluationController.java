package com.master.s3.centre_formation_spring.controllers;

import com.master.s3.centre_formation_spring.entities.Evaluation;
import com.master.s3.centre_formation_spring.entities.Participant;
import com.master.s3.centre_formation_spring.entities.Evaluation;
import com.master.s3.centre_formation_spring.services.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/evaluations")
@CrossOrigin
public class EvaluationController{
    @Autowired
    private EvaluationService evaluationService ;

    @GetMapping
    public List<Evaluation> findAll() {
        return evaluationService.findAll();
    }

    @GetMapping("/formateur/{id}")
    public List<Evaluation> getFormateur(@PathVariable Long id) {
        return evaluationService.getFormateur(id);
    }

    @PostMapping
    public Evaluation save(@RequestBody Evaluation evaluation) {
        return evaluationService.save(evaluation);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
            evaluationService.deleteById(id);
    }
}
