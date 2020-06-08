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
    console.log(event.currentTarget.getAttribute("uuid"));
};

discount = () => {
    console.log(event.currentTarget.getAttribute("uuid"));
};
