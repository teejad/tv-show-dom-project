//You can edit ALL of the code here

let allShows;
let allEpisodes;
let allEpisodeList;
let selectedShow;



const episodeSelector = document.getElementById("episodeSelector");
const episodeCount = document.getElementById("episodeCount");
const episodeList = document.getElementById("episodeList");
const showList = document.getElementById("showsList");
const episodeOption = document.createElement("option");
const allEpisodesBtn = document.createElement('button');
const rootElem = document.getElementById("root");
const showsElem = document.getElementById("tvShows");
const episodesElem = document.getElementById("episodes");
// const mainList = document. createElement ("ul"); 
const searchShows = document.getElementById('searchShows');
const searchEpisodesEl = document.getElementById('searchEpisodes');



//=============================SHOWS=====================================//

//fetch shows from tvmaze api and display them in the showList and sort them alphabetically by show name
function fetchShows() {
  fetch('https://api.tvmaze.com/shows')
    .then(response => response.json())
    .then(data => {
      allShows = data;
      allShows.sort(function(a, b) {
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
        // console.log(show.name);
        const showOption = document.createElement("option");
        showOption.value = show.id;
        showOption.innerText = show.name;
        //getEpisodes(show.id);
        // console.log(showList);
        showList.appendChild(showOption);
      });
      makePageForShows(allShows);
    });
  
}




function displaySelectedShow(arr) {
	createEpisodeSelect(arr);
	displayEpisodes(arr);
	searchEpisodesEl.value = '';
	searchShows.setAttribute('style', 'display: none !important');
	searchEpisodesEl.setAttribute('style', 'display: inline');
}




function createShowSelect(arr) {
	selectedShow.innerHTML = '';
	let selectAllShows = document.createElement('option');
	selectAllShows.innerText = 'All Shows';
	selectAllShows.value = 'allShows';
	selectedShow.appendChild(selectAllShows);
	arr.forEach(show => {
		let selectOption = document.createElement('option');
		selectOption.innerText = show.name;
		selectOption.value = show.id;
		selectedShow.appendChild(selectOption);
	})
}


//Display selected shows on the page
// function displaySelectedShowEpisode(shows) {
//   console.log(shows);
//   // showList.innerHTML = '';
//   // shows.forEach(show => {
//   //   const showOption = document.createElement("option");
//   //   showOption.value = show.id;
//   //   showOption.innerText = show.name;
//   //   showList.appendChild(showOption);
//   // });
// }








//=============================SHOW CONTAINER=====================================//

//Create show container for each show from fetchShows() and display them on the page
function makePageForShows(shows) {
  //   const showContainer = document.createElement("div");
  //   showContainer.className = "showContainer";  //add class to showContainer
  //   // showContainer.id = show.id;
  //   //showContainer.innerHTML = `<h2>${show.name}</h2>`;
  //   rootElem.appendChild(showContainer);
  //  showContainer.style.backgroundColor = "lightgray";

  //   //EPISODE LIST
 let mainList = document. createElement ("ul"); 
  mainList.style.listStyleType = "none";
  mainList.style.display = "flex";
  mainList.style.flexWrap = "wrap";
  mainList.style.flexDirection= "row";
  mainList.style.backgroundColor = "lightgray";
  mainList.style.padding = "0";
  mainList.style.margin = "0";
  mainList.style.border = "1px solid black";
  mainList.style.width = "100%";
  mainList.style.height = "100%";

  //Style the show container for each show and display the show name and episode count on the page
  




  rootElem.appendChild(mainList);

  shows.forEach(show => {

      //LIST ITEM
    let currentEpisode = document.createElement("li");
    currentEpisode.classList.add('Episodes');
    currentEpisode.style.display = "inline";
    currentEpisode.style.width = "70%"
    currentEpisode.style.lineHeight = "200px";


    //INNER CONTAINER
    let innerCardSection = document.createElement("div");

    // innerCardSection.style.color =  "black";
    innerCardSection.style.backgroundColor =  "white";
    innerCardSection.style.margin = "20px";
    innerCardSection.style.display = "flex";
    innerCardSection.style.width= "100%";
    innerCardSection.style.borderRadius = "25px";
    innerCardSection.style.border = "1px solid black";
    


    //COVER IMAGE
    var cardImage = document.createElement('div');
    cardImage.className = 'card-image';
    cardImage.style.backgroundImage = `url(${show.image.medium})`;
    cardImage.style.backgroundSize = 'cover';
    cardImage.style.height = '200px';
    //cardImage.style.width = '75%';
    cardImage.style.display = "flex";
    cardImage.style.margin = 'auto';
    cardImage.style.justifyContent = 'center';
    cardImage.style.alignItems = 'center';
   
    cardImage.style.padding = "10px"

    cardImage.style.backgroundPosition = 'center';
    cardImage.style.backgroundRepeat = 'no-repeat';

  innerCardSection.appendChild(cardImage);
  currentEpisode.appendChild(innerCardSection);
  mainList.appendChild(currentEpisode)
// currentEpisodeTitle.appendChild(currentEpisode)


//EPISODE TITLE AND EPISODE NUMBER 
  let currentEpisodeTitle = document.createElement("div");
  // currentEpisodeTitle.className = "card-title";
  currentEpisodeTitle.style.display = "flex"
  currentEpisodeTitle.style.flexDirection = "column";
  // currentEpisodeTitle.style.justifyContent = "center";
  currentEpisodeTitle.style.alignItems = "center";
  currentEpisodeTitle.style.margin = "10px";
  currentEpisodeTitle.style.padding = "10px";

  let episodeTitle = document.createElement("h3");
  episodeTitle.innerText = show.name;
  episodeTitle.style.fontSize = "1.5em";
  episodeTitle.style.fontWeight = "bold";
  episodeTitle.style.textAlign = "center";
  episodeTitle.style.color = "black";

  let episodeNumber = document.createElement("h4");
  episodeNumber.innerText = `${show.id}`;
  episodeNumber.style.fontSize = "1em";
  episodeNumber.style.fontWeight = "bold";
  episodeNumber.style.textAlign = "center";
  episodeNumber.style.color = "black";

  currentEpisodeTitle.appendChild(episodeTitle);
  currentEpisodeTitle.appendChild(episodeNumber);
  innerCardSection.appendChild(currentEpisodeTitle);


  });


}

// function displayAllShows(arr) {
// 	createShowSelect(arr);
// 	displayShows(arr);
// 	searchShows.value = '';
// 	searchShows.setAttribute('style', 'display: inline');
// 	searchEpisodesEl.setAttribute('style', 'display: none !important');
// }












//=============================EPISODES=====================================//

//fetch episodes from tvmaze api and display them in the episodeList and sort them by season and episode number
async function getEpisodes(id) {
	f
etch(`https://api.tvmaze.com/shows/${id}/episodes`)
		.then(res => res.json())
		.then(data => {
			allEpisodes = data;
      displayAllEpisodes(allEpisodes)
      console.log(allEpisodes);
			searchShows.value = '';
		})
		.catch(error => console.log(error));
}

function displayEpisodes(arr) {
	showsEl.setAttribute('style', 'display:none !important');
	episodesEl.setAttribute('style', 'display:inline');
	let allEpisodesHTML = '';
	arr.forEach(episode => allEpisodesHTML += getEpisodeCard(episode));
	episodesElem.innerHTML = allEpisodesHTML;
	searchResult.innerHTML = `Displaying ${arr.length}/${arr.length}`;
	searchShows.setAttribute('style', 'display: none !important');
	searchEpisodesEl.setAttribute('style', 'display: inline');
}



//DISPLAY ALL EPISODES FOR SELECTED SHOW
  async function displayAllEpisodes(episodes) {
  episodeList.innerHTML = '';
  console.log(episodes);
  episodes.forEach(episode => {
    const episodeOption = document.createElement("option");
    episodeOption.value = episode.id;
    episodeOption.innerText = `${episode.name}`;
    episodeList.appendChild(episodeOption);
  });
}





//CREATE AN EVENT LISTENER FOR THE SHOW LIST AND DISPLAY THE EPISODES FOR THE SELECTED SHOW 
showList.addEventListener('change', () =>  {
  const selectedShow = showList.value;
  console.log(selectedShow);
   getEpisodes(selectedShow);  
});



//CREATE AN EVENT LISTENER FOR THE EPISODE LIST AND DISPLAY THE EPISODES FOR THE SELECTED SHOW












//=============================SEARCH=====================================//























//Episode Count 




// let episodeCount = document.getElementById("episodeCount");
// let allEpisodeList = {};
// const allShows = getAllShows();

// //Create a page for all show from shows.js 
// function makePageForEpisodes(episodes){
//     let episodeList = document.getElementById("episodeList");
//     let episodeListHTML = "";
//     for(let i = 0; i < episodes.length; i++){
//         episodeListHTML += `<li>${episodes[i].name}</li>`;
//     }
//     episodeList.innerHTML = episodeListHTML;
// }

    


 
//Search Bar 
// Getting all the episode > Filtering based on the search term in the input box > Filter needs to match summary episode name 
// showAllEpisodeBtn()
// search.addEventListener('keyup', ()=> {
//   const allEpisodes = getEpisodes(82);
//   const filteredEpisode = allEpisodes.filter(episode => 
//     episode.name.toLocaleLowerCase().includes(search.value.toLowerCase()) || 
//     episode.summary.toLocaleLowerCase().includes(search.value.toLowerCase())
//   );
//   episodeCount.innerHTML = filteredEpisode.length;
  

//     makePageForEpisodes(filteredEpisode)  
// });

//ADD AN EVENT LISTENER TO THE BUTTON // 

  function setup() {
    fetchShows();
    makePageForShows();
   // getEpisodes();
  // const allEpisodes = await getEpisodes(82);
  // allEpisodeList = allEpisodes;
  // console.log(allEpisodes);
  // episodeCount.innerHTML = allEpisodes.length;
  // makePageForEpisodes(allEpisodes);
  // setupEpisodeSelector(allEpisodes);
 
}

// //SELECT EPISODE 
// function setupEpisodeSelector(episodes){
//   // const episodeSelector = document.getElementById("episodeSelector");
//   episodes.forEach((episode) => {
//     const episodeOption = document.createElement("option");
//     let episodeCode = `S${pad2(episode.season)}E${pad2(episode.number)}`;
//     episodeOption.value = `${episodeCode}-${episode.name}`;
//     episodeOption.innerHTML = `${episodeCode}-${episode.name}`;

//     episodeSelector.appendChild(episodeOption);

//   })  
//   console.log(episodeSelector.value);
//  // episodeSelector.value == "pls" ? makePageForEpisodes(episodes) : 
//  episodeSelector.addEventListener('change', ()=>{

// if (episodeSelector.value == "pls") {
//     makePageForEpisodes(episodes);
//     episodeCount.innerHTML = episodes.length;
//   }else{
  
//    let filterEpisode = episodes.filter((episode) => 
//     episode.name.includes((episodeSelector.value.split('-')[1])
//   ));
//   episodeCount.innerHTML = filterEpisode.length;
//   makePageForEpisodes(filterEpisode);
//   }  

//   });
// }

//SHOWS 
//fetch all episodes from tvmaze api given a show id
//  async function getEpisodes (showId) {

//   const response = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
//   const json = await response.json();
//   console.log(json);
//   return json;
  

// }

//ALL SHOW
// const allShows = showAllShowBtn();

// async function showAllShowBtn(){
//   const allShows = await getShows();
//   console.log(allShows);
//   makePageForShows(allShows);
// } 
// //import shows from shows.js and make a page for each show 
// async function getShows(){
//   const response = await fetch(`https://api.tvmaze.com/shows`);
//   const json = await response.json();   //json is an array of shows   
//   return json;
// }





//ALL EPISODE 
// async function showAllEpisodeBtn(){
//   allEpisodesBtn.innerHTML = "All Episodes";
//   allEpisodesBtn.addEventListener('click', ()=>{
//     makePageForEpisodes(getEpisodes(82))
//     episodeCount.innerHTML = getEpisodes(82).length;

//   });
//   const bodyElem = document.body;
//   bodyElem.insertBefore(allEpisodesBtn,rootElem);

// }

// function pad2(number){
//   return (number < 10 ? '0' : '') + number;
// }

// function makePageForEpisodes(episodeList) {  
//   //root from html 
//   const rootElem = document.getElementById("root");
//   rootElem.innerHTML = "";
//   let mainHeader = document.createElement("h1");
//   rootElem.appendChild(mainHeader);


//   // mainHeaderLink.textContent.style.fontStyle = "Game of Thrones Episodes, Extracted from TVMaze.com"

//   // mainHeader.appendChild(mainHeaderLink);

//   //let cardColor =  '#444444';
//   //EPISODE LIST
//   // let mainList = document. createElement ("ul"); 
//   mainList.style.listStyleType = "none";
//   mainList.style.display = "flex";
//   mainList.style.flexWrap = "wrap";
//   mainList.style.flexDirection= "row";
//   mainList.style.backgroundColor = "lightgray";
//   mainList.style.padding = "0";
//   mainList.style.margin = "0";


//   //mainList.style.backgroundColor=  "white";



//   rootElem.appendChild(mainList);


  
  

//   episodeList.forEach((episode) => {
//     //EPISODE CODE 
//     let episodeCode = `S${pad2(episode.season)}E${pad2(episode.number)}`;

//     //LIST ITEM
//     let currentEpisode = document.createElement("li");
//     currentEpisode.classList.add('Episodes');
//     currentEpisode.style.display = "flex";
//     currentEpisode.style.width = "33.333%"
//     currentEpisode.style.lineHeight = "200px";


//     //INNER CONTAINER
//     let innerCardSection = document.createElement("div");
//     innerCardSection.style.color =  "black";
//     innerCardSection.style.backgroundColor =  "white";
//     innerCardSection.style.margin = "10px";
//     innerCardSection.style.display = "table";
//     innerCardSection.style.width= "100%";
//     innerCardSection.style.borderRadius = "25px";

    



//     currentEpisode.appendChild(innerCardSection);

//     //let color =  '#ececec';
//     //cardColor.style.color =  "gray";

    

//     //TEXT
//     let currentEpisodeTitle = document.createElement("h3");
//     currentEpisode.style.textAlign = 'center';
//     currentEpisodeTitle.style.lineHeight = '4';
//     currentEpisodeTitle.textContent = `${episode.name} - ${episodeCode}`;
//     innerCardSection.appendChild(currentEpisodeTitle);
//     currentEpisodeTitle.classList.add("episodeTitle");

  

  
//     //COVER IMAGE
//     var cardImage = document.createElement('div');
//     cardImage.className = 'card-image';
//     cardImage.style.backgroundImage = `url(${episode.image.medium})`;
//     cardImage.style.backgroundSize = 'cover';
//     cardImage.style.height = '180px';
//     //cardImage.style.width = '75%';
//     cardImage.style.display = "flex";
//     cardImage.style.margin = 'auto';
//     cardImage.style.justifyContent = 'center';
//     cardImage.style.alignItems = 'center';
   
//     cardImage.style.padding = "5px"

//     // cardImage.style.backgroundPosition = 'center';
//     // cardImage.style.backgroundRepeat = 'no-repeat';

//       innerCardSection.appendChild(cardImage);
//   //SUMMARY 
//   let episodeSummary = document.createElement("p");
//   episodeSummary.classList.add("episodeSummary");
//   episodeSummary.style.textAlign = 'justify';
//   episodeSummary.style.lineHeight = '20px';
//   episodeSummary.style.fontFamily= 'sans-serif';
//   episodeSummary.style.fontStyle= "normal";
//   episodeSummary.style.fontWeight= "400";
//   episodeSummary.style.letterSpacing= "0";
//   episodeSummary.style.padding= "1rem";
//   episodeSummary.style.textRendering= "optimizeLegibility";
//   episodeSummary.textContent = `${episode.summary}`;
//   innerCardSection.appendChild(episodeSummary);

//   //episodeSummary.innerHTML = episode.summary;
//       mainList.appendChild(currentEpisode);
//       rootElem.appendChild(mainList)

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
//   })
// };

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
// });
