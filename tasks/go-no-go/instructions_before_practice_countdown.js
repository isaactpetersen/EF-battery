//We create an empty timeline
var timelineInstructionsBeforePractice = [];

//We define a block for the welcome screen
var instructionsWelcome = {
    //We use one of jsPsych plugins, that allow to display something on screen and wait for a user keyboard response.
	type: jsPsychHtmlKeyboardResponse,

	//What will be shown on screen
	stimulus: "Welcome to the experiment. This task will take around 10 minutes.</p>"+
	          "Press <strong>Enter</strong> to begin.",

	choices: ["Enter"] //Enter key, we will only move forwards on the timeline if the user presses it
};

//We add this first screen to the timeline
timelineInstructionsBeforePractice.push(instructionsWelcome);

//We randomly define if the user should focus on orange or blue squares, to counterbalance
var stims = jsPsych.randomization.shuffle([["orange", "stim1"],["blue", "stim2"]])

//We define a new block for the instructions of the task
var timeInstructions = 10; //Write here how long you want before the user can continue after reading the instructions

//We define a loop that will count down until the user can press ENTER.
var i;
for (i = timeInstructions; i > 0; i--) {
	var instructionsTask = {
	    type: jsPsychHtmlKeyboardResponse,
        stimulus: "In this experiment blue and orange squares will appear on the screen.</p>"+
                  "You will be told to respond to one of the colored squares by pressing the spacebar.</p>"+
                  "You should only respond to this color and withhold any response to the other color.</p>"+
                  "If you see the <font color=" + stims[0][0] + ">" + stims[0][0] + "</font> square you should "+
                  "<strong>respond by pressing the spacebar as quickly as possible</strong>.</p>If you see "+
                  "the <font color=" + stims[1][0] + ">" + stims[1][0] + "</font> square you should <strong> not "+
                  "respond</strong>.</p>We will begin with practice. You will get feedback telling "+
                  "you if you were correct.</p></p>"+
                  "<p style='color:#888888'>Press Enter to continue</p>"+ //We show this in grey, hinting that the user
                                                                          //can't press Enter yet
		          "<p><b>"+i.toString()+"</b></p>", //We show the amount of seconds left
		choices: "NO_KEYS", //No keys are available to continue, the user has to wait
		trial_duration: 1000 //The screen shows up for 1 sec (1 000 ms)
	};
	timelineInstructionsBeforePractice.push(instructionsTask);
};

//Finally, once the loop is over, we show "Press Enter" in red and remove the countdown.
var instructionsTask = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "In this experiment blue and orange squares will appear on the screen.</p>"+
              "You will be told to respond to one of the colored squares by pressing the spacebar.</p>"+
              "You should only respond to this color and withhold any response to the other color.</p>"+
              "If you see the <font color=" + stims[0][0] + ">" + stims[0][0] + "</font> square you should "+
              "<strong>respond by pressing the spacebar as quickly as possible</strong>.</p>If you see "+
              "the <font color=" + stims[1][0] + ">" + stims[1][0] + "</font> square you should <strong> not "+
              "respond</strong>.</p>We will begin with practice. You will get feedback telling "+
              "you if you were correct.</p></p>"+
              "<p style='color:#ff0000'><b>Press Enter to continue</b></p><p>&nbsp;</p>",
    choices: ["Enter"] //Enter key
};

timelineInstructionsBeforePractice.push(instructionsTask);

//We create a variable instructions containing this whole block, that we can then add to the timeline
var instructions = {
  timeline: timelineInstructionsBeforePractice,
};