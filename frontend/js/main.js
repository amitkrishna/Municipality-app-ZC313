spinner = () => {};
spinner.start = () => {
    $("#spinner").show();
    $("#spinnerLayer").show();
};
spinner.stop = () => {
    $("#spinner").hide();
    $("#spinnerLayer").hide();
};

activity = () => {};
activity.start = () => {
    spinner.start();
};
activity.stop = () => {
    spinner.stop();
};

messageBox = () => {};
messageBox.show = (message) => {
    $("#message")[0].innerText = message;
    $("#messageBox").show();
    $("#messageBox").addClass("messageHidden");
};
messageBox.close = () => {
    $("#messageBox").hide();
    $("#messageBox").removeClass("messageHidden");
    spinner.stop();
};

$("#messageOk").click(() => {
    messageBox.close();
});

//func
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

logout = () => {
    cookie.erase("SSID");
    window.location.href = "login.html";
};

modifyDate = (date) => {
    var date = new Date(date);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
};
