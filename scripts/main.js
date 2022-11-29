import { global } from "./global.js";


let seccion = "popular";

// const popularMovies = document.getElementById("popularMovies");
// popularMovies.addEventListener("click", () => {
//   seccion = "popular";
//   getPopularMovies(seccion);
// });

const popular = document
  .getElementById("popularMovies")
  .addEventListener("click", () => {
    seccion = "popular";
    getPopularMovies(seccion);
  });

const upComing = document
  .getElementById("upComing")
  .addEventListener("click", () => {
    seccion = "upcoming";
    getPopularMovies(seccion);
  });

const topRated = document
  .getElementById("top_rated")
  .addEventListener("click", () => {
    getTopRated();
  });

// cambio de idioma
document.getElementById("select-lang").addEventListener("change", (ev) => {
  const lan = ev.target.value;
  console.log("Nuevo idioma:", lan);
  getPopularMovies(lan);
  getTopRated(lan);
});

// let movies =[]

//llamada a la API para las pelis populares
/////////////////popular movies conasync/await
const getPopularMovies = async (lan = "es-ES") => {
  const api = `${global.baseUrl}/movie/${seccion}?api_key=${global.apiKey}&language=${lan}&page=1`;

  const spinnerHTML = document.getElementById("spinner");
  spinnerHTML.style.display = "block";
  await sleep(500);
  try {
    let data = await fetch(api);
    data = await data.json();
    const movies = data.results;
    console.log(movies);
    renderMovies(movies);
  } catch (error) {
    console.log(error);
  }
  spinnerHTML.style.display = "none";
};
//////////axios con async await top rated
const getTopRated = async (lan = "es-ES") => {
  const api = `${global.baseUrl}/movie/top_rated?api_key=${global.apiKey}&language=${lan}&page=1`;
  const spinnerHTML = document.getElementById("spinner");
  spinnerHTML.style.display = "block";
  await sleep(500);
  const res = await axios.get(api);
  const movies = res.data.results;
  console.log(movies);
  renderMovies(movies);
  spinnerHTML.style.display = "none";
};

//////////////////popular moves con fetch
// const getPopularMovies = (lan = "es-ES") => {
//   const api = `${global.baseUrl}/movie/${seccion}?api_key=${global.apiKey}&language=${lan}&page=1`;

//   fetch(
//     `${global.baseUrl}/movie/${seccion}?api_key=${global.apiKey}&language=${lan}&page=1`
//   )
//     .then((res) => res.json()) //devuelve una promesa para capturarlo hay que hacer otro then
//     .then((data) => {
//       console.log("datos listos");
//       const movies = data.results;
//       renderMovies(movies); //pintar 20 pelis en html
//       console.log(data.results);
//     })
//     .catch((err) => console.log(err));
// };

//renderizar las pelis en el html
const renderMovies = (movies) => {
  const root = document.getElementById("movies");

  // root.innerHTML= movies.length;
  //limpiar el html
  // let resultado = ""
  root.innerHTML = ""; /////mirar esto
  //root.innerHTML = movies.length;
  for (const movie of movies) {
    
    root.innerHTML += `
  <div class="container">
    <div class ="movies">
    <div class="movie" id='${movie.id}'>
      <a><img src="${global.imageUrl}/w185/${movie.poster_path}"></a>
      <p id ="average">${movie.vote_average}</p>
      <h4>${movie.title}</h4>
      <p>${movie.release_date}</p>
    </div>
  </div>
        `; //pintar titulo de las pelis concatenados
        
  }
  //////////////////////////////////////////////////////////////////////////
  // root.innerHTML = resultado;
  // addingEnterFunction();
  
  // const userLang = navigator.language;
  // console.log("Idioma del navegador:", userLang);
  
  // console.log("cargando datos");
  ////////////////////////////////////////////////////////////////////////
}; //declarar un string arriba let moviesStr = "" y dentro se pone movieStr +=``
//Element.innerHTML = movieStr
// getPopularMovies();

// console.log(movies);

//usar funcion para demora

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
////////////////////////////
// function addingEnterFunction() {
//   const uiMovies = document.getElementsByClassName("movie");
//   Array.from(uiMovies).forEach((movie) => {
//     movie.addEventListener("click", () => {
//       getDetails(movie.id);
//     });
//   });
// }

// const getDetails = async (id) => {  
//   console.log("detalles de cada pelicula", id);

//   const api = `${global.baseUrl}/movie/${id}?api_key=${global.apiKey}&language=en-EN&page=1`;
//   const res = await axios.get(api);
//   console.log(res.data);
//   renderDetails(res.data);
// };

// const renderDetails = (resdata) => {
//   const root = document.getElementById("movies");
//   root.innerHTML = 
//   `  <h1 id = tituloPeli>${resdata.title}<h1>
//   <img src="${global.imageUrl}/w185/${resdata.poster_path}" alt="" />
//   `;
//   console.log(resdata.title);
// };
