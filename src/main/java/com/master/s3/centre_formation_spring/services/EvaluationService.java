package com.master.s3.centre_formation_spring.services;

import com.master.s3.centre_formation_spring.entities.Evaluation;
import com.master.s3.centre_formation_spring.entities.Participant;

import java.util.List;

public interface EvaluationService {
    Evaluation save(Evaluation evaluation);
    List<Evaluation> findAll();
    List<Evaluation> getFormateur(Long formateurId);
    void deleteById(Long evaluationId);
}
