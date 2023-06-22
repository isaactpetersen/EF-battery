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

//We define a new block for the instructions of the task
var instructionsTask = {
    type: jsPsychHtmlKeyboardResponse,
        stimulus: instructions_text + "<b>Press Enter to begin</b>",
    choices: ["Enter"] //Enter key
};

timelineInstructionsBeforeMainTask.push(instructionsTask);

//We define a condition: if the time spent reading the instructions is too short, we put a message at the top
var timeSpentReadingInstructions = 0;//This is the time the participants spent reading the instructions, we define it
                                     //to get it later
var timeMinimum = 1000; //Here write, in ms, how long you want your participants to spend at minimum on the instructions

//Function to get the time spent reading instructions from the data
var getTimeSpentReadingInstructions = function() {
    return jsPsych.data.getLastTrialData().select('rt').values[0];
}

//Message if the user pressed Enter too fast: we add "please take the time to read the instructions thoroughly" at the
//beginning
var instructionsTaskTooShort = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p style='color:#ff0000'><b>Please take the time to read the instructions thoroughly.</b></p>"+
              instructions_text + "<b>Press Enter to begin</b>",
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

timelineInstructionsBeforeMainTask.push(instructionsTask);

//We create a variable instructions containing this whole block, that we can then add to the timeline
var instructionsBeforeMainTask = {
  timeline: timelineInstructionsBeforeMainTask,
};