template = () => {};
template.certHead = () => {
    var table = document.createElement("table");
    table.setAttribute("class", "table");
    table.setAttribute("id", "table");
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
    span.innerHTML = value.date;

    p.innerHTML = "Date: ";
    p.appendChild(span);
    userArea.appendChild(p);
    eachTax.appendChild(userArea);

    var userArea = document.createElement("div");
    userArea.setAttribute("class", "user-datetime");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.time;

    p.innerHTML = "Time: ";
    p.appendChild(span);
    userArea.appendChild(p);
    eachTax.appendChild(userArea);

    var userAmt = document.createElement("div");
    userAmt.setAttribute("class", "user-type");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML =
        value.category.charAt(0).toUpperCase() +
        value.category.slice(1) +
        " Certificate";

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
    url: "http://localhost:8080/api/v1/certificate/show/" + user.email,
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
    formData["date"] = getDateFormat($("#birthTimestamp").val());
    formData["time"] = getTimeFormat($("#birthTimestamp").val());
    formData["category"] = "birth";
    formData["dateCreated"] = getDateFormat(new Date());
    formData["email"] = user.email;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/certificate/request",
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
    formData["name"] = $("#deathName").val();
    formData["date"] = getDateFormat($("#deathTimestamp").val());
    formData["time"] = getTimeFormat($("#deathTimestamp").val());
    formData["category"] = "death";
    formData["dateCreated"] = getDateFormat(new Date());
    formData["email"] = user.email;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/certificate/request",
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

getDateFormat = (datetime) => {
    const date = new Date(datetime);
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const [
        { value: month },
        ,
        { value: day },
        ,
        { value: year },
    ] = dateTimeFormat.formatToParts(date);

    return `${year}-${month}-${day}`;
};

getTimeFormat = (datetime) => {
    const date = new Date(datetime);
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    const [
        { value: hour },
        ,
        { value: minute },
        ,
        { value: second },
    ] = dateTimeFormat.formatToParts(date);

    return `${hour}:${minute}:${second}`;
};

generateReoprtCert = () => {
    const doc = new jsPDF("l", "pt", "a4");
    doc.autoTable({ html: "#table" });
    doc.save("certificate.pdf");
};

var specialElementHandlers = {
    "#editor": function (element, renderer) {
        return true;
    },
};
