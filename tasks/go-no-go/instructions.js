//We create an empty timeline
var timelineInstructions = [];

//We define a block for the welcome screen
var instructions_welcome = {
    //We use one of jsPsych plugins, that allow to display something on screen and wait for a user keyboard response.
	type: jsPsychHtmlKeyboardResponse,

	//What will be shown on screen
	stimulus: "Welcome to the experiment. This task will take around 10 minutes.</p>"+
	          "Press <strong>Enter</strong> to begin.",

	choices: ["Enter"] //Enter key, we will only move forwards on the timeline if the user presses it
};

//We add this first screen to the timeline
timelineInstructions.push(instructions_welcome);

//We randomly define if the user should focus on orange or blue squares, to counterbalance
var stims = jsPsych.randomization.shuffle([["orange", "stim1"],["blue", "stim2"]])

//We define a new block for the instructions of the task
var instructions_task = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "In this experiment blue and orange squares will appear on the screen.</p>"+
              "You will be told to respond to one of the colored squares by pressing the spacebar.</p>"+
              "You should only respond to this color and withhold any response to the other color.</p>"+
              "If you see the <font color=" + stims[0][0] + ">" + stims[0][0] + "</font> square you should "+
              "<strong>respond by pressing the spacebar as quickly as possible</strong>.</p>If you see "+
              "the <font color=" + stims[1][0] + ">" + stims[1][0] + "</font> square you should <strong> not "+
              "respond</strong>.</p>We will begin with practice. You will get feedback telling "+
              "you if you were correct.</p>",
    choices: ["Enter"] //Enter key
};

timelineInstructions.push(instructions_task);

//We create a variable instructions containing this whole block, that we can then add to the timeline
var instructions = {
  timeline: timelineInstructions,
};