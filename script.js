'use strict';



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

$(showMenu);

// FOR LATER

// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// };