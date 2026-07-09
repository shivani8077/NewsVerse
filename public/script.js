// =============================
// HTML Elements
// =============================

const newsContainer = document.getElementById("newsContainer");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("site-search");
// Footer Links
const footerHome = document.getElementById("footer-home");
const footerCategory = document.getElementById("footer-category");
const footerSearch = document.getElementById("footer-search");
const footerLatest = document.getElementById("footer-latest");

// =============================
// Load Top Headlines
// =============================

window.onload = () => {
    loadNews();
};

// =============================
// Fetch News
// =============================

async function loadNews(category = "") {

    try {

        let url = "/api/news";

        if (category) {
            url += `?category=${category}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        displayNews(data.articles);

    } catch (error) {

        console.log(error);

        newsContainer.innerHTML =
            "<h2>Unable to load news.</h2>";
    }

}

// =============================
// Search News
// =============================

searchForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const query = searchInput.value.trim();

    if (query === "") return;

    try {

        const response = await fetch(`/api/search?q=${query}`);
        const data = await response.json();

        displayNews(data.articles);

    } catch (error) {

        console.log(error);

        newsContainer.innerHTML =
            "<h2>No news found.</h2>";

    }

});

// =============================
// Display News
// =============================

function displayNews(articles) {

    newsContainer.innerHTML = "";

    if (!articles || articles.length === 0) {

        newsContainer.innerHTML =
            "<h2>No News Available</h2>";

        return;
    }

    articles.forEach(article => {

        const card = document.createElement("div");

        card.className = "news-card";

        card.innerHTML = `

        <img src="${article.urlToImage || 'https://via.placeholder.com/400x220?text=No+Image'}" alt="News Image">

        <div class="news-content">

            <h3>${article.title}</h3>

            <p>${article.description || "No description available."}</p>

            <small>
            ${article.source.name} |
            ${new Date(article.publishedAt).toLocaleDateString()}
            </small>

            <br><br>

            <a href="${article.url}" target="_blank">
                Read More →
            </a>

        </div>

        `;

        newsContainer.appendChild(card);

    });

}

// =============================
// Navbar Categories
// =============================

document.getElementById("nav-home").onclick = () => loadNews();

document.getElementById("nav-technology").onclick = () => loadNews("technology");

document.getElementById("nav-business").onclick = () => loadNews("business");

document.getElementById("nav-sports").onclick = () => loadNews("sports");

document.getElementById("nav-health").onclick = () => loadNews("health");

document.getElementById("nav-entertainment").onclick = () => loadNews("entertainment");

document.getElementById("nav-science").onclick = () => loadNews("science");

// =============================
// Category Section
// =============================

document.getElementById("cat-technology").onclick = () => loadNews("technology");

document.getElementById("cat-business").onclick = () => loadNews("business");

document.getElementById("cat-sports").onclick = () => loadNews("sports");

document.getElementById("cat-health").onclick = () => loadNews("health");

document.getElementById("cat-entertainment").onclick = () => loadNews("entertainment");

document.getElementById("cat-science").onclick = () => loadNews("science");

