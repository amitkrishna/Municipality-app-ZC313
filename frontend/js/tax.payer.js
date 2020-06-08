template = () => {};
template.payerHead = () => {
    var table = document.createElement("table");
    table.setAttribute("class", "table");
    var trhead = document.createElement("tr");
    trhead.setAttribute("class", "head");
    var th = document.createElement("th");
    th.innerHTML = "Property Tax";
    trhead.appendChild(th);
    table.appendChild(trhead);

    return table;
};
template.payerRow = (zone, area, amt, uuid) => {
    var trbody = document.createElement("tr");
    trbody.setAttribute("class", "tr");
    trbody.setAttribute("uuid", uuid);

    var td = document.createElement("td");
    trbody.appendChild(td);

    var eachTax = document.createElement("div");
    eachTax.setAttribute("class", "each-tax");

    var userZone = document.createElement("div");
    userZone.setAttribute("class", "user-zone");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = zone;

    p.innerHTML = "Zone: ";
    p.appendChild(span);
    userZone.appendChild(p);
    eachTax.appendChild(userZone);

    var userArea = document.createElement("div");
    userArea.setAttribute("class", "user-area");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = area;

    p.innerHTML = "Area: ";
    p.appendChild(span);
    userArea.appendChild(p);
    eachTax.appendChild(userArea);

    var userAmt = document.createElement("div");
    userAmt.setAttribute("class", "user-amt");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = amt;

    p.innerHTML = "Tax Payable: ";
    p.appendChild(span);
    userAmt.appendChild(p);
    eachTax.appendChild(userAmt);

    var userDisc = document.createElement("div");
    userDisc.setAttribute("class", "user-discount");
    var button = document.createElement("button");
    button.setAttribute("class", "button");
    button.setAttribute("uuid", uuid);
    button.setAttribute("onclick", "discount();");
    button.innerHTML = "Raise Discount";

    userDisc.appendChild(button);
    eachTax.appendChild(userDisc);

    var userPay = document.createElement("div");
    userPay.setAttribute("class", "user-pay");
    var button = document.createElement("button");
    button.setAttribute("class", "button");
    button.setAttribute("uuid", uuid);
    button.setAttribute("onclick", "pay();");
    button.innerHTML = "Pay";

    userPay.appendChild(button);
    eachTax.appendChild(userPay);

    td.appendChild(eachTax);
    trbody.appendChild(td);

    return trbody;
};
$(".table-container").append(template.payerHead());
$(".table").append(template.payerRow("a", "b", "c", "12"));

pay = () => {
    activity.start();
    console.log(event.currentTarget.getAttribute("uuid"));
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/",
        contentType: "application/json",
        dataType: "json",
        success: (oSuccess) => {
            if (oSuccess) messageBox.show("Raise Dicount Enabled");
            else messageBox.show("Error while enabling raise discount!");
        },
        error: () => {
            messageBox.show("Error while enabling raise discount!");
        },
    });
};

discount = () => {
    activity.start();
    console.log(event.currentTarget.getAttribute("uuid"));
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/",
        contentType: "application/json",
        dataType: "json",
        success: (oSuccess) => {
            if (oSuccess) messageBox.show("Raise Dicount Enabled");
            else messageBox.show("Error while enabling raise discount!");
        },
        error: () => {
            messageBox.show("Error while enabling raise discount!");
        },
    });
};

addPropertyTax = () => {
    activity.start();

    var formData = new Object();
    formData["zone"] = $("#zone").val();
    formData["area"] = $("#area").val();
    formData["raiseDiscount"] = $("#raiseDiscount").is(":checked");
    formData["selfOccupied"] = $("#selfOccupied").is(":checked");
    formData["email"] = user.email;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/",
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "json",
        success: (isValid) => {
            if (isValid) messageBox.show("Property Added");
            else messageBox.show("Error while adding property!");
        },
        error: () => {
            messageBox.show("Error while adding property!");
        },
    });
};
