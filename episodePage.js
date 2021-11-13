// //function that fetch the episode data from tvmaze api
// function fetchEpisodeData(episodeId) {
//     return fetch(`https://api.tvmaze.com/episodes/${episodeId}`)
//         .then(response => response.json())
//         .then(data => {
//         return data;
//         });
//     }


// //function showEpisodeData that takes the episode data and displays it on the page
// function showEpisodeData(episodeData) {
//     const episode = document.querySelector(".episode");
//     episode.innerHTML = `
//     <h2>${episodeData.name}</h2>
//     <p>${episodeData.summary}</p>
//     <p>${episodeData.airdate}</p>
//     <p>${episodeData.season}</p>
//     <p>${episodeData.number}</p>
//     `;
// }
