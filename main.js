/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

const theForm = document.querySelector("form.search-form")
const audio = document.querySelector("music-player")
theForm.addEventListener('submit', function(event){
  event.preventDefault()

  const resultContainer = document.querySelector(".search-results")
  resultContainer.textContent = "" //destroy all content

  //extract values fro the form
  const searchText = document.querySelector('#searchtext').value;
  //use fetch to search
  fetch(`https://itunes.apple.com/search?term=${searchText}`)
    .then(function(r){
      return r.json()
    })
    .then(function(json){
      //handle the response
      for (var i = 0; i < json.results.length; i++) {

        const itunesSongs = `
          <div class="artistList">
            <img class="image" value='${json.results[i].previewUrl}' src='${json.results[i].artworkUrl100}'>
            <h3 class="artistName">${json.results[i].artistName}</h3>
            <h4 class="collectionName">${json.results[i].collectionName}</h3>
            <h4 class"trackName">${json.results[i].trackName}</h4>
          </div>
        `
resultContainer.insertAdjacentHTML("beforeEnd", itunesSongs)
      }
    })
})


// Get the parent DIV, add click listener...
document.querySelector(".search-results").addEventListener("click", function(e) {
	// e.target was the clicked element
  if (e.target && e.target.nodeName == "IMG") {
    let audio = document.querySelector('.music-player')
    audio.src = e.target.getAttribute('value')
	}
});



// append value of image but first assign image a value but first decide whatever you want to click, so assign a value to the image and then append it to source of audio player
