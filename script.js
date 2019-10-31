'use strict';

// A container for our raw JSON 
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

// Retrieve and return the data, then pass it to the 
// normalizeData function so we can neaten it up
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

    console.log(data);

    // Pass our data to displayResults
    displayResults(data);

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
            <h3><a href="${data[i].Link}" target="_blank">${data[i].API}</a></h3>
            <p class="description">${data[i].Description}.</p>
            <ul class="result-options">
                <li class="result-option">
                    <span class="option-name">CORS</span> 
                    <span class="option-value">${data[i].Cors}</span>
                </li>
                <li class="result-option">
                    <span class="option-name">Auth</span> 
                    <span class="option-value">${data[i].Auth}</span>
                </li>
                <li class="result-option">
                    <span class="option-name">HTTPS</span>
                    <span class="option-value">${data[i].HTTPS}</span></li>
            </ul>
        </li>`
    )
};

function dontGiveUp() {
    $('.results-list').append(
        `<li class="nomatches">No matches for that combination of options. :( Try different options!</li>`
    )
};


function displayResults(data) {

    $('#js-error-message').empty();

    // If there is a click on any input on the form
    $('.api-filters').on('click', 'input', (function(event) {
    
        // Get the arrayed values of the selected boxes and assign them to variables
        let categorySelections = getCategories();
        let authOptions = getAuthOptions();
        let corsOptions = getCorsOptions();
        let httpsOptions = getHttpsOptions();
    
        // Empty the results list
        $('.results-list').empty();

        // Loop through the data 
        for (let i = 0; i < data.length; i++){
        
            // And if 
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
                console.log($('.results-list li').children().length)                    
            }; 
        };

        // If you've done that and there are no results
        if ( $('.results-list li').children().length === 0 ) {
            dontGiveUp();
        };

    }));
};



// Clear the checkboxes on page reload
function clearInputs() {
    $('input:checkbox').prop('checked', false);
}

$(getData);
$(showMenu);
$(clearInputs);