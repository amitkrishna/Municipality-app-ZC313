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
            async: false,
            data: JSON.stringify(token),
            contentType: "application/json",
            dataType: "json",
            success: (oUser) => {
                if (oUser == null || oUser == "" || oUser == undefined)
                    return false;
                else if (oUser.id != 0) user = oUser;
                return true;
            },
            error: (oError) => {
                return false;
            },
        });
    } else {
        this.token.userNotLogged();
        return false;
    }
};
