let type = "now_playing";
let formControl = document.querySelectorAll(".form-control");
let nameInp = document.getElementById("name");
let invalidName = document.getElementById("invalidName");
let emailInp = document.getElementById("email");
let invalidEmail = document.getElementById("invalidEmail");
let phone = document.getElementById("phone");
let invalidPhone = document.getElementById("invalidPhone");
let ageInp = document.getElementById("age");
let invalidAge = document.getElementById("invalidAge");
let passwordInp = document.getElementById("password");
let invalidPassword = document.getElementById("invalidPassword");
let repassword = document.getElementById("repassword");
let invalidRepassword = document.getElementById("invalidRepassword");

async function getMovie() {
  let MoviesFetch = "";
  if (type == "trending") {
    MoviesFetch = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=a2e8492a19e662abe95c48307c5645a0`
    );
  } else {
    MoviesFetch = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=a2e8492a19e662abe95c48307c5645a0&language=en-US&page=1`
    );
  }
  let movies = await MoviesFetch.json();
  let finalMovies = await movies.results;
  displayMovies(finalMovies);
  search(finalMovies);
}

// Display Movies
function displayMovies(list) {
  let addMovie = "";
  for (let i = 0; i < list.length; i++) {
    addMovie += `<div class="col-md-4 mb-3">
        <div class="movie">
          <div class="image-movie">
            <img src="https://image.tmdb.org/t/p/w500${list[i].poster_path}" class="w-100 rounded-2 " alt=""> 
          </div>  
          <div class="desc py-5 text-center d-flex justify-content-center align-items-center flex-column rounded-2">
            <h4>${list[i].title}</h4>
            <p class="px-3">${list[i].overview}</p>
            <p>rate: ${list[i].vote_average}</p>
            <p>${list[i].first_air_date}</p>
          </div>
        </div>
      </div>`;
  }
  document.getElementById("row-movie").innerHTML = addMovie;
}

let wItems = $(".items").innerWidth();

$(".open").click(function () {
  $("nav").css("left", "0");
  $(".open").css("display", "none");
  $(".close").removeClass("d-none");

  $(".item1").animate({ top: "0px" }, 800);
  $(".item2").animate({ top: "0px" }, 1000);
  $(".item3").animate({ top: "0px" }, 1200);
  $(".item4").animate({ top: "0px" }, 1400);
  $(".item5").animate({ top: "0px" }, 1600);
  $(".item6").animate({ top: "0px" }, 1800);
});

$(".close").click(function () {
  $("nav").css("left", -wItems);
  $(".open").css("display", "block");
  $(".close").addClass("d-none");
  $(".items ul li").animate({ top: "300px" });
});

let searchInp = document.getElementById("search");
function search(search) {
  searchInp.addEventListener("keyup", function (e) {
    movieSearch = [];
    for (let i = 0; i < search.length; i++) {
      if (
        search[i].title.toLowerCase().includes(searchInp.value.toLowerCase())
      ) {
        movieSearch.push(search[i]);
      }
    }
    displayMovies(movieSearch);
  });
}

let searchWord = document.getElementById("searchWord");
async function searchByWord() {
  let SearchMovie = "";
  SearchMovie = searchWord.value;
  let searchFetch = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=a2e8492a19e662abe95c48307c5645a0&language=en-US&query=${SearchMovie}&page=1&include_adult=false`
  );
  let finalData = await searchFetch.json();
  let x = finalData.results;
  displayMovies(x);
  console.log(x[0]);
}

searchWord.addEventListener("keyup", function () {
  searchByWord();
});

getMovie();

let itemLinke = document.querySelectorAll(".item-linke");

for (let i = 0; i < itemLinke.length; i++) {
  itemLinke[i].addEventListener("click", function (e) {
    let newType = e.target.innerHTML.toLowerCase().replace(" ", "_");
    type = newType;
    getMovie();
  });
}

function validNameInp() {
  let regex = /^\w{1,}$/gm;
  if (regex.test(nameInp.value) == true) {
    nameInp.classList.replace("is-invalid", "is-valid");
    invalidName.innerHTML = "";
    return true;
  } else {
    nameInp.classList.add("is-invalid");
    invalidName.innerHTML = "Your Name is not valid";
    return false;
  }
}

function validEmailInp() {
  let regex = /^\w{1,}@\w{1,}\.[a-z]{2,3}$/gm;
  if (regex.test(emailInp.value) == true) {
    emailInp.classList.replace("is-invalid", "is-valid");
    invalidEmail.innerHTML = "";
    return true;
  } else {
    emailInp.classList.add("is-invalid");
    invalidEmail.innerHTML = "entre valid email";
    return false;
  }
}

function validPhoneInp() {
  let regex = /^01(0|1|2|5)[0-9]{8}$/gm;
  if (regex.test(phone.value) == true) {
    phone.classList.replace("is-invalid", "is-valid");
    invalidPhone.innerHTML = "";
    return true;
  } else {
    phone.classList.add("is-invalid");
    invalidPhone.innerHTML = "entre valid phone";
    return false;
  }
}

function validAgeInp() {
  let regex = /(^[1-9][0-9]{0,1}$|100$)/gm;
  if (regex.test(ageInp.value) == true) {
    ageInp.classList.replace("is-invalid", "is-valid");
    invalidAge.innerHTML = "";
    return true;
  } else {
    ageInp.classList.add("is-invalid");
    invalidAge.innerHTML = "entre valid phone";
    return false;
  }
}

function validPasswordInp() {
  let regex = /^(?=.*[A-z])(?=.*\d)[A-z\d]{8,}$/gm;
  if (regex.test(passwordInp.value) == true) {
    passwordInp.classList.replace("is-invalid", "is-valid");
    invalidPassword.innerHTML = "";
    return true;
  } else {
    passwordInp.classList.add("is-invalid");
    invalidPassword.innerHTML =
      "entre valid password *Minimum eight characters, at least one letter and one number:*";
    return false;
  }
}

function validRepasswordInp() {
  if (passwordInp.value == repassword.value && repassword.value != "") {
    repassword.classList.replace("is-invalid", "is-valid");
    invalidRepassword.innerHTML = "";
    return true;
  } else {
    repassword.classList.add("is-invalid");
    invalidRepassword.innerHTML = "entre valid Repassword";
    return false;
  }
}

let btn = document.getElementById("btn");

for (let i = 0; i < formControl.length; i++) {
  formControl[i].style.cssText = "background-color : transparent !important";
  formControl[i].addEventListener("keyup", function () {
    if (
      validNameInp() == true &&
      validEmailInp() == true &&
      validPhoneInp() == true &&
      validAgeInp() == true &&
      validPasswordInp() == true &&
      validRepasswordInp() == true
    ) {
      btn.classList.remove("disabled");
    } else {
      btn.classList.add("disabled");
    }
  });
}
