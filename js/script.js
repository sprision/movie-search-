const apiKey = ' b2954bd5';  // Replace with your OMDb API key

function searchMovie() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('movieResults');

    if (!query) {
        resultsDiv.innerHTML = '<p>Please enter a movie title to search.</p>';
        return;
    }

    // Construct the API URL
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(query)}`;

    // Fetch the movie data from the OMDb API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                // Display movie details
                resultsDiv.innerHTML = `
                    <h2>Results for "${data.Title}":</h2>
                    <div class="movie">
                        <h3>Movie Title: ${data.Title}</h3>
                        <p><strong>Director:</strong> ${data.Director}</p>
                        <p><strong>Release Year:</strong> ${data.Year}</p>
                        <p><strong>Plot:</strong> ${data.Plot}</p>
                        <p><strong>Actors:</strong> ${data.Actors}</p>
                        <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
                        <img src="${data.Poster}" alt="Movie Poster" />
                    </div>
                `;
            } else {
                // If the movie is not found, show an error message
                resultsDiv.innerHTML = `<p>Movie not found. Please try again.</p>`;
            }
        })
        .catch(error => {
            // Handle errors like network issues
            resultsDiv.innerHTML = `<p>There was an error fetching movie data. Please try again later.</p>`;
            console.error('Error fetching the movie data:', error);
        });
}

