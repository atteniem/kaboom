import * as writer from '../lib/typewriter';
var config = require('../../game-config');

$(() => {
  $("#psstore").fadeIn();

  writer.setInterval(30);
  writer.writeScript([
    {delay: 500, el:".first-part", text: "Do you know what this is?" },
    {delay: 2500, el: ".first-part", text: "This is something better than hijacked nukes." },
    {delay: 1500, el: ".first-part", text: "It should keep the terrorist happy so she won't try start a nucelear war again." },
    {delay: 3000, el: ".emphasis-one", text: "We spent some taxpayer dollars and our SEAL team just delivered some PS Store money to location." },
    {delay: 500, el: ".coordinates", text:  config.PRESENT_COORDINATE_N },
    {delay: 500, el: ".coordinates", text: config.PRESENT_COORDINATE_E },
    {delay: 2500, el: ".second-part", text: "You need to fetch the money from these coordinates and deposit it to the terrorist's PS4" },
    {delay: 2500, el: ".emphasis-two", text: "Do this so we all can go back and enjoy our christmas." },
    {delay: 3000, el: ".third-part", text: "GOOD LUCK AGAIN, AGENT!" }
  ])
});
