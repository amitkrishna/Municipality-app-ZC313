token = () => {};
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
            success: (ouser) => {},
            error: (oError) => {},
        });
    }
    else{
        //not looged
    }
};
