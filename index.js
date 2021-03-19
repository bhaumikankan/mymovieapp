"use strict"
const searchinput=document.querySelector("input")
const btnsearch=document.querySelector(".searchbtn")
const moviecontainer=document.querySelector(".card-columns")

btnsearch.addEventListener("click",(evt)=>{
   evt.preventDefault();
   console.log(searchinput.value)
   getmovie(searchinput.value)
   searchinput.value="";
   searchinput.blur();
})

function getmovie(quarie){

  axios.get("https://www.omdbapi.com?apikey=a0989760&s="+quarie)
  .then((res)=>{
      movieposter(res.data.Search)
      
  })
  .catch((err)=>{
    console.log(err)
  })
  function movieposter(moviedata){
   
    moviecontainer.innerHTML="";
      moviedata.forEach(element => {
        let  HTML=`
          <div class=" m-1" >
          <center>
         <div class="card-body">
          <img src="${element.Poster}" class="img-fluid">
          <h3 class=text-white><b>${element.Title}</b></h3>
          <a onclick="moviedetails('${element.imdbID}')" hrf="#" class="btn btn-primary text-white btn-block">Cheakout</a>
         </div>
         </center>
       </div>
          `
    moviecontainer.insertAdjacentHTML("afterbegin",HTML)
      });
  }
  
  
}
function moviedetails(id){
    sessionStorage.setItem("movieID",id);
    window.location="movie.html"
    return false
}
function getmoviedetail(){
    
    let id=sessionStorage.getItem("movieID")
    axios.get("https://www.omdbapi.com?apikey=a0989760&i="+id)
    .then((res)=>{
        console.log(res)
        let movie=res.data;
        let HTML=`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group text-dark" >
              <li class="list-group-item text-dark"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row mb-5">
          <div class="well">
            <h3 class="ml-3 mt-3">Plot</h3>
            <p class="ml-3">${movie.Plot}</p>
            <hr>
            <a  href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary ml-3">View IMDB</a>
            <a href="index.html" class="btn btn-default text-white ml-3">Go Back To Search</a>
          </div>
        </div>
        `
        document.querySelector(".movie").insertAdjacentHTML("afterbegin",HTML)
    })
    .catch((err)=>{
        console.log(err)
    })
}


