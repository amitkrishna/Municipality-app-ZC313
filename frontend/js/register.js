$("#register").click(() => {
    activity.start();
    if (loginDetails.isthere()) {
        if(loginDetails.checkEmail() != "isNotValid"){
            
            // TODO AJAX Call to backend
        } else {
            messageBox.show("Email is Invalid");
        }
    } else {
        messageBox.show("Fields are empty");
    }
});

loginDetails = () => {};
loginDetails.isthere = () => {
    if ($("#email").val().trim() == "" || $("#password").val().trim() == "")
        return false;
    return true;
};
loginDetails.checkEmail = () => {
    if(isEmail($("#email").val().trim()))
        return $("#email").val().trim()
    return "isNotValid";
};