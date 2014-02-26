var app = angular.module('SpeedRead', []);

app.controller('ReaderCtrl', function ($scope) {
  //init variables
  $scope.wpm = 400;
  $scope.textToRead = "JavaScript is a dynamic computer programming language. It is most commonly used as part of web browsers, whose implementations allow client-side scripts to interact with the user, control the browser, communicate asynchronously, and alter the document content that is displayed. It has also become common in server-side programming, game development and the creation of desktop and mobile applications. JavaScript is a prototype-based scripting language with dynamic typing and has first-class functions. Its syntax was influenced by C. JavaScript copies many names and naming conventions from Java, but the two languages are otherwise unrelated and have very different semantics. The key design principles within JavaScript are taken from the Self and Scheme programming languages. It is a multi-paradigm language, supporting object-oriented, imperative, and functional programming styles. The application of JavaScript to use outside of web pages—for example, in PDF documents, site-specific browsers, and desktop widgets—is also significant. Newer and faster JavaScript VMs and platforms built upon them (notably Node.js) have also increased the popularity of JavaScript for server-side web applications. On the client side, JavaScript was traditionally implemented as an interpreted language but just-in-time compilation is now performed by recent (post-2012) browsers. JavaScript was formalized in the ECMAScript language standard and is primarily used as part of a web browser (client-side JavaScript). This enables programmatic access to computational objects within a host environment.";
  var currentTimer = null;

  // DOM variables
  var readerElem = document.querySelector('#reader');



  // puts the center letter of a word in a highlight span
  var processWord = function (word) {
    var center = Math.floor(word.length / 2);
    var letters = word.split('');
    var result = [];
    return letters.map(function (letter, idx) {
      if (idx === center) {
        return '<span class="highlight">' + letter + '</span>';
      }
      return letter;
    }).join('');
  };

  var positionWord = function () {
    var wordElem = readerElem.firstElementChild;
    var highlight = wordElem.firstElementChild;

    var centerOffsetX = (highlight.offsetWidth / 2) + highlight.offsetLeft;
    var centerOffsetY = (highlight.offsetHeight / 2) + highlight.offsetTop;

    wordElem.style.left = ((readerElem.clientWidth / 2) - centerOffsetX) + 'px';
    wordElem.style.top = ((readerElem.clientHeight / 2) - centerOffsetY) + 'px';
  };

  $scope.start = function () {
    console.log('starting speed read with wpm=', $scope.wpm);

    var words = $scope.textToRead.trim().split(/\s+/);
    words = words.map(processWord);
    var currentWord = 0;
    var delay = 60000 / $scope.wpm;
    clearTimeout(currentTimer);

    var displayNextWord = function () {
      var word = words[currentWord++];
      console.log(word);
      var hasPause = /^\(|[,\.\)]$/.test(word);

      readerElem.firstElementChild.innerHTML = word;
      positionWord();

      if (currentWord !== words.length) {
        currentTimer = setTimeout(displayNextWord, delay * (hasPause ? 2 : 1));
      }
    };

    displayNextWord();
  };
});



// // I LOVE GLOBALS.
// var buttonEl = document.querySelector('#start');
// var commentEl = document.querySelector('#comment');
// var wpmEl = document.querySelector('#wpm');
// var readerEl = document.querySelector('#reader');
// var currentTimer = null;

// function processWord(word) {
//   var center = Math.floor(word.length / 2);
//   var letters = word.split('');
//   var result = [];
//   return letters.map(function (letter, idx) {
//     if (idx === center) {
//       return '<span class="highlight">' + letter + '</span>';
//     }
//     return letter;
//   }).join('');
// }

// function positionWord() {
//   var wordEl = readerEl.firstElementChild;
//   var highlight = wordEl.firstElementChild;

//   var centerOffsetX = (highlight.offsetWidth / 2) + highlight.offsetLeft;
//   var centerOffsetY = (highlight.offsetHeight / 2) + highlight.offsetTop;

//   wordEl.style.left = ((readerEl.clientWidth / 2) - centerOffsetX) + 'px';
//   wordEl.style.top = ((readerEl.clientHeight / 2) - centerOffsetY) + 'px';
// }

// buttonEl.addEventListener('click', function () {
//   var words = commentEl.textContent.split(/\s+/);

//   //remove blanks
//   words = words.filter(function (word) {
//     return word.trim() !== '';
//   });

//   words = words.map(processWord);
//   var currentWord = 0;
//   var delay = 60000 / parseInt(wpmEl.value, 10);

//   clearTimeout(currentTimer);

//   var displayNextWord = function () {
//     var word = words[currentWord++];
//     // WTB> nlp.js...
//     var hasPause = /^\(|[,\.\)]$/.test(word);

//     // XSS?! :(.
//     readerEl.firstElementChild.innerHTML = word;
//     positionWord();

//     if (currentWord !== words.length) {
//       currentTimer = setTimeout(displayNextWord, delay * (hasPause ? 2 : 1));
//     }
//   };

//   displayNextWord();
// });
