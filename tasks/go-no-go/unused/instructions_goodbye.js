var timeline_instructions_goodbye = [];

//We define a block for the welcome screen
var instructionsGoodbye = {
    //We use one of jsPsych plugins, that allow to display something on screen and wait for a user keyboard response.
	type: jsPsychHtmlKeyboardResponse,

	//What will be shown on screen
	stimulus: "The experiment is over. Thanks for participating!</p></p>"+
	          "Press <b>Enter</b> to quit.",

	choices: ["Enter"] //Enter key, we will only move forwards on the timeline if the user presses it
};

timeline_instructions_goodbye.push(instructionsGoodbye);

var goodbye = {
  timeline: timeline_instructions_goodbye,
};