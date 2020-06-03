package com.bits.backend.controller;

import com.bits.backend.model.Login;
import com.bits.backend.model.Users;
import com.bits.backend.service.LoginService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/init")
    public String doLogin(@RequestBody String payload) throws NoSuchAlgorithmException {
        JSONObject loginDetails = new JSONObject(payload);
        String token = loginService.getTokenAndVerify(loginDetails.getString("email"), loginDetails.getString("password"));
        if (token == null){
            return "null";
        } else{
            JSONObject tokenJson = new JSONObject();
            tokenJson.put("token", token);
            return tokenJson.toString();
        }
    }

    @PostMapping("/check")
    public Optional<Users> checkToken(@RequestBody String payload) {
        JSONObject token = new JSONObject(payload);
        Optional<Users> users = Optional.ofNullable(loginService.getUserByToken(token.getString("token")));
        if(users.get().getId() == 0){
            return Optional.empty();
        } return users;
    }

    @GetMapping("/all")
    public List<Login> getAll() {
        return loginService.getAll();
    }
}