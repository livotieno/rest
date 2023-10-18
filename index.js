function displayWeatherDetails(data) {
  // grab element
  const weatherDetails = document.querySelector("#weather-details");

  //   create element
  const divChild = document.createElement("div");

  //   manipulate dom
  divChild.innerHTML = `
  <div id="forecast">
  <div>
  <img src="${data.current.condition.icon}">
  </div>
  <p>${data.location.name}</p>
  <p>${data.current.temp_c} &degC</p>
  </div>

  `;
  weatherDetails.appendChild(divChild);
}

// combines url and params into 1 URL
function bindUrlWithParams(url, params) {
  const queryString = new URLSearchParams(params).toString();
  return `${url}?${queryString}`;
}

function fetchWeatherDetails(placeValue) {
  // query params as an object/how to pass many params
  const queryParams = {
    q: `${placeValue}`,
  };

  //   endpoint to fetch data from
  const urlApi = `https://weatherapi-com.p.rapidapi.com/current.json`;

  //   invoke and store in variable, URL
  const urlWitParams = bindUrlWithParams(urlApi, queryParams);

  //   fetch API - 1
  fetch(urlWitParams, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-RapidAPI-Key": "b6013b5b88msh5ef598d84cc3975p19a5dcjsn49b2600a41ec",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // invoke upon receiving data
      displayWeatherDetails(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function handleDOMContentLoladed(e) {
  const weatherForm = document.querySelector("#weather-form");

  //   upon form submission
  weatherForm.addEventListener("submit", (e) => {
    // prevent default refresh behavior
    e.preventDefault();

    // grab input value
    const placeValue = document.querySelector("#place").value;

    fetchWeatherDetails(placeValue);

    // clear form value
    e.target.reset();
  });
}

// wait HTML to load first
document.addEventListener("DOMContentLoaded", handleDOMContentLoladed);