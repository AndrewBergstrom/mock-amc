const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ff230f9ce564a1adc6eadf71767706fe&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

// ending search with single double quotes to concat with search
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=ff230f9ce564a1adc6eadf71767706fe&query="'

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

// Get initial movies
getMovies(API_URL)

//FETCHING MOVIES BY URL
async function getMovies(url){
  const res = await fetch(url)
  const data = await res.json()

  // console.log(data.results)
  showMovies(data.results)
}

function showMovies(data){

  main.innerHTML = ''

  data.forEach((movie) => {
    // destructuring
    const { title, poster_path, vote_average, overview } = movie

    //constructing div with real movie data and then putting it into DOM
    const movieElement = document.createElement('div')
    movieElement.classList.add('movie')

    movieElement.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}">
    <div class="movie-info">
      <h3>${title}</h3>
      <span class=${getClassByRate(vote_average)}>${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>
   `

  main.appendChild(movieElement)

  })
}

function getClassByRate(vote) {
  if(vote >= 8){
    return 'green'
  } else if (vote >= 5){
    return 'orange'
  } else {
    return 'red'
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if(searchTerm && searchTerm !== ''){

    //returns search API and concatinates search term
    getMovies(SEARCH_API + searchTerm)

    //clears search
    search.value = ''
    
    // If no input, reload page
  } else {
    window.location.reload()
  }
} )
