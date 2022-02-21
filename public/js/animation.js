

// Preloader Animation


// NavBar Animation


var scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#myNavbar'
})





// Project Animation

$(document).ready(function () {
  $('.liste').click(function () {
    const value = $(this).attr('data-filter'); 
    if (value == 'all') {
      $('.itemBox').show('1000'); 
    } else {
      $('.itemBox').not('.'+value).hide('1000'); 
      $('.itemBox').filter('.'+value).show('1000'); 
    }
  })
  // Class active
  $('.liste').click(function () {
    $(this).addClass('active').siblings().removeClass('active'); 
  })
})
