template = () => {};
template.officerHead = () => {
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
template.officerRow = (value) => {
    var trbody = document.createElement("tr");
    trbody.setAttribute("class", "tr");
    trbody.setAttribute("uuid", value.id);

    var td = document.createElement("td");
    trbody.appendChild(td);

    var eachTax = document.createElement("div");
    eachTax.setAttribute("class", "each-tax");

    var userZone = document.createElement("div");
    userZone.setAttribute("class", "user-zone");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.zone;

    p.innerHTML = "Zone: ";
    p.appendChild(span);
    userZone.appendChild(p);
    eachTax.appendChild(userZone);

    var userArea = document.createElement("div");
    userArea.setAttribute("class", "user-area");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.area;

    p.innerHTML = "Area: ";
    p.appendChild(span);
    userArea.appendChild(p);
    eachTax.appendChild(userArea);

    var userAmt = document.createElement("div");
    userAmt.setAttribute("class", "user-amt");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.taxPayable;

    p.innerHTML = "Tax Payable: ";
    p.appendChild(span);
    userAmt.appendChild(p);
    eachTax.appendChild(userAmt);

    var userEmail = document.createElement("div");
    userEmail.setAttribute("class", "user-email");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.email;

    p.innerHTML = "Email: ";
    p.appendChild(span);
    userEmail.appendChild(p);
    eachTax.appendChild(userEmail);

    var paid = document.createElement("div");
    paid.setAttribute("class", "user-paid");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = value.paid ? "Yes" : "No";

    p.innerHTML = "Paid: ";
    p.appendChild(span);
    paid.appendChild(p);
    eachTax.appendChild(paid);

    var discountRaised = document.createElement("div");
    discountRaised.setAttribute("class", "user-discountRaised");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = discountRaised.paid ? "Yes" : "No";

    p.innerHTML = "Discount Raised: ";
    p.appendChild(span);
    discountRaised.appendChild(p);
    eachTax.appendChild(discountRaised);

    var discountApproved = document.createElement("div");
    discountApproved.setAttribute("class", "user-discountApproved");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = discountApproved.paid ? "Yes" : "No";

    p.innerHTML = "Discount Approved: ";
    p.appendChild(span);
    discountApproved.appendChild(p);
    eachTax.appendChild(discountApproved);

    var dateCreated = document.createElement("div");
    dateCreated.setAttribute("class", "user-dateCreated");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = modifyDate(value.dateCreated);

    p.innerHTML = "Date Created: ";
    p.appendChild(span);
    dateCreated.appendChild(p);
    eachTax.appendChild(dateCreated);

    var dateModified = document.createElement("div");
    dateModified.setAttribute("class", "user-dateModified");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = modifyDate(value.dateModified);

    p.innerHTML = "Date Modified: ";
    p.appendChild(span);
    dateModified.appendChild(p);
    eachTax.appendChild(dateModified);

    if (!value.sendForApproval) {
        var userAppr = document.createElement("div");
        userAppr.setAttribute("class", "user-approval");
        var button = document.createElement("button");
        button.setAttribute("class", "button");
        button.setAttribute("uuid", value.id);
        button.setAttribute("onclick", "sendForApproval();");
        button.innerHTML = "Send for Approval";

        userAppr.appendChild(button);
        eachTax.appendChild(userAppr);
    }

    td.appendChild(eachTax);
    trbody.appendChild(td);

    return trbody;
};
activity.start();
$(".table-container").append(template.officerHead());
// $(".table").append(template.payerRow("a", "b", "c", "12"));

$.ajax({
    type: "GET",
    url: "http://localhost:8080/api/v1/property-tax/discount-raised",
    contentType: "application/json",
    dataType: "json",
    success: (oSuccess) => {
        if (oSuccess.length > 0) {
            oSuccess.forEach((value, key) => {
                $(".table").append(template.officerRow(value));
            });
        }
    },
    error: (oError) => {
        $(".table-container").append("No Data found!");
    },
});

sendForApproval = () => {
    activity.start();
    console.log(event.currentTarget.getAttribute("uuid"));
    $.ajax({
        type: "GET",
        url:
            "http://localhost:8080/api/v1/property-tax/send-for-approval/" +
            event.currentTarget.getAttribute("uuid"),
        contentType: "application/json",
        dataType: "json",
        success: (oSuccess) => {
            window.location.href = "tax.officer.html";
        },
        error: () => {
            messageBox.show("Error while sending approval!");
        },
    });
};
