$("#nav-1 a").on("click", function() {
    var position = $(this)
        .parent()
        .position();
    var width = $(this)
        .parent()
        .width();
    $("#nav-1 .slide1").css({ opacity: 1, left: +position.left, width: width });
});

$("#nav-1 a").on("mouseover", function() {
    var position = $(this)
        .parent()
        .position();
    var width = $(this)
        .parent()
        .width();
    $("#nav-1 .slide2")
        .css({
            opacity: 1,
            left: +position.left,
            width: width
        })
        .addClass("squeeze");
});

$("#nav-1 a").on("mouseout", function() {
    $("#nav-1 .slide2")
        .css({ opacity: 0 })
        .removeClass("squeeze");
});

var currentWidth = $("#nav-1 .nav")
    .find(".active")
    .parent("li")
    .width();
var current = $(".nav .active").position();
$("#nav-1 .slide1").css({ left: +current.left, width: currentWidth });





$(document).ready(function() {
    
    $('.slider__controls-button').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        var
            $this = $(this),
            container = $this.closest('.slider'),
            list = container.find('.slider__list'),
            items = container.find('.slider__item'),
            activeSlide = items.filter('.active'),
            nextSlide = activeSlide.next(),
            prevSlide = activeSlide.prev(),
            firstSlide = items.first(),
            lastSlide = items.last(),
            sliderOffset = container.offset().left, // offset положение внутри страницы, в данном случае в лево
            reqPos = 0;  // для записи положения слайда
    
        function removeActiveClass (reqSlide) { // текущему слайду добавим клас актив и снимем его у других
            reqSlide.addClass('active').siblings().removeClass('active');
        }

        function findReqPos (slide) { // отнимаем от левой части следующего слайда длинну текущего слайда
            reqPos = slide.offset().left - sliderOffset;
        }

        if ($(this).hasClass('slider__controls-button_next')) {//есле за классом кнопки идет клас next то люстать в право
        
            if (nextSlide.length) { // чтобы небыло ошибок что следующий класс ненайден - нужно проверить есть ли он вообще
                findReqPos (nextSlide); 
                removeActiveClass (nextSlide); 
            } else {
                findReqPos (firstSlide); // ищем положение первой картинки
                removeActiveClass (firstSlide);
            }
            
        } else {

            if (prevSlide.length) {
                findReqPos (prevSlide); 
                removeActiveClass (prevSlide); 
            } else {
                findReqPos (lastSlide); 
                removeActiveClass (lastSlide);
            }
        }

        list.css('left', '-=' + reqPos + 'px'); // меняем значение left в классе полосы слайдера на искомое значение
        
        
    });
});