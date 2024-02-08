package com.master.s3.centre_formation_spring.repositories;

import com.master.s3.centre_formation_spring.entities.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ParticipantRepository extends JpaRepository<Participant,Long> {
    public Participant findOneByUsername(String email);
}
