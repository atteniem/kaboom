import * as writer from '../lib/typewriter';

$(() => {
  writer.setInterval(25);
  writer.writeScript([
    { delay: 0, appendEl: false, el: "h1", text: "Hello, agent"},
    { delay: 250, appendEl: false, el: ".thank-you", text: "Thank you for accepting this mission."},
    { delay: 1000, appendEl: false, el: ".problem", text: "We have a serious problem."},
    { delay: 1000, appendEl: false, el: ".first-emphasis", text: "A computer system responsible for the whole nuclear arsenal of the UNITED STATES GOVERMENT has been hacked!"},
    { delay: 250, appendEl: false, el: ".we-need", text: "We need you to"},
    { delay: 100, fn: () => { $("ul").fadeIn() } },
    { delay: 750, appendEl: false, el: ".emp-1", text: "Regain access to the main frame"},
    { delay: 350, appendEl: false, el: ".emp-2", text: "Find the admin password for the system"},
    { delay: 350, appendEl: false, el: ".emp-3", text: "Report the password back to us so we can get our nukes back"},
    { delay: 850, fn: () => { $(".reveal").fadeIn() } },
    { delay: 250, appendEl: false, el: ".second-emphasis", text: "GOOD LUCK AND GODSPEED! The free world is counting on you."}
  ]);
});
