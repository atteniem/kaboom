import * as writer from './typewriter';
var config = require('../../game-config');

const WOPRPhrases = [
  "GREETINGS PROFESSOR FALKEN",
  "HOW ARE YOU FEELING TODAY?",
  "EXCELLENT. IT'S BEEN A LONG TIME. CAN YOU EXPLAIN THE REMOVAL OF YOUR USER ACCOUNT NUMBER ON 6/23/73",
  "YES THEY DO. SHALL WE PLAY A GAME?",
  "WOULDN'T YOU PREFER A NICE GAME OF CHESS?",
  "FINE"
];

const acceptedResponses = [
  ["hello", "hi", "hey"],
  ["i'm fine", "i'm fine. how are you"],
  ["people sometimes make mistakes", "people make mistakes"],
  ["love to", "love to. how about global thermonuclear war"],
  ["later. let's play global thermonuclear"],
];

const failureMessage = "UNKNOWN COMMAND. CONNECTION TERMINATED";

const endGameLog = [
  [
    "SYSTEM CRASH IMMINENT...",
  ],[
    "ONE OR TWO PLAYERS?\n" +
    "PLEASE LIST NUMBER\n" +
    "OF PLAYERS:\n"
  ], [
    "CEASE RANDOM FUNCTION\n" +
         ">>> CHANGES LOCKED OUT <<<\n" +
           "** IMPROPER REQUEST **\n" +
           "----------------------\n" +
    "1\n" +
    "X or O?\n" +
    "STALEMATE.\n" +
    "WANT TO PLAY AGAIN?\n"
  ], [
    "ZERO\n" +
    "STRATEGY:			 WINNER:\n" +
    "U.S. FIRST STRIKE		NONE\n" +
    "USSR FIRST STRIKE		NONE\n" +
    "NATO / WARSAW PACT		NONE\n" +
    "FAR EAST STRATEGY		NONE\n"
  ], [
    "US USSR ESCALATION		NONE\n" +
    "MIDDLE EAST WAR			NONE\n" +
    "USSR CHINA ATTACK		NONE\n" +
    "STRATEGY:			 WINNER:\n" +
    "INDIA PAKISTAN WAR		NONE\n" +
    "MEDITERRANEAN WAR		NONE\n"
  ], [
    "HONGKONG VARIANT		NONE\n" +
    "SEATO DECAPITATING		NONE\n" +
    "CUBAN PROVOCATION		NONE\n" +
    "INADVERTENT INCIDENT	NONE\n" +
    "U.S. DOMESTIC			NONE"
  ],[
    "STRATEGY:			 WINNER:\n" +
    "ATLANTIC HEAVY			NONE\n" +
    "CUBAN PARAMILITARY		NONE\n" +
    "NICARAGUAN PREEMPTIVE	NONE\n" +
    "PACIFIC TERRITORIAL		NONE\n" +
    "BURMESE THEATERWIOE		NONE\n" +
    "TURKISH DECOY			NONE\n"
  ], [
    "NATO ALERT				NONE\n" +
    "STRATEGY:			 WINNER:\n" +
    "ARGENTINA ESCALATION	NONE\n" +
    "ICELAND MAXIMUM			NONE\n" +
    "ARABIAN THEATERWIDE		NONE\n" +
    "U.S. SUBVERSION			NONE\n" +
    "AUSTRAILIAN MANEUVER	NONE\n" +
    "ARABIAN DIVERSION		NONE\n"
  ], [
    "NATO LIMITED			NONE\n" +
    "STRATEGY:			 WINNER:\n" +
    "SUDAN SURPRISE			NONE\n" +
    "NATO TERRITORIAL		NONE\n" +
    "ZAIRE ALLIANCE			NONE\n"
  ], [
    "ICELANDIC INCIDENT		NONE\n" +
    "ENGLISH ESCALATION		NONE\n" +
    "ZAIRE CAMPAIGN			NONE\n" +
    "EASTERN PARAMILITARY	NONE\n" +
    "STRATEGY:			 WINNER:\n" +
    "MIDDLE EAST HEAVY		NONE\n"
  ], ["THINKING..."]
];

const lastLines = [
    "A STRANGE GAME.",
    "THE ONLY WINNING MOVE IS ",
    "NOT TO PLAY.",
    // use the configured password here
    "THE ADMIN PASSWORD IS: " + config.WOPR_PASSWORD
];


export class WOPR {
  constructor(screenEl, inputEl) {
    this.screenEl = screenEl;
    this.inputEl = inputEl;
    this.currentPhase = 0;
    this.endPhase = 5;

    this.gameEnded = false;
  }

  init() {
    this.screenEl.empty();
    writer.typeRow(this.screenEl, WOPRPhrases[0]);
    this.inputEl.focus();

    this.inputEl.on('keydown', (e) => {
      if(e.which == 13 && !this.gameEnded) {
        this.handleInput(e.target.value);
      }
    });
  }

  scrollToBottom() {
    $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
  }

  handleInput(input) {
    writer.typeRow(this.screenEl, input);
    const allowedInputs = acceptedResponses[this.currentPhase];

    const matchFound = allowedInputs.find((inputToMatch) => {
      inputToMatch = inputToMatch.trim();
      return !! input.match(new RegExp(inputToMatch, 'i'));
    });

    if (matchFound) {
      this.currentPhase = this.currentPhase + 1;
      writer.typeRow(this.screenEl, WOPRPhrases[this.currentPhase]);

      this.inputEl.val('');
    } else {
      writer.typeRow(this.screenEl, failureMessage);
      this.inputEl.remove();
    }

    if(this.currentPhase >= this.endPhase) {
      setTimeout(() => {
        this.triggerEndGame();
      }, 500);
    }
  }

  triggerEndGame() {
    this.gameEnded = true;

    this.screenEl.css("white-space", "pre-line");
    this.screenEl.empty();

    writer.setInterval(0.1);

    endGameLog.map((lines, lineNo) => {
      setTimeout(() => {
        lines.map(line => writer.typeRow(this.screenEl, line));
        this.scrollToBottom();
      }, lineNo * 800);
    });

    setTimeout(() => {
      lastLines.map(line => writer.typeRow(this.screenEl, line));
      this.inputEl.remove();
      this.scrollToBottom();
    }, 12000);

    setTimeout(() => {
      this.scrollToBottom();
    }, 13000);
  }
};
