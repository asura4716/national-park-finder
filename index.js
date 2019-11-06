'use strict';

// put your own value below!
const apiKey = '88DMJ76Dw9XEastWRDRGOmoKB8T6ewHbdhP6okt2'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>'${responseJson.data[i].url}'</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParkInfo(stateCode, limit=10) {
  const params = {
    stateCode: stateCode,
    limit,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString + "&api_key=" + apiKey;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val().split(",");
    const limit = $('#js-limit').val();
    getParkInfo(searchTerm, limit);
  });
}

$(watchForm);