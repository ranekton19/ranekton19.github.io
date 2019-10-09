var project = document.querySelector('.project');
var projectHeader = document.querySelector('.project__header-desk');
var projectParagFirst = document.querySelector('.project__parag--first');
var projectParagSecond = document.querySelector('.project__parag--second');
var projectButton = document.querySelector('.project__button');
var header = document.querySelector('.header');
var navMenu = document.querySelector('.nav__menu');
var toogleLine = document.querySelectorAll('.nav__toogle-line');
var logoImage = document.querySelectorAll('.logo__box img');

function ready() {
	setTimeout(() => project.classList.add('project--active'), 1500);  // Открытия модуля при загрузке
	setTimeout(() => projectHeader.classList.add('project__header--active'), 2500);
	setTimeout(() => projectParagFirst.classList.add('project__parag--first--active'), 3200);
	setTimeout(() => projectParagSecond.classList.add('project__parag--second--active'), 3900);
	setTimeout(() => projectButton.classList.add('project__button--active'), 5000);	
}




projectButton.addEventListener('click', function (evt) {
	evt.preventDefault();
	setTimeout(() => projectHeader.classList.remove('project__header--active'), 2000);  // Прячем блоки
	setTimeout(() => projectParagFirst.classList.remove('project__parag--first--active'), 1500);
	setTimeout(() => projectParagSecond.classList.remove('project__parag--second--active'), 1000);
	setTimeout(() => projectButton.classList.remove('project__button--active'), 500);
	setTimeout(() => project.classList.add('project-full'), 2500);

	setTimeout(() => projectHeader.classList.add('delete'), 3000);  //Удаление блоков
	setTimeout(() => projectParagFirst.classList.add('delete'), 3000);
	setTimeout(() => projectParagSecond.classList.add('delete'), 3000);
	setTimeout(() => projectButton.classList.add('delete'), 3000);


	setTimeout(() => navMenu.style.color = 'black', 8000);
	setTimeout(() => header.style.backgroundColor = 'white', 8000);
	setTimeout(() => toogleLine[0].classList.add('background-black'), 8000);
	setTimeout(() => toogleLine[1].classList.add('background-black'), 8000);
	setTimeout(() => logoImage[0].src = "img/logo-1-black.png", 8000);
	setTimeout(() => logoImage[1].src = "img/logo-2-black.png", 8000);
});


document.addEventListener("DOMContentLoaded", ready);

