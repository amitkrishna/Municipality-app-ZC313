$("#register").click(() => {
    activity.start();
    if (registerDetails.isthere()) {
        if (registerDetails.checkEmail() != "isNotValid") {
            // TODO AJAX Call to backend

            var formData = new Object();
            formData["firstName"] = $("#fname").val();
            formData["middleName"] = $("#mname").val();
            formData["lastName"] = $("#lname").val();
            formData["email"] = $("#email").val();
            formData["password"] = $("#password").val();

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/api/users/insert",
                data: JSON.stringify(formData),
                contentType: "application/json",
                dataType: "json",
                success: (isValid) => {
                    if(isValid)
                        messageBox.show("User Registered!");
                    else
                        messageBox.show("Error while Registering!");
                },
                error: () => {
                    messageBox.show("Error while Registering!");
                },
            });
        } else {
            messageBox.show("Email is Invalid");
        }
    } else {
        messageBox.show("Fields are empty");
    }
});

registerDetails = () => {};
registerDetails.isthere = () => {
    if (
        $("#fname").val().trim() == "" ||
        $("#lname").val().trim() == "" ||
        $("#email").val().trim() == "" ||
        $("#password").val().trim() == ""
    )
        return false;
    return true;
};
registerDetails.checkEmail = () => {
    if (isEmail($("#email").val().trim())) return $("#email").val().trim();
    return "isNotValid";
};
