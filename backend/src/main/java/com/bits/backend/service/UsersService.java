package com.bits.backend.service;

import com.bits.backend.model.Users;
import com.bits.backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public Boolean insertUser(Users user){
        try{
            usersRepository.save(user);
        } catch (Exception e){
            return false;
        }
        return true;
    }

    public List<Users> getAllUsers(){
        return usersRepository.findAll();
    }

    public Optional<Users> userExists(String email){
        try{
           return usersRepository.findByEmail(email);
        } catch (Exception e){
            return Optional.empty();
        }
    }

    public Optional<Users> getUserById(int id){
        try{
            return usersRepository.findById(id);
        } catch (Exception e){
            return Optional.empty();
        }
    }

    Optional<Users> checkUserPassword(String email, String password) {
        try{
            return usersRepository.findByEmailAndPassword(email, password);
        } catch (Exception e){
            return Optional.empty();
        }
    }
}
