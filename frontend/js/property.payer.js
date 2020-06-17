template = () => {};
template.payerHead = () => {
    var table = document.createElement("table");
    table.setAttribute("class", "table");
    var trhead = document.createElement("tr");
    trhead.setAttribute("class", "head");
    var th = document.createElement("th");
    th.innerHTML = "Property";
    trhead.appendChild(th);
    table.appendChild(trhead);

    return table;
};
template.payerRow = (zone, area, uuid, isTaxPayable) => {
    var trbody = document.createElement("tr");
    trbody.setAttribute("class", "tr");
    trbody.setAttribute("uuid", uuid);

    var td = document.createElement("td");
    trbody.appendChild(td);

    var eachTax = document.createElement("div");
    eachTax.setAttribute("class", "each-tax");

    var id = document.createElement("div");
    id.setAttribute("class", "user-area");
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = uuid;

    p.innerHTML = "Id: ";
    p.appendChild(span);
    id.appendChild(p);
    eachTax.appendChild(id);

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

    // var taxPayable = document.createElement("div");
    // taxPayable.setAttribute("class", "user-isTaxPayable");
    // var p = document.createElement("p");
    // var span = document.createElement("span");
    // span.innerHTML = isTaxPayable ? "Yes" : "No";

    // p.innerHTML = "Tax Payable: ";
    // p.appendChild(span);
    // taxPayable.appendChild(p);
    // eachTax.appendChild(taxPayable);

    // if (!isTaxPayable) {
    //     var taxPayablebtn = document.createElement("div");
    //     taxPayablebtn.setAttribute("class", "user-taxPayable");
    //     var button = document.createElement("button");
    //     button.setAttribute("class", "button");
    //     button.setAttribute("uuid", uuid);
    //     button.setAttribute("onclick", "updateTaxPayable();");
    //     button.innerHTML = "Update Tax Payable";

    //     taxPayablebtn.appendChild(button);
    //     eachTax.appendChild(taxPayablebtn);
    // }
    td.appendChild(eachTax);
    trbody.appendChild(td);

    return trbody;
};
activity.start();
$(".table-container").append(template.payerHead());
// $(".table").append(template.payerRow("a", "b", "c", "12"));

$.ajax({
    type: "GET",
    url: "http://localhost:8080/api/v1/property/show/" + user.email,
    contentType: "application/json",
    dataType: "json",
    success: (oSuccess) => {
        if (oSuccess.length > 0) {
            oSuccess.forEach((value, key) => {
                $(".table").append(
                    template.payerRow(
                        value.zone,
                        value.area,
                        value.id,
                        value.taxCalculated
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

// updateTaxPayable = () => {
//     activity.start();
//     console.log(event.currentTarget.getAttribute("uuid"));
//     $.ajax({
//         type: "GET",
//         url:
//             "http://localhost:8080/api/v1/property/calculate-tax/" +
//             event.currentTarget.getAttribute("uuid"),
//         contentType: "application/json",
//         dataType: "json",
//         success: (oSuccess) => {
//             activity.stop();
//             window.location.reload();
//         },
//         error: (e) => {
//             activity.stop();
//             if (e.responseText == "Tax status updated")
//                 window.location.reload();
//             else messageBox.show("Error while updating tax payable!");
//         },
//     });
// };

addProperty = () => {
    activity.start();

    var formData = new Object();
    formData["zone"] = $("#zone").val();
    formData["area"] = parseInt($("#area").val());
    // formData["taxCalculated"] = $("#taxCalculated").is(":checked");
    formData["dateCreated"] = new Date().toISOString();
    formData["userId"] = user.email;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/property/add",
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "json",
        success: (isValid) => {
            activity.stop();
            messageBox.show("Property Added");
            window.location.reload();
        },
        error: () => {
            messageBox.show("Error while adding property!");
        },
    });
};
