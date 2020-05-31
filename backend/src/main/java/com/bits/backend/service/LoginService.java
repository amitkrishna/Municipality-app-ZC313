package com.bits.backend.service;

import com.bits.backend.model.Login;
import com.bits.backend.model.Users;
import com.bits.backend.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private UsersService usersService;

    public String getTokenAndVerify(String email, String password) throws NoSuchAlgorithmException {
        try {
            Optional<Users> users = usersService.checkUserPassword(email, password);
            if (users.isPresent()) {
                int tokenBits = 32;
                String token = TokenGenerator.getAlphaNumericString(tokenBits);

                Login login = new Login();
                login.setUserId(users.get().getId());
                login.setToken(TokenGenerator.convert(token));
                loginRepository.save(login);
                return token;
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }

    public Users getUserByToken(String token){
        try{
            token = TokenGenerator.convert(token);
            Optional<Login> login = loginRepository.findByToken(token);
            if(login.isPresent()){
                int userId = login.get().getUserId();
                Optional<Users> users = usersService.getUserById(userId);
                if(users.isPresent()){
                    return users.get();
                }
            }
        } catch (Exception e){
            return new Users();
        }
        return new Users();
    }

    public List<Login> getAll(){
        return loginRepository.findAll();
    }

}

class TokenGenerator {
    // function to generate a random string of length n
    static String getAlphaNumericString(int n) {

        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(n);

        for (int i = 0; i < n; i++) {

            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int) (AlphaNumericString.length()
                    * Math.random());

            // add Character one by one in end of sb
            sb.append(AlphaNumericString
                    .charAt(index));
        }

        return sb.toString();
    }

    public static String convert(String token) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hashInBytes = md.digest(token.getBytes(StandardCharsets.UTF_8));
        // bytes to hex
        StringBuilder sb = new StringBuilder();
        for (byte b : hashInBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}