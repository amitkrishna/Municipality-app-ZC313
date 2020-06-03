package com.bits.backend.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="login")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Login implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="userId")
    private int userId;

    @Column(name = "token")
    private String token;
}
