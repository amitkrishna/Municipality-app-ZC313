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
template.payerRow = (value) => {
    var trbody = document.createElement("tr");
    trbody.setAttribute("class", "tr");
    trbody.setAttribute("uuid", value.paid);

    var td = document.createElement("td");
    trbody.appendChild(td);

    var eachTax = document.createElement("div");
    eachTax.setAttribute("class", "each-tax");

    var propertyId = document.createElement("div");
    propertyId.setAttribute("class", "user-propertyId");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.propertyId;

    p.innerHTML = "Property Id: ";
    p.appendChild(span);
    propertyId.appendChild(p);
    eachTax.appendChild(propertyId);

    var taxPayable = document.createElement("div");
    taxPayable.setAttribute("class", "user-taxPayable");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.taxPayable;

    p.innerHTML = "Tax Payable: ";
    p.appendChild(span);
    taxPayable.appendChild(p);
    eachTax.appendChild(taxPayable);

    var discount = document.createElement("div");
    discount.setAttribute("class", "user-discount");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.discount;

    p.innerHTML = "Discount: ";
    p.appendChild(span);
    discount.appendChild(p);
    eachTax.appendChild(discount);

    var approved = document.createElement("div");
    approved.setAttribute("class", "user-approved");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.discountApproved ? "Yes" : "No";

    p.innerHTML = "Discount Approved: ";
    p.appendChild(span);
    approved.appendChild(p);
    eachTax.appendChild(approved);

    var selfOccupied = document.createElement("div");
    selfOccupied.setAttribute("class", "user-selfOccupied");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.selfOccupied ? "Yes" : "No";

    p.innerHTML = "Self Occupied: ";
    p.appendChild(span);
    selfOccupied.appendChild(p);
    eachTax.appendChild(selfOccupied);

    var paid = document.createElement("div");
    paid.setAttribute("class", "user-paid");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.paid ? "Yes" : "No";

    p.innerHTML = "Paid: ";
    p.appendChild(span);
    paid.appendChild(p);
    eachTax.appendChild(paid);

    if (!value.discountRaised) {
        var userDisc = document.createElement("div");
        userDisc.setAttribute("class", "user-discount");
        var button = document.createElement("button");
        button.setAttribute("class", "button");
        button.setAttribute("uuid", value.id);
        button.setAttribute("onclick", "discount();");
        button.innerHTML = "Raise Discount";

        userDisc.appendChild(button);
        eachTax.appendChild(userDisc);
    }

    if (!value.paid) {
        var userPay = document.createElement("div");
        userPay.setAttribute("class", "user-pay");
        var button = document.createElement("button");
        button.setAttribute("class", "button");
        button.setAttribute("uuid", value.id);
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
                $(".table").append(template.payerRow(value));
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

$.ajax({
    type: "GET",
    url: "http://localhost:8080/api/v1/property/show/" + user.email,
    contentType: "application/json",
    dataType: "json",
    success: (oSuccess) => {
        if (oSuccess.length > 0) {
            oSuccess.forEach((value, key) => {
                var option = document.createElement("option");
                option.setAttribute("value", value.id);
                option.innerHTML =
                    value.id +
                    " | Zone: " +
                    value.zone +
                    " | Area: " +
                    value.area;
                $("#property")[0].appendChild(option);
            });
        } else {
        }
    },
    error: (oError) => {
        if (oError.status == 404) {
        } else messageBox.show("Error getting properties");
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
            window.location.href = "tax.payer.html";
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
        url:
            "http://localhost:8080/api/v1/property-tax/raise-discount/" +
            event.currentTarget.getAttribute("uuid"),
        contentType: "application/json",
        dataType: "json",
        success: (oSuccess) => {
            window.location.href = "tax.payer.html";
        },
        error: () => {
            messageBox.show("Error while enabling raise discount!");
        },
    });
};

addPropertyTax = () => {
    activity.start();

    var formData = new Object();
    formData["dateCreated"] = new Date().toISOString();
    formData["discount"] = 0;
    formData["discountApproved"] = false;
    formData["discountRaised"] = $("#raiseDiscount").is(":checked");
    formData["email"] = user.email;
    formData["paid"] = false;
    formData["propertyId"] = parseInt($("#property").val());
    formData["selfOccupied"] = $("#selfOccupied").is(":checked");

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/property-tax/calculate",
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "json",
        success: (isValid) => {
            window.location.reload();
        },
        error: () => {
            messageBox.show("Error while adding property!");
        },
    });
};
