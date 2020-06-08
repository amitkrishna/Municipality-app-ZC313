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
template.payerRow = (
    zone,
    area,
    amt,
    uuid,
    hasDiscount,
    isPaid,
    isApproved
) => {
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

    var approved = document.createElement("div");
    approved.setAttribute("class", "user-approved");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = isApproved ? "Yes" : "No";

    p.innerHTML = "Discount Approved: ";
    p.appendChild(span);
    approved.appendChild(p);
    eachTax.appendChild(approved);

    if (!hasDiscount) {
        var userDisc = document.createElement("div");
        userDisc.setAttribute("class", "user-discount");
        var button = document.createElement("button");
        button.setAttribute("class", "button");
        button.setAttribute("uuid", uuid);
        button.setAttribute("onclick", "discount();");
        button.innerHTML = "Raise Discount";

        userDisc.appendChild(button);
        eachTax.appendChild(userDisc);
    }

    if (!isPaid) {
        var userPay = document.createElement("div");
        userPay.setAttribute("class", "user-pay");
        var button = document.createElement("button");
        button.setAttribute("class", "button");
        button.setAttribute("uuid", uuid);
        button.setAttribute("onclick", "pay();");
        button.innerHTML = "Pay";

        userPay.appendChild(button);
        eachTax.appendChild(userPay);
    }

    td.appendChild(eachTax);
    trbody.appendChild(td);

    return trbody;
};
activity.start();
$(".table-container").append(template.payerHead());
// $(".table").append(template.payerRow("a", "b", "c", "12"));

$.ajax({
    type: "GET",
    url: "http://localhost:8080/api/v1/property-tax/show/" + user.email,
    contentType: "application/json",
    dataType: "json",
    success: (oSuccess) => {
        if (oSuccess.length > 0) {
            oSuccess.forEach((value, key) => {
                $(".table").append(
                    template.payerRow(
                        value.zone,
                        value.area,
                        value.taxPayable,
                        value.id,
                        value.discountRaised,
                        value.paid,
                        value.discountApproved
                    )
                );
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

pay = () => {
    activity.start();
    console.log(event.currentTarget.getAttribute("uuid"));
    $.ajax({
        type: "GET",
        url:
            "http://localhost:8080/api/v1/property-tax/pay/" +
            event.currentTarget.getAttribute("uuid"),
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
        type: "PATCH",
        url: "http://localhost:8080/api/v1/property-tax/raise-discount",
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
    formData["discountRaised"] = $("#raiseDiscount").is(":checked");
    formData["selfOccupied"] = $("#selfOccupied").is(":checked");
    formData["email"] = user.email;
    formData["discount"] = 0;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/property-tax/calculate",
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "json",
        success: (isValid) => {
            window.location.href = "tax.payer.html";
        },
        error: () => {
            messageBox.show("Error while adding property!");
        },
    });
};
