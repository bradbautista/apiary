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
        
    });
};

// Retrieve and return the data, then pass it to the 
// displayResults function so we can manipulate it
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

// function displayResults(responseJson) {

    // const selectedStates = $('input[type=checkbox]:checked').map(function() {
    //      return this.id;
    //      }).get().join(',');
    //      getParks(selectedStates, maxResults);
    //      // Clear the inputs and disable the submit button
    //      $('input:checkbox').prop('checked', false);
    //      $('input[type=submit').prop('disabled', true);
    //     });
    // }
  
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
// };

function displayResults(responseJson) {

    console.log(responseJson);
    console.log(responseJson.entries.length);
    $('#js-error-message').empty();

    // Listen for a click on the .categories fieldset
    $('.categories').on('click', 'input', (function(event) {
    console.log('Click recorded.')
    console.log($(this).prop('checked'))
    
    // When it comes, check if the checkbox that has been clicked on 
    // is being checked or unchecked. If it's checked,
    if ($(this).prop('checked') === true) {
        console.log('Checked.');
        console.log($(this).parent().text());

        // Loop through the responseJson 
        for (let i = 0; i < responseJson.entries.length; i++){
            
            // And if the text of the label of the checkbox that has been
            // clicked on is equal to the text of the category key in the
            // JSON object,
            if ($(this).parent().text() === responseJson.entries[i].Category) {
                console.log($(this).parent().text());

                // Generate an <li>, give it a class of i, and append it 
                // to <ul class="results-list">
                $('.results-list').append(
                    `<li class="result ${i}">
                        <h3><a href="${responseJson.entries[i].Link}" target="_blank">${responseJson.entries[i].API}</a></h3>
                        <p class="description">${responseJson.entries[i].Description}.</p>
                        <ul class="result-options">
                            <li class="result-option">
                                <span class="option-name">CORS</span> 
                                <span class="option-value">${responseJson.entries[i].Cors}</span>
                            </li>
                            <li class="result-option">
                                <span class="option-name">Auth</span> 
                                <span class="option-value">${responseJson.entries[i].Auth}</span>
                            </li>
                            <li class="result-option">
                                <span class="option-name">HTTPS</span>
                                <span class="option-value">${responseJson.entries[i].HTTPS}</span></li>
                        </ul>
                    </li>`

                )
            }
        }
         
    // If it's unchecked,
    } else if ($(this).prop('checked') === false) {
        console.log('Unchecked.');
        console.log($(this).parent().text());

        // Loop through the responseJson
        for (let i = 0; i < responseJson.entries.length; i++) {

            // And remove anything classed i for which the text of the label of the // checkbox that has been clicked on is equal to the text of the
            // category key in the JSON object
            if ($(this).parent().text() === responseJson.entries[i].Category) {
                $(`.${i}`).remove();
            }
        }
        
    }

    }));
}

// Clear the checkboxes on page reload
function clearInputs() {
    $('input:checkbox').prop('checked', false);
}

$(getData);
$(showMenu);
// $(listenForClick);
$(clearInputs);