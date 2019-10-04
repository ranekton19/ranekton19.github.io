// Скрипт Который убирает каждое 3-е сообщение в gmail почте (есть обычная и базовая версия)
var table = document.querySelector('.F').lastElementChild;  
// var table = document.querySelector('.th').firstElementChild;  // Елемент для базовой версии
var length = table.childNodes.length;
var i = 2;

function a() {
  while (i < length) {
    table.childNodes[i].remove();
    i += 2;
  }
}
a();

// Вариант через готовую функцию
// Функция clear(елемент, длина, число сообщения которое нужно пропускать)
function clear(elem, length, int) {
	var i = int - 1;
  while (i < length) {
    elem.childNodes[i].remove();
    i = i + (int - 1);
  }
}

clear(table, length, 3);