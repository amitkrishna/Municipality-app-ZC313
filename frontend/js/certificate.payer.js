applyBirth = () => {
    activity.start();

    var formData = new Object();
    formData["name"] = $("#birthName").val();
    formData["date"] = $("#birthTimestamp").val();
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/",
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "json",
        success: (isValid) => {
            messageBox.show("Birth Certicate Applied!");
        },
        error: () => {
            messageBox.show("Error applying birth certificate!");
        },
    });
};
applyDeath = () => {
    activity.start();

    var formData = new Object();
    formData["name"] = $("#deathhName").val();
    formData["date"] = $("#deathTimestamp").val();
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/",
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "json",
        success: (isValid) => {
            messageBox.show("Death Certicate Applied!");
        },
        error: () => {
            messageBox.show("Error applying death certificate!");
        },
    });
};
