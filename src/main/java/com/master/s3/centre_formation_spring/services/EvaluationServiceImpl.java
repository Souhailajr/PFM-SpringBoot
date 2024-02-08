package com.master.s3.centre_formation_spring.services;

import com.master.s3.centre_formation_spring.entities.*;
import com.master.s3.centre_formation_spring.repositories.EvaluationRepository;
import com.master.s3.centre_formation_spring.repositories.UserInfoRepository;
import com.master.s3.centre_formation_spring.repositories.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvaluationServiceImpl implements EvaluationService{

    @Autowired
    private EvaluationRepository evaluationRepository ;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private ParticipantRepository participantRepository;


    @Override
    public Evaluation save(Evaluation evaluation) {
        Participant participant = participantRepository.findById(evaluation.getParticipant().getId()).orElse(null) ;
        Userinfo formateur = userInfoRepository.findById(evaluation.getUserinfo().getId()).orElse(null);

        if(participant != null && formateur !=null){
            formateur.addEvaluation(evaluation);
            participant.addEvaluation(evaluation);
        }
        return evaluationRepository.save(evaluation);
    }

    @Override
    public List<Evaluation> findAll() {
        return evaluationRepository.findAll();
    }

    @Override
    public List<Evaluation> getFormateur(Long formateurId) {
        Userinfo userinfo = userInfoRepository.findById(formateurId).orElse(null);
        return userinfo.getEvaluations();
    }

    @Override
    public void deleteById(Long evaluationId) {
        evaluationRepository.deleteById(evaluationId);
    }

}
