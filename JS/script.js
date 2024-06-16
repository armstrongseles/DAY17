// script.js

document.addEventListener("DOMContentLoaded", () => {
    const countryCardsContainer = document.getElementById("country-cards");
  
    // Fetch country data from Rest Countries API
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(countries => {
        countries.forEach(country => {
          // Create card elements
          const col = document.createElement("div");
          col.classList.add("col-lg-4", "col-sm-12", "mb-4");
  
          const card = document.createElement("div");
          card.classList.add("card");
  
          const cardHeader = document.createElement("div");
          cardHeader.classList.add("card-header");
          cardHeader.textContent = country.name.common;
  
          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");
  
          const flag = document.createElement("img");
          flag.src = country.flags.svg;
          flag.alt = `Flag of ${country.name.common}`;
          flag.classList.add("card-img-top");
  
          const capital = document.createElement("p");
          capital.textContent = `Capital: ${country.capital ? country.capital[0] : "N/A"}`;
  
          const region = document.createElement("p");
          region.textContent = `Region: ${country.region}`;
  
          const countryCode = document.createElement("p");
          countryCode.textContent = `Country Code: ${country.cca3}`;
  
          const latlng = document.createElement("p");
          latlng.textContent = `Lat/Lng: ${country.latlng.join(", ")}`;
  
          const weatherButton = document.createElement("button");
          weatherButton.classList.add("btn", "btn-primary");
          weatherButton.textContent = "Click for Weather";
          weatherButton.addEventListener("click", () => fetchWeather(country.latlng, cardBody));
  
          // Append elements to card body
          cardBody.appendChild(flag);
          cardBody.appendChild(capital);
          cardBody.appendChild(region);
          cardBody.appendChild(countryCode);
          cardBody.appendChild(latlng);
          cardBody.appendChild(weatherButton);
  
          // Append header and body to card
          card.appendChild(cardHeader);
          card.appendChild(cardBody);
  
          // Append card to column
          col.appendChild(card);
  
          // Append column to container
          countryCardsContainer.appendChild(col);
        });
      })
      .catch(error => console.error("Error fetching countries:", error));
  
    // Function to fetch weather data from Open Weather Map API
    function fetchWeather(latlng, cardBody) {
      const [lat, lon] = latlng;
      const apiKey = "YOUR_OPEN_WEATHER_MAP_API_KEY"; // Replace with your OpenWeatherMap API key
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
      fetch(weatherUrl)
        .then(response => response.json())
        .then(weather => {
          const weatherInfo = document.createElement("p");
          weatherInfo.textContent = `Weather: ${weather.weather[0].description}, Temperature: ${(weather.main.temp - 273.15).toFixed(2)}°C`;
          cardBody.appendChild(weatherInfo);
        })
        .catch(error => console.error("Error fetching weather:", error));
    }
  });
  