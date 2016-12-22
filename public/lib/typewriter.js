var INTERVAL = 10;

const typeLetter = (el, letter, delay=0) => {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      el.text(el.text() + letter);
      resolve();
    }, delay);
  });
}

export const typeRow = (el, sentence, appendEl=undefined, delay=0) => {
  // Write the given sentence to the given element
  // returns a Promise that is resolved when typing is done
  // By default creates a new <div> where the sentence is placed

  const letters = sentence.split("");
  if(!letters.length) return Promise.resolve();

  var row = (appendEl == undefined || appendEl == true) ? $("<div></div>") : el;
  el.append(row);

  return Promise.all(
    letters.map((letter, letterNo) => {
      return typeLetter(row, letter, delay + INTERVAL * letterNo);
    })
  );
};

export const writeScript = (script) => {
  /* Display and write the given script. The script is processed one by one.
   *
   * The script should be an array that contains two types of elements:

   * - Text for typewriter. Example: { delay: 250, appendEl: false, el: ".some-element", text: "Hello"},
   *   Typing starts after the delay. Letters are typed one by one.
   *
   * - Some function that needs to be executed. Example: { delay: 100, fn: () => { $("ul").fadeIn() } },
   *   The given fn is executed after the the given delay
   *
  */

  if(!script.length) return;
  const payload = script.shift();

  if(payload.fn) {
    // function
    setTimeout(() => {
      payload.fn();
      writeScript(script);
    }, payload.delay);
  } else {
    // Text
    typeRow($(payload.el), payload.text, payload.appendEl, payload.delay).then(() => { writeScript(script) });
  }
}

export const setInterval = (interval) => { INTERVAL = interval; };
