token = () => {};

token.userNotLogged = () => {
    console.log("Token Null");
};

token.verify = () => {
    var token = new Object();
    token["token"] = cookie.get("SSID");
    if (token["token"] != null) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/login/check",
            data: JSON.stringify(token),
            contentType: "application/json",
            dataType: "json",
            success: (oUser) => {},
            error: (oError) => {},
        });
    } else {
        this.token.userNotLogged();
    }
};
