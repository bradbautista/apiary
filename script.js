'use strict';

// Enable menu behavior
function showMenu() {
    $('form').on('click', 'button', function() {
        event.preventDefault();
        // Change the background color of the button
        $(this).toggleClass('active');
        // Show/hide all fieldsets under the button
        $(this).nextUntil('button').toggle();
        // Flip & unfilp the arrow
        $(this).children(':nth-child(2)').toggleClass('menu-icon_inactive');
        $(this).children(':nth-child(2)').toggleClass('menu-icon_active');
        console.log(responseJson);
        
    });
};

// Retrieve the data so we can manipulate it
function getData() {

    const endpoint = 'https://api.publicapis.org/entries'
  
    fetch(endpoint)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
    // if there are previous results or errors, remove them
    console.log(responseJson);
    $('#js-error-message').empty();
  
    // iterate over the response
    // for (let i = 0; i < responseJson.data.length ; i++){
  
    //     if (responseJson.data[i].images.length === 0) {
    //     $('#results-list').append(
    //       `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].name}</a></h3>
    //       <p class="address">${responseJson.data[i].addresses[0].line1}, ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</p>
    //       <p>${responseJson.data[i].description}</p>
    //       </li>
    //       <hr>`);
    //     } else {
    //     $('#results-list').append(
    //       `<li><h3><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].name}</a></h3>
    //       <p class="address">${responseJson.data[i].addresses[0].line1}, ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</p>
    //       <p>${responseJson.data[i].description}</p>
    //       <img src="${responseJson.data[i].images[0].url}">
    //       </li>
    //       <hr>`);
    //     };
  

    // };
};

// $(getData);
$(showMenu);

// FOR LATER

// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// };