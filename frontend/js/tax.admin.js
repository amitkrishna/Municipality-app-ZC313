template = () => {};
template.adminHead = () => {
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
template.adminRow = (zone, area, amt, email, uuid) => {
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

    var userEmail = document.createElement("div");
    userEmail.setAttribute("class", "user-email");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = email;

    p.innerHTML = "Email: ";
    p.appendChild(span);
    userEmail.appendChild(p);
    eachTax.appendChild(userEmail);

    var userAppr = document.createElement("div");
    userAppr.setAttribute("class", "user-email");
    var button = document.createElement("button");
    button.setAttribute("class", "button");
    button.setAttribute("uuid", uuid);
    button.setAttribute("onclick", "approve();");
    button.innerHTML = "Approve";

    userAppr.appendChild(button);
    eachTax.appendChild(userAppr);

    td.appendChild(eachTax);
    trbody.appendChild(td);

    return trbody;
};
$(".table-container").append(template.adminHead());
// $(".table").append(template.adminRow("a", "b", "c", "test@test.com", "12"));

$.ajax({
    type: "GET",
    url: "http://localhost:8080/api/v1/property-tax/approval-pending",
    contentType: "application/json",
    dataType: "json",
    success: (oSuccess) => {
        if (oSuccess.length > 0) {
            oSuccess.forEach((value, key) => {
                $(".table").append(
                    template.adminRow(
                        value.zone,
                        value.area,
                        value.taxPayable,
                        value.email,
                        value.id
                    )
                );
            });
        }
    },
    error: (oError) => {
        $(".table-container").append("No Data found!");
        activity.stop();
    },
});

approve = () => {
    activity.start();
    console.log(event.currentTarget.getAttribute("uuid"));
    $.ajax({
        type: "GET",
        url:
            "http://localhost:8080/api/v1/property-tax/approve-discount/" +
            event.currentTarget.getAttribute("uuid"),
        contentType: "application/json",
        dataType: "json",
        success: (oSuccess) => {
            window.location.href = "tax.admin.html";
        },
        error: () => {
            messageBox.show("Error while approving");
        },
    });
};
