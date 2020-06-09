template = () => {};
template.certHead = () => {
    var table = document.createElement("table");
    table.setAttribute("class", "table");
    var trhead = document.createElement("tr");
    trhead.setAttribute("class", "head");
    var th = document.createElement("th");
    th.innerHTML = "Certificates";
    trhead.appendChild(th);
    table.appendChild(trhead);

    return table;
};
template.certRow = (value) => {
    var trbody = document.createElement("tr");
    trbody.setAttribute("class", "tr");
    trbody.setAttribute("uuid", value.id);

    var td = document.createElement("td");
    trbody.appendChild(td);

    var eachTax = document.createElement("div");
    eachTax.setAttribute("class", "each-tax");

    var userZone = document.createElement("div");
    userZone.setAttribute("class", "user-name");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.name;

    p.innerHTML = "Name: ";
    p.appendChild(span);
    userZone.appendChild(p);
    eachTax.appendChild(userZone);

    var userArea = document.createElement("div");
    userArea.setAttribute("class", "user-datetime");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.time;

    p.innerHTML = "Date: ";
    p.appendChild(span);
    userArea.appendChild(p);
    eachTax.appendChild(userArea);

    var userAmt = document.createElement("div");
    userAmt.setAttribute("class", "user-type");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.type + " Certificate";

    p.innerHTML = "Type: ";
    p.appendChild(span);
    userAmt.appendChild(p);
    eachTax.appendChild(userAmt);

    td.appendChild(eachTax);
    trbody.appendChild(td);

    return trbody;
};
$(".table-container").append(template.certHead());

$.ajax({
    type: "GET",
    url: "http://localhost:8080/api/v1/property-tax/show/" + user.email,
    contentType: "application/json",
    dataType: "json",
    success: (oSuccess) => {
        if (oSuccess.length > 0) {
            oSuccess.forEach((value, key) => {
                $(".table").append(template.certRow(value));
            });
        }
    },
    error: (oError) => {
        if (oError.status == 404) {
            $(".table-container").append("No Data found!");
            activity.stop();
        } else messageBox.show("Error connecting");
    },
});

applyBirth = () => {
    activity.start();

    var formData = new Object();
    formData["name"] = $("#birthName").val();
    formData["date"] = new Date($("#birthTimestamp").val()).toISOString();
    formData["type"] = "birth";
    formData["email"] = user.email;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/",
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "json",
        success: (isValid) => {
            window.location.href = "certificate.payer.html";
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
    formData["date"] = new Date($("#deathTimestamp").val()).toISOString();
    formData["type"] = "death";
    formData["email"] = user.email;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/",
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "json",
        success: (isValid) => {
            window.location.href = "certificate.payer.html";
        },
        error: () => {
            messageBox.show("Error applying death certificate!");
        },
    });
};
