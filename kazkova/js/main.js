(function(){
	//remove no-js class
    removeClass(document.getElementsByTagName("html")[0], "no-js"); 

    //Hero Slider - by CodyHouse.co
	function HeroSlider( element ) {
		this.element = element;
		this.navigation = this.element.getElementsByClassName("js-cd-nav")[0];
		this.navigationItems = this.navigation.getElementsByTagName('li');
		this.marker = this.navigation.getElementsByClassName("js-cd-marker")[0];
		this.slides = this.element.getElementsByClassName("js-cd-slide");
		this.slidesNumber = this.slides.length;
		this.newSlideIndex = 0;
		this.oldSlideIndex = 0;
		this.autoplay = hasClass(this.element, "js-cd-autoplay");
		this.autoPlayId;
		this.autoPlayDelay = 5000;
		this.init();
	};

	HeroSlider.prototype.init = function() {
		var self = this;
		//upload video (if not on mobile devices)
		this.uploadVideo();
		//autoplay slider
		// this.setAutoplay();
		//listen for the click event on the slider navigation
		this.navigation.addEventListener('click', function(event){
			if( event.target.tagName.toLowerCase() == 'div' )
				return;
			event.preventDefault();
			var selectedSlide = event.target;
			if( hasClass(event.target.parentElement, 'cd-selected') )
				return;
			self.oldSlideIndex = self.newSlideIndex;
			self.newSlideIndex = Array.prototype.indexOf.call(self.navigationItems, event.target.parentElement);
			self.newSlide();
			self.updateNavigationMarker();
			self.updateSliderNavigation();
			// self.setAutoplay();
		});

		// if(this.autoplay) {
		// 	// on hover - pause autoplay
		// 	this.element.addEventListener("mouseenter", function(){
		// 		clearInterval(self.autoPlayId);
		// 	});
		// 	this.element.addEventListener("mouseleave", function(){
		// 		self.setAutoplay();
		// 	});
		// }
	};

	HeroSlider.prototype.uploadVideo = function() {
		var videoSlides = this.element.getElementsByClassName("js-cd-bg-video");
		for( var i = 0; i < videoSlides.length; i++) {
			if( videoSlides[i].offsetHeight > 0 ) {
				// if visible - we are not on a mobile device 
				var videoUrl = videoSlides[i].getAttribute("data-video");
				videoSlides[i].innerHTML = "<video loop><source src='"+videoUrl+".mp4' type='video/mp4' /><source src='"+videoUrl+".webm' type='video/webm'/></video>";
				// if the visible slide has a video - play it
				if( hasClass(videoSlides[i].parentElement, "cd-hero__slide--selected") ) videoSlides[i].getElementsByTagName("video")[0].play();
			}
		}
	};

	HeroSlider.prototype.setAutoplay = function() {
		var self = this;
		if(this.autoplay) {
			clearInterval(self.autoPlayId);
			self.autoPlayId = window.setInterval(function(){self.autoplaySlider()}, self.autoPlayDelay);
		}
	};

	HeroSlider.prototype.autoplaySlider = function() {
		this.oldSlideIndex = this.newSlideIndex;
		var self = this;
		if( this.newSlideIndex < this.slidesNumber - 1) {
			this.newSlideIndex +=1;
			this.newSlide();
			
		} else {
			this.newSlideIndex = 0;
			this.newSlide();
		}

		this.updateNavigationMarker();
		this.updateSliderNavigation();
	};

	HeroSlider.prototype.newSlide = function(direction) {
		var self = this;
		removeClass(this.slides[this.oldSlideIndex], "cd-hero__slide--selected cd-hero__slide--from-left cd-hero__slide--from-right");
		addClass(this.slides[this.oldSlideIndex], "cd-hero__slide--is-moving");
		setTimeout(function(){removeClass(self.slides[self.oldSlideIndex], "cd-hero__slide--is-moving");}, 500);

		for(var i=0; i < this.slidesNumber; i++) {
			if( i < this.newSlideIndex && this.oldSlideIndex < this.newSlideIndex) {
				addClass(this.slides[i], "cd-hero__slide--move-left");
			} else if( i == this.newSlideIndex && this.oldSlideIndex < this.newSlideIndex) {
				addClass(this.slides[i], "cd-hero__slide--selected cd-hero__slide--from-right");
			} else if(i == this.newSlideIndex && this.oldSlideIndex > this.newSlideIndex) {
				addClass(this.slides[i], "cd-hero__slide--selected cd-hero__slide--from-left");
				removeClass(this.slides[i], "cd-hero__slide--move-left");
			} else if( i > this.newSlideIndex && this.oldSlideIndex > this.newSlideIndex ) {
				removeClass(this.slides[i], "cd-hero__slide--move-left");
			}
		}

		this.checkVideo();

	};

	HeroSlider.prototype.updateNavigationMarker = function() {
		removeClassPrefix(this.marker, 'item');
		addClass(this.marker, "cd-hero__marker--item-"+ (Number(this.newSlideIndex) + 1));
	};

	HeroSlider.prototype.updateSliderNavigation = function() {
		removeClass(this.navigationItems[this.oldSlideIndex], 'cd-selected');
		addClass(this.navigationItems[this.newSlideIndex], 'cd-selected');
	};

	HeroSlider.prototype.checkVideo = function() {
		//check if a video outside the viewport is playing - if yes, pause it
		var hiddenVideo = this.slides[this.oldSlideIndex].getElementsByTagName('video');
		if( hiddenVideo.length ) hiddenVideo[0].pause();

		//check if the select slide contains a video element - if yes, play the video
		var visibleVideo = this.slides[this.newSlideIndex].getElementsByTagName('video');
		if( visibleVideo.length ) visibleVideo[0].play();
	};

	var heroSliders = document.getElementsByClassName("js-cd-hero");
	if( heroSliders.length > 0 ) {
		for( var i = 0; i < heroSliders.length; i++) {
			(function(i){
				new HeroSlider(heroSliders[i])
			})(i);
		}
	}

	//on mobile - open/close primary navigation clicking/tapping the menu icon 
	document.getElementsByClassName('js-cd-header__nav')[0].addEventListener('click', function(event){
		if(event.target.tagName.toLowerCase() == 'nav') {
			var dropdown = this.getElementsByTagName('ul')[0];
			toggleClass(dropdown, 'cd-is-visible', !hasClass(dropdown, 'cd-is-visible'));
		}
	});

	function removeClassPrefix(el, prefix) {
		//remove all classes starting with 'prefix'
        var classes = el.className.split(" ").filter(function(c) {
            return c.indexOf(prefix) < 0;
        });
        el.className = classes.join(" ");
	};

	//class manipulations - needed if classList is not supported
	function hasClass(el, className) {
	  	if (el.classList) return el.classList.contains(className);
	  	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
	function addClass(el, className) {
		var classList = className.split(' ');
	 	if (el.classList) el.classList.add(classList[0]);
	 	else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
	 	if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
	}
	function removeClass(el, className) {
		var classList = className.split(' ');
	  	if (el.classList) el.classList.remove(classList[0]);	
	  	else if(hasClass(el, classList[0])) {
	  		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
	  		el.className=el.className.replace(reg, ' ');
	  	}
	  	if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
	}
	function toggleClass(el, className, bool) {
		if(bool) addClass(el, className);
		else removeClass(el, className);
	}
})();

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

// VanillaCalendar

$(document).ready(function() {
	$('#mycalendar').monthly({
	  dataType: 'json',
	  jsonUrl: '/monthly/events.json',
	  weekStart: 'Mon'
	});
})


$(document).ready(function(){
	$("#menu").on("click","a", function (event) {
	  //отменяем стандартную обработку нажатия по ссылке
	  event.preventDefault();
  
	  //забираем идентификатор бока с атрибута href
	  var id  = $(this).attr('href'),
  
	  //узнаем высоту от начала страницы до блока на который ссылается якорь
	   top = $(id).offset().top;
	  //анимируем переход на расстояние - top за 1500 мс
	  $('body,html').animate({scrollTop: top}, 1500);
	});
  });
  


// Добавление класа при скроле
$(window).scroll(function() {
var height = $(window).scrollTop();
  
var block_position = $('#price').offset().top;
	/*Если сделали скролл на 100px задаём новый класс для header*/
if(height > block_position){
  	$('header').addClass('header-blue', 1000);
} else{
	/*Если меньше 100px удаляем класс для header*/
$('header').removeClass('header-blue', 1000);
	}
});



// Counter
var waypoint__ski= new Waypoint({
	element: document.getElementById('timer__ski'),
	handler: function() {
	  $('#timer__ski').countTo({
	  from: 0, 
	  to: 390,
	  refreshInterval: 1
		})
	},
		offset: 1000
  });
  var waypoint__track = new Waypoint({
	element: document.getElementById('timer__track'),
	handler: function() {
	  $('#timer__track').countTo({
	  from: 100, 
	  to: 950,
	  refreshInterval: 1
		})
	},
		offset: 1000
  });
  var waypoint__skier = new Waypoint({
	element: document.getElementById('timer__skier'),
	handler: function() {
	  $('#timer__skier').countTo({
	  from: 0, 
	  to: 14850,
	  refreshInterval: 1
		})
	},
		offset: 1000
  });
  var waypoint__season = new Waypoint({
	element: document.getElementById('timer__season'),
	handler: function() {
	  $('#timer__season').countTo({
	  from: 0, 
	  to: 11,
	  refreshInterval: 1
		})
	},
		offset: 1000
  });


$(document).ready(function() {
	$('.popup-youtube').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
});

$(document).ready(function() {
	$('.popup-gallery').magnificPopup({
		delegate: 'a', // child items selector, by clicking on it popup will open
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		}
	});
	$('.cafe__button').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	$('.school__button').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	$('.discount-button').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	$('.rules-button-1').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	$('.rules-button-2').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	$('.rules-button-3').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	$('.prise-button').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	
});

// weather
$(document).ready(function(){
	const lat = 49.586614
	const lon = 24.060366
	const APIKEY = 'a471d8f82d27fd75533d89916ac2b274';
	const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
	const getWeatherIconUrl = iconNumber => `http://openweathermap.org/img/w/${iconNumber}.png`;

	$.ajax({
		url: weatherUrl,
		data: {
			lat:lat,
			lon:lon,
			lang:'uk',
			units:'metric',
			APPID:APIKEY
		}
	}).done((result) => {
		const { description, icon }= result.weather[0];
		const { main: {temp} } = result;
		const imageUrl = getWeatherIconUrl(icon);
		const weatherEl = $('#weather');
		
		weatherEl.css('background-image', `url(${imageUrl}`);
		weatherEl.find('.description').html(`${description}, ${temp} C°`);
	})

});
	
	