
// =============================
// NewsAPI Configuration
// =============================

const API_KEY = "6842d609b1dd4189976fd25837fa8c7d";
const BASE_URL = "https://newsapi.org/v2";

// =============================
// HTML Elements
// =============================

const newsContainer = document.getElementById("newsContainer");

// Navbar
const navHome = document.getElementById("nav-home");
const navTechnology = document.getElementById("nav-technology");
const navBusiness = document.getElementById("nav-business");
const navSports = document.getElementById("nav-sports");
const navHealth = document.getElementById("nav-health");
const navEntertainment = document.getElementById("nav-entertainment");
const navScience = document.getElementById("nav-science");

// Categories
const catTechnology = document.getElementById("cat-technology");
const catBusiness = document.getElementById("cat-business");
const catSports = document.getElementById("cat-sports");
const catHealth = document.getElementById("cat-health");
const catEntertainment = document.getElementById("cat-entertainment");
const catScience = document.getElementById("cat-science");

// Mobile Menu
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("#navbar ul");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// =============================
// Fetch News
// =============================

async function fetchNews(url) {

    try {

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        displayNews(data.articles);

    }

    catch (error) {

        console.error(error);

    }

}

// =============================
// Display News
// =============================

function displayNews(articles) {

    newsContainer.innerHTML = "";

    articles.forEach(article => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${article.urlToImage || "images/no-image.png"}" alt="News">

            <h3>${article.title}</h3>

            <p>${article.description || "No description available."}</p>

            <p>
                <strong>${article.source.name}</strong><br>
                ${new Date(article.publishedAt).toLocaleDateString()}
            </p>

            <a href="${article.url}" target="_blank">
                Read More →
            </a>
        `;

        newsContainer.appendChild(card);

    });

}

// =============================
// Helper Functions
// =============================

function loadHome() {

    fetchNews(
        `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`
    );

}

function loadCategory(category) {

    fetchNews(
        `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );

}

// =============================
// Load Home on Startup
// =============================

loadHome();

// =============================
// Navbar Events
// =============================

navHome.addEventListener("click", function(e){

    e.preventDefault();

    loadHome();

});

navTechnology.addEventListener("click", function(e){

    e.preventDefault();

    loadCategory("technology");

});

navBusiness.addEventListener("click", function(e){

    e.preventDefault();

    loadCategory("business");

});

navSports.addEventListener("click", function(e){

    e.preventDefault();

    loadCategory("sports");

});

navHealth.addEventListener("click", function(e){

    e.preventDefault();

    loadCategory("health");

});

navEntertainment.addEventListener("click", function(e){

    e.preventDefault();

    loadCategory("entertainment");

});

navScience.addEventListener("click", function(e){

    e.preventDefault();

    loadCategory("science");

});

// =============================
// Category Section Events
// =============================

catTechnology.addEventListener("click", function(e){

    e.preventDefault();

    loadCategory("technology");

});

catBusiness.addEventListener("click", function(e){

    e.preventDefault();

    loadCategory("business");

});

catSports.addEventListener("click", function(e){

    e.preventDefault();

    loadCategory("sports");

});

catHealth.addEventListener("click", function(e){

    e.preventDefault();

    loadCategory("health");

});

catEntertainment.addEventListener("click", function(e){

    e.preventDefault();

    loadCategory("entertainment");

});

catScience.addEventListener("click", function(e){

    e.preventDefault();

    loadCategory("science");

});