generateReport = () => {
    activity.start();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/property-tax/show/" + user.email,
        contentType: "application/json",
        dataType: "json",
        success: (oSuccess) => {
            if (oSuccess.length <= 0) {
                messageBox.show("No Data Found");
                return;
            }

            var data = [];
            //5,6,7,11,12
            oSuccess.forEach((value, index) => {
                data[index] = Object.values(value);
                data[index][5] = refineBoolean(data[index][5]);
                data[index][6] = refineBoolean(data[index][6]);
                data[index][7] = refineBoolean(data[index][7]);
                data[index][9] = refineDate(data[index][9]);
                data[index][10] = refineDate(data[index][10]);
                data[index][11] = refineBoolean(data[index][11]);
                data[index][12] = refineBoolean(data[index][12]);
            });

            var doc = new jsPDF("l", "pt", "a4");
            var imgData =
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAXwBfAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wgARCAAaABQDAREAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAABQYAAwQB/8QAGAEBAQEBAQAAAAAAAAAAAAAAAwEAAgT/2gAMAwEAAhADEAAAAXKbOK1c92KOHzuQcxaHNjdidpy5yl//xAAfEAACAQMFAQAAAAAAAAAAAAABAgADEhMEEBEhIjH/2gAIAQEAAQUC+QuVq6duEqnoephWKDia/FLjLjt//8QAHREAAgIBBQAAAAAAAAAAAAAAAAIBEQMSEyAiMf/aAAgBAwEBPwEhIZLj2DOttcCkNp7G8xZfH//EAB4RAAIDAAEFAAAAAAAAAAAAAAABAgMREiAhIjFR/9oACAECAQE/AR2ONmS9MolkcZZ8aHDl4b2FTEaEun//xAAhEAABAwMEAwAAAAAAAAAAAAABAAIRAxAxEjJBQiFhYv/aAAgBAQAGPwJQ7acIg8FQWFzfS0B0t+shcpkNqHx1KqahU29rZKybf//EAB0QAQADAQACAwAAAAAAAAAAAAEAESExQVFhgZH/2gAIAQEAAT8hUFrUE1U6+ZZvXITcrvpNdp4xEO+l1b7Gv7BQdYMALdXDkpwD7ipT+kOT/9oADAMBAAIAAwAAABBnmCSOz//EABsRAQACAwEBAAAAAAAAAAAAAAEAESExYSBx/9oACAEDAQE/EAXUQdz5KIsIMuNjTLWFPNMVwaOQoRsVXn//xAAcEQEAAgIDAQAAAAAAAAAAAAABABEhMSBhcVH/2gAIAQIBAT8QUMsIdQ9/JZNpSUTIImK3bZ5AbtfZa3cpbvj/AP/EABwQAQACAwEBAQAAAAAAAAAAAAEAESExQXFRwf/aAAgBAQABPxCsIatahd4Y+dDAb93fjD4HtO4qLlXU0ej2pdETsO11xEdV8cP2hExkSA2d3NHkA0Q0CIxSEyKmjyf/2Q==";
            doc.addImage(imgData, "JPEG", 20, 20, 20, 26);
            doc.text(
                50,
                40,
                "Report for Citizen: " + user.firstName + " " + user.lastName
            );
            doc.text("\n\n", 50, 50);
            doc.autoTable({
                head: [
                    [
                        "id",
                        "Email",
                        "Zone",
                        "Area",
                        "Tax Payable",
                        "Paid",
                        "Discount Raised",
                        "Discount Approved",
                        "Discount",
                        "Date Created",
                        "Date Modified",
                        "Self Occupied",
                        "Send For Approval",
                    ],
                ],
                body: data,
                startY: 70,
            });

            doc.save("table.pdf");
            activity.stop();
        },
        error: (oError) => {
            messageBox.show("No Data Found");
        },
    });
};

refineBoolean = (value) => {
    if (value == true) return "Yes";
    else if (value == false) return "No";
};

refineDate = (date) => {
    var date = new Date(date);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
};
