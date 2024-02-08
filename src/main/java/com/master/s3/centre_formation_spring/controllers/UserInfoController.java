package com.master.s3.centre_formation_spring.controllers;

import com.master.s3.centre_formation_spring.entities.Role;
import com.master.s3.centre_formation_spring.entities.Userinfo;
import com.master.s3.centre_formation_spring.services.UserInfoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/userInfos")
@CrossOrigin
public class UserInfoController {
    @Autowired
    private UserInfoServiceImpl userInfoService;
    @GetMapping("/{id}")
    public Userinfo findById(@PathVariable Long id) {
        return userInfoService.findById(id);
    }
    @GetMapping
    public List<Userinfo> findAll() {
        return userInfoService.findAll();
    }

    @GetMapping("/role")
    public List<Userinfo> findByRole(@RequestParam Role role) {
        return userInfoService.findByRole(role);
    }


    @PostMapping("/login")
    public  Userinfo login(@RequestBody Userinfo userinfo){

        return  userInfoService.loginUserInfo(userinfo) ;
    }

    @PostMapping
    public Userinfo savePerson(@RequestBody Userinfo userInfo) {
        return userInfoService.saveUserInfo(userInfo);
    }
    @PutMapping
    public Userinfo update(@RequestBody Userinfo userInfo) {
        return userInfoService.updateUserInfo(userInfo);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
            userInfoService.deleteById(id);
    }

    @PostMapping("/image")
    public void addImage(
            @RequestParam("id") Long id,
            @RequestParam(required = false,value="image") MultipartFile file
    ) throws IOException {

        userInfoService.addImage(id,file);
    }

    @GetMapping("/images/{id}")
    public ResponseEntity<Resource> getImage(@PathVariable Long id){
        return userInfoService.getImage(id);
    }

}
