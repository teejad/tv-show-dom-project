//You can edit ALL of the code here
//Episode Count 
let episodeCount = document.getElementById("episodeCount");

 
//Search Bar 
let search = document.getElementById("searchBar");
// Getting all the episode > Filtering based on the search term in the input box > Filter needs to match summary episode name 
showAllEpisodeBtn()
search.addEventListener('keyup', ()=> {
  const allEpisodes = getAllEpisodes();
  const filteredEpisode = allEpisodes.filter(episode => 
    episode.name.toLocaleLowerCase().includes(search.value.toLowerCase()) || 
    episode.summary.toLocaleLowerCase().includes(search.value.toLowerCase())
  );
  episodeCount.innerHTML = filteredEpisode.length;
  

    makePageForEpisodes(filteredEpisode)  
});



function setup() {
  const allEpisodes = getAllEpisodes();
  episodeCount.innerHTML = allEpisodes.length;
  makePageForEpisodes(allEpisodes);
  setupEpisodeSelector(allEpisodes);
}

//SELECT EPISODE 
function setupEpisodeSelector(episodes){
  const episodeSelector = document.getElementById("episodeSelector");
  episodes.forEach((episode) => {
    let episodeCode = `S${pad2(episode.season)}E${pad2(episode.number)}`;
    let episodeOption = document.createElement("option");
    episodeOption.value = `${episodeCode}-${episode.name}`;
    episodeOption.innerHTML = `${episodeCode}-${episode.name}`;

    episodeSelector.appendChild(episodeOption);

  })  
  console.log(episodeSelector.value);
 // episodeSelector.value == "pls" ? makePageForEpisodes(episodes) : 
 episodeSelector.addEventListener('change', ()=>{

if (episodeSelector.value == "pls") {
    makePageForEpisodes(episodes);
    episodeCount.innerHTML = episodes.length;
  }else{
  
   let filterEpisode = episodes.filter((episode) => 
    episode.name.includes((episodeSelector.value.split('-')[1])
  ));
  episodeCount.innerHTML = filterEpisode.length;
  makePageForEpisodes(filterEpisode);
  }  

  });
}


//ALL EPISODE 
function showAllEpisodeBtn(){
  const allEpisodesBtn = document.createElement('button');
  allEpisodesBtn.innerHTML = "All Episodes";
  allEpisodesBtn.addEventListener('click', ()=>{
    makePageForEpisodes(getAllEpisodes())
    episodeCount.innerHTML = getAllEpisodes().length;

  });
  const rootElem = document.getElementById("root");
  const bodyElem = document.body;
  bodyElem.insertBefore(allEpisodesBtn,rootElem);

}

function pad2(number){
  return (number < 10 ? '0' : '') + number;
}

function makePageForEpisodes(episodeList) {  
  //root from html 
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  let mainHeader = document.createElement("h1");
  rootElem.appendChild(mainHeader);


  // mainHeaderLink.textContent.style.fontStyle = "Game of Thrones Episodes, Extracted from TVMaze.com"

  // mainHeader.appendChild(mainHeaderLink);

  //let cardColor =  '#444444';
  //EPISODE LIST
  let mainList = document. createElement ("ul"); 
  mainList.style.listStyleType = "none";
  mainList.style.display = "flex";
  mainList.style.flexWrap = "wrap";
  mainList.style.flexDirection= "row";
  mainList.style.backgroundColor = "lightgray";
  mainList.style.padding = "0";
  mainList.style.margin = "0";


  //mainList.style.backgroundColor=  "white";



  rootElem.appendChild(mainList);


  
  

  episodeList.forEach((episode) => {
    //EPISODE CODE 
    let episodeCode = `S${pad2(episode.season)}E${pad2(episode.number)}`;

    //LIST ITEM
    let currentEpisode = document.createElement("li");
    currentEpisode.classList.add('Episodes');
    currentEpisode.style.display = "flex";
    currentEpisode.style.width = "33.333%"
    currentEpisode.style.lineHeight = "200px";


    //INNER CONTAINER
    let innerCardSection = document.createElement("div");
    innerCardSection.style.color =  "black";
    innerCardSection.style.backgroundColor =  "white";
    innerCardSection.style.margin = "10px";
    innerCardSection.style.display = "table";
    innerCardSection.style.width= "100%";
    innerCardSection.style.borderRadius = "25px";

    



    currentEpisode.appendChild(innerCardSection);

    //let color =  '#ececec';
    //cardColor.style.color =  "gray";

    

    //TEXT
    let currentEpisodeTitle = document.createElement("h3");
    currentEpisode.style.textAlign = 'center';
    currentEpisodeTitle.style.lineHeight = '4';
    currentEpisodeTitle.textContent = `${episode.name} - ${episodeCode}`;
    innerCardSection.appendChild(currentEpisodeTitle);
    currentEpisodeTitle.classList.add("episodeTitle");

  

  
    //COVER IMAGE
    var cardImage = document.createElement('div');
    cardImage.className = 'card-image';
    cardImage.style.backgroundImage = `url(${episode.image.medium})`;
    cardImage.style.backgroundSize = 'cover';
    cardImage.style.height = '180px';
    //cardImage.style.width = '75%';
    cardImage.style.display = "flex";
    cardImage.style.margin = 'auto';
    cardImage.style.justifyContent = 'center';
    cardImage.style.alignItems = 'center';
   
    cardImage.style.padding = "5px"

    // cardImage.style.backgroundPosition = 'center';
    // cardImage.style.backgroundRepeat = 'no-repeat';

      innerCardSection.appendChild(cardImage);
  //SUMMARY 
  let episodeSummary = document.createElement("p");
  episodeSummary.classList.add("episodeSummary");
  episodeSummary.style.textAlign = 'justify';
  episodeSummary.style.lineHeight = '20px';
  episodeSummary.style.fontFamily= 'sans-serif';
  episodeSummary.style.fontStyle= "normal";
  episodeSummary.style.fontWeight= "400";
  episodeSummary.style.letterSpacing= "0";
  episodeSummary.style.padding= "1rem";
  episodeSummary.style.textRendering= "optimizeLegibility";
  episodeSummary.textContent = `${episode.summary}`;
  innerCardSection.appendChild(episodeSummary);

  //episodeSummary.innerHTML = episode.summary;
      mainList.appendChild(currentEpisode);
      rootElem.appendChild(mainList)

  //TITLE 
    // let episodeLink = document.createElement("A");
    // episodeLink.href = episode.link.self.href.replace("api" , '');
    // episodeLink.target = "_blank";

    // episodeLink.textContent = `${episode.name} - S0${episode.season}E${episode.number < 10? "0"+ episode.number : episode.number}`
    // currentEpisodeTitle.appendChild(episodeLink)


//   let episodeCover = document.createElement("img");
//   episodeCover.classList.add("episodeCover");
//   episodeCover.src = episode.image.medium;

  // let episodeSummary = document.createElement("p");
  // episodeSummary.classList.add("p")
  // episodeSummary.innerHTML = episode.summary;

//rootElem.appendChild(currentEpisode)
// currentEpisodeTitle.appendChild(currentEpisode)
  })
};

// function generateEpisodeCard(episode){

// }



window.onload = setup;
const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

//TOGGLE

// const ball = document.querySelector(".toggle-ball");
// const items = document.querySelectorAll(
//   ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
// );

// ball.addEventListener("click", () => {
//   items.forEach((item) => {
//     item.classList.toggle("active");
//   });
//   ball.classList.toggle("active");
// });
