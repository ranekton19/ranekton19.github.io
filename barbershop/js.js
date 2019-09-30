//  Login - sign-up
var link = document.querySelector('.login-link');
var popup = document.querySelector(".modal-login");
var close = document.querySelector('.modal-close');
var login = document.querySelector('[name=login]');
var password = document.querySelector('[name=password]');
var form = document.querySelector('.login-form');

var isStorageSupport = true;
var storage = '';

try {
	var storage = localStorage.getItem('login');
} catch(err) {
	isStorageSupport = false;
	console.log(e);
}

link.addEventListener('click', function (evt) {
	evt.preventDefault();
	popup.classList.add('modal-show');
	
	if (storage) {
		login.value = storage;
		password.focus();
	}
	else {
		login.focus();
	}
});

close.addEventListener('click', function (evt) {
	evt.preventDefault();
	popup.classList.remove('modal-show');
	popup.classList.remove('modal-error');
});

form.addEventListener('submit', function (evt) {
	if (!login.value || !password.value) {
		 evt.preventDefault();
		 popup.classList.add('modal-error');
	}
	else {
		if (isStorageSupport) {
			localStorage.setItem('login', login.value);
		}
	}
});

window.addEventListener('keydown', function (evt) {
	if (evt.keyCode === 27) {
		if (popup.classList.contains('modal-show')) {
			evt.preventDefault();
			popup.classList.remove('modal-show');
			popup.classList.remove('modal-error');
		}
	}
});

//  Modal - map
var mapPopup = document.querySelector(".modal-map");
var mapClose = mapPopup.querySelector('.modal-close');
var mapLink = document.querySelector('.map-link');

mapLink.addEventListener('click', function (evt) {
	evt.preventDefault();
	mapPopup.classList.add('modal-show');
});

mapClose.addEventListener('click', function (evt) {
	evt.preventDefault();
	mapPopup.classList.remove('modal-show');
});

window.addEventListener('keydown', function (evt) {
	if (evt.keyCode === 27) {
		if (mapPopup.classList.contains('modal-show')) {
			evt.preventDefault();
			mapPopup.classList.remove('modal-show');
		}
	}
});

var mapLink2 = '';
try {
	var mapLink2 = document.querySelector('.contacts-button-map');
	mapLink2.addEventListener('click', function (evt) {
	evt.preventDefault();
	mapPopup.classList.add('modal-show');
});
} catch(err) {
}

