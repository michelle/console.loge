(function(exports) {
  var ILLITERACY_RATE = 0.4;  // illiterite
  var CONFUSION_RATE = 0.2;   // *what*
  var SUPPLIES_RATE = 0.1;    // wow, who am i?
  var DOGE_RATE = 0.8;        // very hi

  var PREFIXES = ['so', 'such', 'very', 'plz', 'how', 'am', 'much'];
  var SURPRISES = ['who am i', 'wow', 'wow', 'so amaze'];
  var AVERAGE_WHITESPACE = 50;
  var VOWELS = {
    'e': 'a', // TODO: what to do about double letters?
    'a': 'e',
    'i': 'e',
    'u': 'o',
    'o': 'u'
  };

  var REPLACEMENTS = {
    'error': 'bad bad',
    'here': 'so amaze',
    'todo': 'must do',
    'fixme': 'such broken'
  };

  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

  function loge() {
    var args = arguments;
    var results = [];
    var rand = randomSurprise();

    if (rand) {
      results.push(rand);
    }

    for (var i = 0, ii = args.length; i < ii; i += 1) {
      var phrase = randomWhitespace();
      var input = args[i];

      if (Math.random() < DOGE_RATE) {
        phrase += randomPrefix() + ' ';
      }

      if (typeof input === 'string') {
        phrase += randomPhraseMutation(args[i]);
      } else {
        phrase += (typeof input) + ': ';
        results.push(phrase);

        // Log objects on their own.
        phrase = input;
      }

      results.push(phrase);

      if (Math.random() < SUPPLIES_RATE) {
        results.push(randomWhitespace() + randomSurprise());
      }
    }

    if (isChrome) {
      var temp = results;
      results = [];
      var format = '';
      for(var i = 0; i < temp.length; i++){
        format = format + '%c%s';
      }

      results.push(format);
      
      for(var i = 0; i < temp.length; i++){
        var color = randomColor();
        results.push('font-family: Comic Sans MS; line-height: 2em; font-size: 1.5em; color: ' + color);
        results.push(temp[i] + ',');
      }

    }

    console.log.apply(console, results);
  }

  /**
   *            so many random
   *
   *    such functions
   */

  // Generate a random number between two numbers! Wow!
  function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  function randomColor() {
    return ['red', 'blue', 'green', 'aqua', 'magenta', 'yellow'][randomNumber(0, 5)];
  }

  // Select a random prefix! Wow!
  function randomPrefix() {
    return PREFIXES[randomNumber(0, PREFIXES.length)];
  }

  // Select a random substitution! Wow!
  function randomSurprise() {
    return SURPRISES[randomNumber(0, SURPRISES.length)];
  }

  // Select a random amount of whitespace! Wow!
  function randomWhitespace() {
    var randomMax = AVERAGE_WHITESPACE * (1 + Math.random() - 0.5);

    str = '';
    for (var i = 0; i < randomMax; i += 1) {
      str += ' ';
    }
    return str;
  }

  // TODO
  function randomPhraseMutation(phrase) {
    phrase = maybeReplaceVowels(phrase);

    phrase = phrase.split(' ');
    for (var i = 0, ii = phrase.length; i < ii; i += 1) {
      phrase[i] = maybeSwitchLastLetters(phrase[i]);

      // TODO: add more
    }
    phrase = phrase.join(' ');

    phrase = maybeAddStars(phrase);
    phrase = globalReplacements(phrase);
    return phrase;
  }

  /**
   *      woww the utils
   *
   *                      such phrase utils
   */
  function maybeReplaceVowels(phrase) {
    if (Math.random() > ILLITERACY_RATE) {
      return phrase;
    }

    var words = phrase.split(' ');

    // Choose longest word to replace.
    var bestWord;
    var index = 0;
    for (var i = 0, ii = words.length; i < ii; i += 1) {
      if (!bestWord || words[i].length > bestWord.length) {
        bestWord = words[i];
        index = i;
      }
    }

    var vowel = findBestVowel(bestWord);
    if (vowel) {
      words[index] = bestWord.replace(vowel, VOWELS[vowel]);
    }
    return words.join(' ');
  }

  // Replace global things.
  function globalReplacements(phrase) {
    phrase = phrase.toLowerCase();
    var targetWords = Object.keys(REPLACEMENTS);
    for (var i = 0, ii = targetWords.length; i < ii; i += 1) {
      phrase = phrase.replace(targetWords[i], REPLACEMENTS[targetWords[i]]);
    }
    return phrase;
  }

  // Adds stars.
  function maybeAddStars(phrase) {
    if (Math.random() < CONFUSION_RATE) {
      return '*' + phrase + '*';
    }
    else {
      return phrase;
    }
  }

  /**
   *    oh wow
   *
   *          utils for words
   */

  // Returns the most common vowel in word.
  function findBestVowel(word) {
    var letters = word.split('');
    letters.pop(); // trailing letters don't count--we're not THAT illiterate.
    var bestLetters = {};

    var uniqueLetters = {};
    for (var i = 0, ii = letters.length; i < ii; i += 1) {
      var letter = letters[i];
      uniqueLetters[letter] |= 0;
      uniqueLetters[letter] += 1;
    }

    var vowels = Object.keys(VOWELS);
    var bestVowel;
    var bestVowelCount = 0;
    for (var i = 0, ii = vowels.length; i < ii; i += 1) {
      var vowel = vowels[i];
      if (uniqueLetters[vowel] !== undefined && uniqueLetters[vowel] >= bestVowelCount) {
        bestVowel = vowel;
        bestVowelCount = uniqueLetters[vowel];
      }
    }

    return bestVowel;
  }

  // Switch last two letters of a word ending with 'e'.
  function maybeSwitchLastLetters(word) {
    if (Math.random() < ILLITERACY_RATE && word[word.length - 1] === 'e' && word.length > 2) {
      word = word.split('');
      var last = word[word.length - 1];
      word[word.length - 1] = word[word.length - 2];
      word[word.length - 2] = last;
      word = word.join('');
    }
    return word;
  }

  exports.console = exports.console || {};
  exports.console.loge = loge;
})(this);

