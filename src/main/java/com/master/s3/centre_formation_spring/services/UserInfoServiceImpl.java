package com.master.s3.centre_formation_spring.services;

import com.master.s3.centre_formation_spring.entities.Role;
import com.master.s3.centre_formation_spring.entities.Userinfo;
import com.master.s3.centre_formation_spring.repositories.UserInfoRepository;
import com.master.s3.centre_formation_spring.repositories.VilleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.FileSystemResource;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

@Service
public class UserInfoServiceImpl implements UserDetailsService {
    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private VilleRepository villeRepository ;

    @Value("${imagePath}")
    private String chemin ;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userInfoRepository.findByUsername(username);
    }

    public Userinfo saveUserInfo(Userinfo userInfo) {

        if (userInfoRepository.findByUsername(userInfo.getUsername()) != null) {

            throw new IllegalArgumentException("ce compte existe !");
        }
        userInfo.setPassword(new BCryptPasswordEncoder().encode(userInfo.getPassword()));
        return userInfoRepository.save(userInfo);
    }

    public Userinfo updateUserInfo(Userinfo userInfo) {

        Userinfo userinfo = userInfoRepository.findById(userInfo.getId()).orElse(null) ;

        userInfo.setPassword(new BCryptPasswordEncoder().encode(userInfo.getPassword()));
        return userInfoRepository.save(userInfo);
    }

    public Userinfo loginUserInfo(Userinfo userInfo) {

        Userinfo user = userInfoRepository.findByUsername(userInfo.getUsername());

        // Vérification si l'utilisateur existe et vérification du mot de passe
        if (user == null || !new BCryptPasswordEncoder().matches(userInfo.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Oups, vérifiez vos informations !");
        } else {
            return user;
        }

    }

    public List<Userinfo> findByRole(Role role){

        return userInfoRepository.findByRole(role);
    }

    public void addImage(Long id, MultipartFile file) throws IOException {

        Userinfo entreprise = userInfoRepository.findById(id).orElse(null);

        if(entreprise != null){

            if(file != null && !file.isEmpty()){
                String pathPhoto = chemin +"userinfos/images/" + id + ".png" ;
                file.transferTo(Path.of(pathPhoto));
                String urlPhoto = "http://localhost:8080/userinfos/images/" + entreprise.getId() ;
                entreprise.setImage(urlPhoto);
            }

            userInfoRepository.save(entreprise) ;
        }
    }


    public Userinfo findById(Long id){
        return userInfoRepository.findById(id).orElse(null);
    }
    public List<Userinfo> findAll(){
        return userInfoRepository.findAll();
    }

    public void deleteById(Long id){
        userInfoRepository.deleteById(id);
    }

    public ResponseEntity<Resource> getImage(Long id){
        String path = chemin + id + ".png";
        FileSystemResource file = new FileSystemResource(path);
        if(!file.exists()){
            return ResponseEntity.notFound().build();
        }
        return  ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(file) ;
    }


}
