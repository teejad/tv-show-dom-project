
//using displayShows() to display all shows in showlist
function displayShows(shows) {
    var showlist = document.getElementById("showlist");
    showlist.innerHTML = "";
    for (var i = 0; i < shows.length; i++) {
        var show = shows[i];
        var showElement = document.createElement("li");
        showElement.innerHTML = show.name;
        showElement.setAttribute("id", show.id);
        showElement.setAttribute("class", "show");
        showlist.appendChild(showElement);
    }
}