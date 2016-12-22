import { WOPR } from '../lib/wopr'
import * as writer from '../lib/typewriter';

$(() => {
  const woprScreen = $("#screen");
  const woprInput = $("#wopr-input");

  var wopr = new WOPR(woprScreen, woprInput);
  wopr.init();
});

$('html').on('click', () => {
  woprInput.focus();
});
