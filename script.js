//You can edit ALL of the code here


//==========================================================//
let allShows;
let allEpisodes;
let showLinks;
let allEpisodeList;
let selectedShow;
let isDisplayingShows = false;
let isDisplayingEpisodes = false;

const pageContent = document.getElementById("root");
const episodeSelector = document.getElementById("episodeList");
const showList = document.getElementById("showList");
const episodeList = document.getElementById("episodeList");
const episodeCount = document.getElementById("totalResult");
const searchShows = document.getElementById("searchShows");
const showContainer = document.createElement("div");
const allShowsButton = document.getElementById("allShowsButton");

const episodesContainer = document.createElement("div");



showContainer.id = "showContainer";
showContainer.className = "showContainer";





//=============================SHOWS=====================================//

//fetch shows from tvmaze api and display them in the showList and sort them alphabetically by show name
function fetchShows() {
  fetch('https://api.tvmaze.com/shows')
    .then(response => response.json())
    .then(data => {
      allShows = data;
      allShows.sort((a, b) => {
        var nameA = a.name.toLowerCase(); // ignore upper and lowercase
        var nameB = b.name.toLowerCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
      allShows.forEach(show => {
        //console.log(show.name);
        const showOption = document.createElement("option");
        showOption.value = show.id;
        showOption.innerText = show.name;
        showList.appendChild(showOption);
      });
      makePageForShows(allShows);
    });
  
 }

 function fetchEpisodes(showId) {
    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then(response => response.json())
    .then(data => {
      allEpisodes = data;
      makeEpisodeSelector(data)
      makePageForEpisodes(data); 
    })
 }




//Create show selector and use forEach to create options for each show in the allShows array
// const showSelector = document.getElementById("showSelector");




//=============================SET UP=====================================//

function setup() {
   fetchShows();
  // console.log(allShows);
  makePageForShows(allShows);
}

allShowsButton.addEventListener("click", function(){
  fetchShows();
});

//=============================EPISODES=====================================//

showList.addEventListener("change" , function(event) {
  episodeSelector.style.display = "inline";
  episodeSelector.innerHTML = "";
  if (event.target.value == "none") {
    fetchShows();
  }else{
  let showId = event.target.value;
  fetchEpisodes(showId);
  }
});


//==========================================================//
function clickShow(event) {
  // episodeSelector.innerHTML = "";
  let showId = event.target.id;
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      makePageForEpisodes(response);
      makeEpisodeSelector(response);
    })
    .catch((error) => console.log(error));
  showSelector.value = showId;
}




  //==================================================================//

  //populate the episodeSelector with options for each episode in the allEpisodes array
  const emptyImage =
  "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg";

function makePageForShows(list){
showContainer.innerHTML = "";
episodeSelector.style.display = "none";
episodeCount.innerHTML = `Displaying ${list.length} shows`;


let showTitle; 

list.forEach(function (show)  {
 let showPreview = document.createElement("div");
  showPreview.className = "showPreview";

  const containerHeader = document.createElement("div");
  containerHeader.className = "containerHeader";
  showPreview.appendChild(containerHeader);
  

  let showTitle = document.createElement("h3");
  const showLink = document.createElement("a");
  // showLink.href = "#";
  showLink.id = show.id;
  showLink.innerText = show.name;
  showTitle.appendChild(showLink);
  containerHeader.appendChild(showTitle);


  // previewTitle.appendChild(showLink);
  // showPreview.appendChild(previewTitle);
  showContainer.appendChild(showPreview);

  let showCover = document.createElement("img");
  showPreview.appendChild(showCover);
  showCover.src = `${show.image?.medium}`;
  showCover.alt = show.name;

  let showInfo = document.createElement("div");
  showInfo.className = "showInfo";
  showInfo.innerHTML=  `<p><strong> Genres:</strong> ${show.genres}</p>
  <p><strong>Status:</strong> ${show.status}</p>
  <p><strong>Rating:</strong> ${show.rating.average}</p>
  <p><strong>Runtime:</strong> ${show.runtime}</p>`;
 
  showPreview.appendChild(showInfo);

const showSummary = document.createElement("p");
showSummary.id = "showSummary";
showSummary.innerHTML = `<strong>Summary:</strong> ${show.summary.replace('<p>', '').replace('<b>','').replace('</p>', '').replace('</b>','')}`;
showPreview.appendChild(showSummary);


showCover.setAttribute("src", show.image ? show.image.medium : emptyImage);
  
showContainer.appendChild(showPreview);
pageContent.appendChild(showContainer);

});

//create event listener for each show link to display episodes

showLinks = document.querySelectorAll(".showLinks");
showLinks.forEach((link) => link.addEventListener("click", clickShow));


}




//=============================EPISODE FORMATTING =====================================//
function pad2(number){
  return (number < 10 ? '0' : '') + number;
}
 
function formatEpisode(season ,episode) {
  return `S${pad2(season)}E${pad2(episode)}`;
}



//=============================MAKE PAGE FOR EPISODES=====================================//

function makePageForEpisodes(episodeList) {
  !isDisplayingEpisodes
  showContainer.innerHTML = "";
  searchShows.value = "";
  episodeCount.innerText = ` Displaying ${episodeList.length} episodes`;

  episodeList.forEach(function (episode, index) {
    const episodeContainer = document.createElement("div");
    episodeContainer.className = "container";

    const containerHeader = document.createElement("div");
    containerHeader.className = "episodeContainerHeader";
    episodeContainer.appendChild(containerHeader);

    const episodeTitle = document.createElement("h3");
    episodeTitle.id = "name";
    containerHeader.appendChild(episodeTitle);

    const episodeNum = document.createElement("h4");
    episodeNum.id = "number";
    containerHeader.appendChild(episodeNum);

    const episodeImg = document.createElement("img");
    episodeImg.id = "image" + index;
    episodeContainer.appendChild(episodeImg);

    const episodeSummary = document.createElement("p");
    episodeSummary.id = "summary";
    episodeContainer.appendChild(episodeSummary);

    episodeNum.textContent = formatEpisode(episode.season, episode.number);
    episodeTitle.textContent = episode.name;
    episodeImg.setAttribute(
      "src",episode.image ? episode.image.medium : emptyImage
    );

    episodeSummary.innerHTML = episode.summary;
    showContainer.appendChild(episodeContainer);
    pageContent.appendChild(showContainer);
  });
}




//=============================MAKE SEARCH EVENT =====================================//


searchShows.addEventListener('input', ()=> {
  // console.log(isDisplayingShows);
  const searchBoxValue = searchShows.value.toLowerCase();
  const cardList = document.querySelectorAll(".showPreview");
  let newList = Array.from(cardList);
  newList.forEach(function (card) {
    if (card.innerText.toLowerCase().indexOf(searchBoxValue) > -1) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
  let filteredList = newList.filter((item) => item.style.display === "");
  console.log(filteredList);

  episodeCount.innerText = ` Displaying ${filteredList.length} items`;
 
});


  //=============================EPISODE SELECTOR=====================================//


  function makeEpisodeSelector(episodeList) {
    episodeSelector.style.display = "inline";
    episodeList.forEach((episode) => {
      const episodeOption = document.createElement("option");
      let episodeCode = formatEpisode(episode.season, episode.number);
      episodeOption.value = episode.id;
      episodeOption.innerText = `${episodeCode}-${episode.name}`;
      episodeSelector.appendChild(episodeOption);
   
 });

  }
  episodeSelector.addEventListener("change", displayEpisodeFromSelector);

  function displayEpisodeFromSelector() {
     if (episodeSelector.value === "none") {
       makePageForEpisodes(allEpisodes)
     } else {
      let filterEpisode = allEpisodes.filter(episode => 
      episode.id == episodeSelector.value
    //episode.id.includes((episodeSelector.value)
  );
  console.log(filterEpisode);
    makePageForEpisodes(filterEpisode);
     }
    
  }







window.onload = setup;




// const arrows = document.querySelectorAll(".arrow");
// const movieLists = document.querySelectorAll(".movie-list");

// arrows.forEach((arrow, i) => {
//   const itemNumber = movieLists[i].querySelectorAll("img").length;
//   let clickCounter = 0;
//   arrow.addEventListener("click", () => {
//     const ratio = Math.floor(window.innerWidth / 270);
//     clickCounter++;
//     if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
//       movieLists[i].style.transform = `translateX(${
//         movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
//       }px)`;
//     } else {
//       movieLists[i].style.transform = "translateX(0)";
//       clickCounter = 0;
//     }
//   });

//   console.log(Math.floor(window.innerWidth / 270));
// });

// TOGGLE

// const ball = document.querySelector(".toggle-ball");
// const items = document.querySelectorAll(
//   ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
// );

// ball.addEventListener("click", () => {
//   items.forEach((item) => {
//     item.classList.toggle("active");
//   });
//   ball.classList.toggle("active");
// }); //