let mybutton = document.getElementById("topBtn");
let myBasket = document.getElementById("basketBtn");
let footer = document.getElementById("footer");

window.onscroll = function () {
  scrollFunction();
  stopAtFooter();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function stopAtFooter() {
  let footerRect = footer.getBoundingClientRect();
  let buttonRect = myBasket.getBoundingClientRect();

  if (buttonRect.bottom > footerRect.top) {
    myBasket.style.position = "absolute";
    myBasket.style.bottom = `${document.documentElement.scrollHeight - footer.offsetTop}px`;
  } else {
    myBasket.style.position = "fixed";
    myBasket.style.bottom = "10px";
  }
}
