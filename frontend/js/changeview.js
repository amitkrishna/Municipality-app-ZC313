changeView = (e) => {
    activity.start();
    location.hash = event.currentTarget.getAttribute("for");
    $("#" + event.currentTarget.getAttribute("parent")).hide();
};

hashChanged = (e) => {
    $("#options").hide();
    var hash = window.location.hash;
    if (window.location.hash == "")
        window.location.href = window.location.pathname.slice(1);
    else $(hash).css("display", "block");
    activity.stop();
};

loadedHashedPage = (e) => {
    activity.start();
    var hash = window.location.hash;
    if (hash != "") {
        $("#options").hide();
        if (Object.keys($(hash)).length == 0) {
            window.location.href = window.location.pathname.slice(1);
        } else hashChanged();
    }
    activity.stop();
};
