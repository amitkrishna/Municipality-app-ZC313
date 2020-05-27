package com.bits.backend.controller;

import com.bits.backend.model.Users;
import com.bits.backend.service.UsersService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/insert")
    public Boolean insert(@RequestBody Users user){
        return usersService.insertUser(user);
    }

    @GetMapping("/all")
    public List<Users> getAll(){
        return usersService.getAllUsers();
    }

//    @PostMapping("/exitsByEmail")
//    public Optional<Users> isUser(@RequestBody String payload){
//        JSONObject jsonObject = new JSONObject(payload);
//        return usersService.userExists(jsonObject.getString("email"));
//    }
}
