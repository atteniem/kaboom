import * as writer from '../lib/typewriter';
var config = require('../../game-config');

const init = () => {
  writer.writeScript([
    {delay: 0, el: "#screen", text: "Ok.. We are trying the password..." },
    {delay: 1000, el: "#screen", text: "WHEW!" },
    {delay: 0, fn: () => { $("#screen").children(":last").css("color", "#fff") } },
    {delay: 100, el: "#screen", text: "OOH!!" },
    {delay: 0, fn: () => { $("#screen").children(":last").css("color", "#fff") } },
    {delay: 2000, el: "#screen", text: "It almost seems like we have regained control. " },
    {delay: 4500, el: "#screen", text: "Yes! We did it. Nuclear launch aborted." },
    {delay: 3000, el: "#screen", text: "HOLD ON!" },
    {delay: 500, el: "#screen", text: "Incoming transmission...." },
    {delay: 100, el: "#screen", text: "------ TRANSMISSION -----" },
    {delay: 100, el: "#screen", text: "Haluan syödä kinkkua ja pelata pleikkaria jouluna. Jos ei käy niin räjäytän koko maailman paskaksi." },
    {delay: 0, fn: () => { $("#screen").children(":last").css("color", "#fff") } },
    {delay: 100, el: "#screen", text: "☝️" },
    {delay: 100, el: "#screen", text: "Ystävällisin terveisin " + config.TERRORIST_FIRST_NAME },
    {delay: 0, fn: () => { $("#screen").children(":last").css("color", "#fff") } },
    {delay: 100, el: "#screen", text: "---- END TRANSMISSION ---" },
    {delay: 1000, el: "#screen", text: "......" },
    {delay: 3000, el: "#screen", text: "Hmm... look like that transmission was encrypted" },
    {delay: 3000, el: "#screen", text: "Some weird language. We can't decrypt it." },
    {delay: 3000, el: "#screen", text: "The terrorist who hacked our computers just sent that" },
    {delay: 3000, el: "#screen", text: "---" },
    {delay: 3000, el: "#screen", text: "Can decrypt it?" },
    {delay: 3000, el: "#screen", text: "Do you know this person? Please full name of this terrorist" },
    {delay: 100, fn: () => { $(".ask-name").fadeIn(); } }
  ])
}

const phase2 = () => {
  writer.writeScript([
    {delay: 100, el: "#screen", text: "Ok let me check..." },
    {delay: 2000, el: "#screen", text: "A-HA!" },
    {delay: 2000, el: "#screen", text: "This person is TOP-1 on our most wanted list" },
    {delay: 1000, el: "#screen", text: "Do you have any idea what they want?" },
    {delay: 100, fn: () => { $(".ask-want").fadeIn() } }
  ])
}

const phase3 = () => {
  $(".ask-want").fadeOut();

  writer.writeScript([
    {delay: 100, el: "#screen", text: "Okay..." },
    {delay: 1000, el: "#screen", text: "We can't help with this 'kinkku' or what ever that is" },
    {delay: 1000, el: "#screen", text: "But that other thing.." },
    {delay: 1500, el: "#screen", text: "We may be able to help" },
    {delay: 100, fn: () => { $(".final-demand").fadeIn() } }
  ]);
}

$(() => {
  init();
  let wantsHam = false;
  let wantsPS4 = false;

  $("#lastname").on('keydown', function(e) {
    if(e.which == 13) {
      if(this.value.trim().toLowerCase() == config.TERRORIST_FULL_NAME) {
        $(".ask-name").fadeOut();
        $("#screen div").fadeOut();
        phase2();
      } else {
        $(".wrong-last-name").fadeIn();
      }
    }
  });

  $("#want-ham").on('keydown', function(e) {
    if(e.which == 13) {
      var guess = this.value.trim().toLowerCase();
      ///kinkku/i) || guess.match(/ham/i) || guess.match(/syö/i)
      if(guess.match(new RegExp(config.TERRORIST_DEMAND_1, 'i'))) {
        $("#want-ham").fadeOut();
        $(".wrong-ham").fadeOut();
        $(".want-ham-fulfilled").fadeIn();
        wantsHam = true;
        if (wantsPS4 && wantsHam) phase3();
      } else {
        $(".wrong-ham").fadeIn();
      }
    }
  });

  $("#want-play").on('keydown', function(e) {
    if(e.which == 13) {
      var guess = this.value.trim().toLowerCase();
      if(guess.match(new RegExp(config.TERRORIST_DEMAND_2, 'i'))) {
        $("#want-play").fadeOut();
        $(".wrong-play").fadeOut();
        $(".want-play-fulfilled").fadeIn();
        wantsPS4 = true;
        if (wantsPS4 && wantsHam) phase3();
      } else {
        $(".wrong-play").fadeIn();
      }
    }
  });

});
