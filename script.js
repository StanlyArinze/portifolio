
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in, .slide-left, .slide-right, .slide-up, .zoom-in");

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add("show");
        } else {
        entry.target.classList.remove("show");
        }
    });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});
 

const carousel = document.getElementById("carousel");
let cards = document.querySelectorAll(".card");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 1; // começa no primeiro "real", pois 0 será um clone
const visibleCards = 1;

// Clonar o primeiro e último card para efeito infinito
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, carousel.firstChild);

// Atualizar lista de cards após clones
cards = document.querySelectorAll(".card");

const cardWidth = carousel.clientWidth / visibleCards;
carousel.style.transform = `translateX(${-index * 100}%)`;

function moveToIndex() {
  carousel.style.transition = "transform 0.5s ease-in-out";
  carousel.style.transform = `translateX(${-index * 100}%)`;
}

function nextSlide() {
  if (index >= cards.length - 1) return;
  index++;
  moveToIndex();
}

function prevSlide() {
  if (index <= 0) return;
  index--;
  moveToIndex();
}

carousel.addEventListener("transitionend", () => {
  if (cards[index].id === "first-clone") {
    carousel.style.transition = "none";
    index = 1;
    carousel.style.transform = `translateX(${-index * 100}%)`;
  }
  if (cards[index].id === "last-clone") {
    carousel.style.transition = "none";
    index = cards.length - 2;
    carousel.style.transform = `translateX(${-index * 100}%)`;
  }
});

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);


setInterval(nextSlide, 3000); // troca automática
