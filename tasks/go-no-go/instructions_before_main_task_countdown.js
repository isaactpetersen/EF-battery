//We create an empty timeline
var timelineInstructionsBeforeMainTask = [];

//We define a new block for the instructions of the task
var timeInstructions = 10; //Write here how long you want before the user can continue after reading the instructions

var instructions_text = "Practice is over, we will now begin the experiment.</p>"+
                        "You will no longer get feedback about your responses.</p>"+
                        "Remember, if you see the <b><font color='" + stims[0][0] + "'>" + stims[0][0] + "</font></b> "+
                        "square, you should <b>respond by pressing the spacebar as quickly as possible</b>.</p>"+
                        "If you see the <b><font color='" + stims[1][0] + "'>" + stims[1][0] + "</font></b> square, "+
                        "you should <b>not respond</b>.</p>";

//We define a loop that will count down until the user can press ENTER.
var i;
for (i = timeInstructions; i > 0; i--) {
	var instructionsTask = {
	    type: jsPsychHtmlKeyboardResponse,
        stimulus: instructions_text+
                  "<p style='color:#888888'>Press Enter to begin</p>"+ //We show this in grey, hinting that the user
                                                                          //can't press Enter yet
		          "<p><b>"+i.toString()+"</b></p>", //We show the amount of seconds left
		choices: "NO_KEYS", //No keys are available to continue, the user has to wait
		trial_duration: 1000 //The screen shows up for 1 sec (1 000 ms)
	};
	timelineInstructionsBeforeMainTask.push(instructionsTask);
};

//Finally, once the loop is over, we show "Press Enter" in red and remove the countdown.
var instructionsTask = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions_text+
              "<p style='color:#ff0000'><b>Press Enter to begin</b></p><p>&nbsp;</p>",
    choices: ["Enter"] //Enter key
};

timelineInstructionsBeforeMainTask.push(instructionsTask);

//We create a variable instructions containing this whole block, that we can then add to the timeline
var instructionsBeforeMainTask = {
  timeline: timelineInstructionsBeforeMainTask,
};