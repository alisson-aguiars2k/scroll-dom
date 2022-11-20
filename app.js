/*

Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
(O método Element.getBoundingClientRect() retorna o tamanho de um elemento e sua posição em relação à janela de visualização.)

pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
(pageYOffset é uma propriedade de janela somente leitura que retorna o número de pixels em que o documento foi rolado verticalmente.)

slice extracts a section of a string without modifying original string
(slice extrai uma seção de uma string sem modificar a string original)

offsetTop - A Number, representing the top position of the element, in pixels
(offsetTop - Um número, representando a posição superior do elemento, em pixels)

*/

// ********** set date ************
const date = document.querySelector("#date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // Sem dinâmica
  // linksContainer.classList.toggle("show-links");
  const containerHeight = linksContainer.getBoundingClientRect().height;
  // console.log(containerHeight);
  const linksHeight = links.getBoundingClientRect().height;
  //   console.log(linksHeight);

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

// ********** fixed navbar ************
const navbar = document.getElementById("nav"); // <nav id="nav">
const topLink = document.querySelector(".top-link"); // <a href="#home" class="scroll-link top-link">

window.addEventListener("scroll", function () {
  // console.log(window.pageYOffset);
  const scrollHeight = window.pageYOffset;
  const navHeigth = navbar.getBoundingClientRect().height;

  if (scrollHeight > navHeigth) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  if (scrollHeight > 200) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // prevent default.(evitar padrão)
    e.preventDefault();
    // navigate to specific spot.(navegar para um local específico.)
    const id = e.currentTarget.getAttribute("href").slice(1);
    // console.log(id);
    const element = document.getElementById(id);
    // calculate the heights
    const navHeigth = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeigth;
    // console.log(position);

    if (!fixedNav) {
      position = position - navHeigth;
    }
    if (navHeigth > 82) {
      position = position + containerHeight;
    }
    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0;
  });
});
