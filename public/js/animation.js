

// Preloader Animation


// NavBar Animation


var scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#myNavbar'
})


// Readmore / Read Less Animation

function readMore() {
    let dots = document.getElementById("dots");
    let moreText = document.getElementById("more");
    let btnText = document.querySelector(".btn-earn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
      
      
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }