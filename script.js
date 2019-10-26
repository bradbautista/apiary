'use strict';



function showMenu() {
    $('form').on('click', 'button', function() {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).next('fieldset').toggle();
        $(this).children(':nth-child(2)').toggleClass('menu-icon_inactive');
        $(this).children(':nth-child(2)').toggleClass('menu-icon_active');
        // console.log($('.menu-icon').css('border-color', 'goldenrod'));
        console.log($('.menu-icon').css('transform'));
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