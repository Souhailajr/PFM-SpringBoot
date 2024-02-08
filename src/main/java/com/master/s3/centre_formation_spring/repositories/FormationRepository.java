package com.master.s3.centre_formation_spring.repositories;

import com.master.s3.centre_formation_spring.entities.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormationRepository extends JpaRepository<Formation,Long> {

}
