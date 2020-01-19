$(document).ready(function(){


  //Navigation beetwen sections
  $(".menu").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
  });


  //afisha
  const imagesPath = 'images/'
  const imagesNameBase = 'afisha';
  const imageFormat = '.jpg';
  const imageNumber = 10;
  const imagesNames = []

  Array.from(Array(imageNumber)).forEach((x, i) => {
    imagesNames.push(imagesPath + imagesNameBase + (i + 1) + imageFormat);
  });

  console.log(imagesNames);


  function imageExists(imageUrl){

    var http = new XMLHttpRequest();

    http.open('HEAD', imageUrl, false);
    http.send();

    return http.status != 404;

  }

  function takeAfisha(url){
    if (imageExists(url)) {
      return url
    } else {
      return false;
    }
  }

  const availableImages = imagesNames.filter( imageUrl => {
    return takeAfisha(imageUrl);
  });

  let slideCounter = 1;
  let image = $('.advert-block-afisha img');
  function changeImage(imageNumber){
    image.fadeOut(250, function () {
      $('.advert-block-afisha img').attr('src', availableImages[imageNumber]);
      image.fadeIn(750);
    });
  }

  if(availableImages.length > 1){
    setInterval(function(){
      if( slideCounter < availableImages.length) {
        changeImage(slideCounter);
        slideCounter++
      } else {
        changeImage(0);
        slideCounter = 1;
      }
    },5000)
  }


  //weather
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
    //weatherEl.find('.title').html(description);
    weatherEl.find('.description').html(`${description}, ${temp} C`);
  }).error((result) => {

  });


});
