// I LOVE GLOBALS.
var buttonEl = document.querySelector('#start');
var commentEl = document.querySelector('#comment');
var wpmEl = document.querySelector('#wpm');
var readerEl = document.querySelector('#reader');
var currentTimer = null;

function processWord(word) {
  var center = Math.floor(word.length / 2);
  var letters = word.split('');
  var result = [];
  return letters.map(function (letter, idx) {
    if (idx === center) {
      return '<span class="highlight">' + letter + '</span>';
    }
    return letter;
  }).join('');
}

function positionWord() {
  var wordEl = readerEl.firstElementChild;
  var highlight = wordEl.firstElementChild;

  var centerOffsetX = (highlight.offsetWidth / 2) + highlight.offsetLeft;
  var centerOffsetY = (highlight.offsetHeight / 2) + highlight.offsetTop;

  wordEl.style.left = ((readerEl.clientWidth / 2) - centerOffsetX) + 'px';
  wordEl.style.top = ((readerEl.clientHeight / 2) - centerOffsetY) + 'px';
}

buttonEl.addEventListener('click', function () {
  var words = commentEl.textContent.split(/\s+/);

  //remove blanks
  words = words.filter(function (word) {
    return word.trim() !== '';
  });

  words = words.map(processWord);
  var currentWord = 0;
  var delay = 60000 / parseInt(wpmEl.value, 10);

  clearTimeout(currentTimer);

  var displayNextWord = function () {
    var word = words[currentWord++];
    // WTB> nlp.js...
    var hasPause = /^\(|[,\.\)]$/.test(word);

    // XSS?! :(.
    readerEl.firstElementChild.innerHTML = word;
    positionWord();

    if (currentWord !== words.length) {
      currentTimer = setTimeout(displayNextWord, delay * (hasPause ? 2 : 1));
    }
  };

  displayNextWord();
});
