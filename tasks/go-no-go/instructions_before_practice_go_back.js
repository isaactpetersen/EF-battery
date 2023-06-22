//We create an empty timeline
var timelineInstructionsBeforePractice = [];

//We define a block for the welcome screen
var instructionsWelcome = {
    //We use one of jsPsych plugins, that allow to display something on screen and wait for a user keyboard response.
	type: jsPsychHtmlKeyboardResponse,

	//What will be shown on screen
	stimulus: "Welcome to the experiment. This task will take around 10 minutes.</p>"+
	          "Press <strong>Enter</strong> to begin."+
	          "<div class = centerbox><div id='example'></div></div>",

	choices: ["Enter"] //Enter key, we will only move forwards on the timeline if the user presses it
};

//We add this first screen to the timeline
timelineInstructionsBeforePractice.push(instructionsWelcome);

var instructions_text = "In this experiment blue and orange squares will appear on the screen.</p>"+
                        "You will be told to respond to one of the colored squares by pressing the spacebar.</p>"+
                        "You should only respond to this color and withhold any response to the other color.</p>"+
                        "If you see the <b><font color=" + stims[0][0] + ">" + stims[0][0] + "</font></b> square you "+
                        "should respond by pressing the spacebar as quickly as possible</strong>.</p>If you see "+
                        "the <b><font color=" + stims[1][0] + ">" + stims[1][0] + "</font></b> square you should <b> "+
                        "not respond</b>.</p>We will begin with practice. You will get feedback telling "+
                        "you if you were correct.</p></p>";

//We define a new block for the instructions of the task
var instructionsTask = {
    type: jsPsychHtmlKeyboardResponse,
        stimulus: instructions_text + "<b>Press Enter to continue</b>",
    choices: ["Enter"] //Enter key
};

timelineInstructionsBeforePractice.push(instructionsTask);

//We define a condition: if the time spent reading the instructions is too short, we put a message at the top
var timeSpentReadingInstructions = 0;//This is the time the participants spent reading the instructions, we define it
                                     //to get it later
var timeMinimum = 5000; //Here write, in ms, how long you want your participants to spend at minimum on the instructions

//Function to get the time spent reading instructions from the data
var getTimeSpentReadingInstructions = function() {
    return jsPsych.data.getLastTrialData().select('rt').values[jsPsych.data.getLastTrialData().select('rt').values.length - 1];
}

//Message if the user pressed Enter too fast: we add "please take the time to read the instructions thoroughly" at the
//beginning
var instructionsTaskTooShort = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p style='color:#ff0000'><b>Please take the time to read the instructions thoroughly.</b></p>"+
              instructions_text + "<b>Press Enter to continue</b>",
    choices: ["Enter"] //Enter key
};

//We define a loop node: as long as the minimum time is not elapsed, we keep on showing the instruction
var instructionsLoopNode = {
    timeline: [instructionsTaskTooShort],
    loop_function: function(data) {
        timeSpentReadingInstructions = timeSpentReadingInstructions + getTimeSpentReadingInstructions();
        if (timeSpentReadingInstructions < timeMinimum){
            return true;
        } else {
            return false;
        }
    },
};

//We define an if node to check if we enter in the loop node or not (i.e., if the user pressed Enter too early, we
//enter the loop node, otherwise we ignore it.
var instructionsIfNode = {
    timeline: [instructionsLoopNode],
    conditional_function: function() {
        timeSpentReadingInstructions = timeSpentReadingInstructions + getTimeSpentReadingInstructions();
        if (timeSpentReadingInstructions < timeMinimum){
            return true;
        } else {
            return false;
        }
    },
};

timelineInstructionsBeforePractice.push(instructionsIfNode);

//We create a variable instructions containing this whole block, that we can then add to the timeline
var instructionsBeforePractice = {
  timeline: timelineInstructionsBeforePractice,
};