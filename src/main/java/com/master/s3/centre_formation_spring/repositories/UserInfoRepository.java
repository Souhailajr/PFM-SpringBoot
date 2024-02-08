package com.master.s3.centre_formation_spring.repositories;

import com.master.s3.centre_formation_spring.entities.Userinfo;
import com.master.s3.centre_formation_spring.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInfoRepository extends JpaRepository<Userinfo,Long> {
    public Userinfo findByUsername(String email);
    List<Userinfo> findByRole(Role role);
}
