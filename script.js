'use strict';

let rawData = [];

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
        
    });
};

function getData() {

    const endpoint = 'https://api.publicapis.org/entries'
  
    fetch(endpoint)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => normalizeData(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};

function normalizeData(responseJson) {

    // Push our responseJson objects into our repository
    rawData.push(responseJson.entries);

    // Create a new array of formatted data
    const data = rawData[0].map(function(obj) {

        const tempObj = {};

        tempObj.API = obj.API;
        tempObj.Description = obj.Description;
        // Prefer 'None' to empty string for APIs that
        // don't require authorization
        tempObj.Auth = (obj.Auth === '' ? 'None' : obj.Auth);
        // Prefer 'Yes'/'No' to true/false for HTTPS values
        tempObj.HTTPS = (obj.HTTPS === true ? 'Yes' : 'No');
        // Uppercase CORS values
        tempObj.Cors = obj.Cors[0].toUpperCase() + obj.Cors.slice(1);
        tempObj.Link = obj.Link;
        tempObj.Category = obj.Category;

        return tempObj;

        }
    );

    displayResults(data);
    updateCount(data);
    getRandoms(data);

};

function getCategories() {
 
    return $('.categories')
    .find('input[type=checkbox]:checked')
    .map(function() {
        return ($(this).parent().text());
    })
    .get();

};

function getAuthOptions() {
    
    return $('.auth-options')
    .find('input[type=checkbox]:checked')
    .map(function() {
        return ($(this).parent().text());
    })
    .get();

};

function getCorsOptions() {

    return $('.cors-options')
    .find('input[type=checkbox]:checked')
    .map(function() {
        return ($(this).parent().text());
    })
    .get();

};

function getHttpsOptions() {
    
    return $('.https-options')
    .find('input[type=checkbox]:checked')
    .map(function() {
        return ($(this).parent().text());
    })
    .get();

};

function generateResults(data, i) {
    $('.results-list').append(
        `<li class="result">
            <h2><a href="${data[i].Link}" target="_blank">${data[i].API}</a></h2>
            <p class="description">${data[i].Description}.</p>
            <ul class="result-options">
                <li class="result-option">
                    <span class="option-name">CORS:</span> 
                    <span class="option-value">${data[i].Cors}</span>
                </li>
                <li class="result-option">
                    <span class="option-name">Auth:</span> 
                    <span class="option-value">${data[i].Auth}</span>
                </li>
                <li class="result-option">
                    <span class="option-name">HTTPS:</span>
                    <span class="option-value">${data[i].HTTPS}</span></li>
            </ul>
        </li>
        <hr>`
    )
};

function dontGiveUp() {
    $('.results-list').append(
        `<li class="nomatches">No matches for that combination of options. :( Try different options!</li>`
    )
};

function displayResults(data) {

    $('#js-error-message').empty();

    $('.api-filters').on('click', 'input', (function(event) {

        // First check to see how many checkboxes are checked, 
        // because if that number is zero, it probably means 
        // someone checked checkboxes and unchecked them all. 
        // Due to the sorting rules, this will return all APIs, 
        // so instead display a blank results area
        if (document.querySelectorAll('input:checked').length === 0) {
            $('.results-list').empty();
        } else {
    
            // Get the arrayed values of the selected boxes and assign them to variables
            let categorySelections = getCategories();
            let authOptions = getAuthOptions();
            let corsOptions = getCorsOptions();
            let httpsOptions = getHttpsOptions();
        
            // Empty the results list
            $('.results-list').empty();

            // Loop through the data 
            for (let i = 0; i < data.length; i++){
            
                if (
                
                // There are results for our combination of categories
                (categorySelections.includes(data[i].Category) || categorySelections.length === 0) 
                // and/or auth options
                && (authOptions.includes(data[i].Auth) || authOptions.length === 0)
                // and/or CORS options
                && (corsOptions.includes(data[i].Cors) || corsOptions.length === 0)
                // and/or HTTPS options
                && (httpsOptions.includes(data[i].HTTPS) || httpsOptions.length === 0)
                
                ) {
                    // Generate an <li> and append it to <ul class="results-list">
                    generateResults(data, i);
                                        
                }; 
            };

            // If you've done that and there are no results
            if ( $('.results-list li').children().length === 0 ) {
                // Prompt the user to try a different combination
                dontGiveUp();
            };
        };

    }));
};


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function getRandoms(data) {

    // We could hit the API's random endpoint, but to limit calls to it
    // and because we already have a formatted dataset and a shuffling
    // tool, we're just going to copy the dataset and shuffle it
    const dataCopy = data.slice();
    generateRandoms(dataCopy);
    reRoll(dataCopy);
};

function generateRandoms(dataCopy) {
    
    let randomizedData = shuffle(dataCopy);
    
    $('.random-prompt').html(
        `<p class="random-prompt">What if you combined the <a href="${randomizedData[0].Link}" target="_blank">${randomizedData[0].API}</a> API and the <a href="${randomizedData[1].Link}" target="_blank">${randomizedData[1].API}</a> API?</p>`    
    )  
}

function reRoll(dataCopy) {
    $('.random-sidebar').on('click', '.fa-random', function(event) {
        generateRandoms(dataCopy);
    });
}

function updateCount(data) {
    $('.current-count').text(data.length);
}


// Clear checkboxes on page reload
function clearInputs() {
    $('input:checkbox').prop('checked', false);
}

function exploreAPIs() {
    getData();
    showMenu();
    clearInputs(); 
}

$(exploreAPIs);