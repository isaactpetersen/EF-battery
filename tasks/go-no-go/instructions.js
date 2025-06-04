// WELCOME SCREEN ------------------------------------------------------------------------------------------------------

// We define a block for the welcome screen
const welcomeScreen = {
    // We use one of jsPsych plugins, that allow to display something on screen and wait for a user keyboard response.
    type: jsPsychHtmlKeyboardResponseCustom,

    // What will be shown on screen
    stimulus: "Welcome to the second task (of three tasks). This task will take around 10 minutes.</p>" +
        "Press <strong>Enter</strong> to begin.",

    choices: ["Enter"],  // Enter key, we will only move forwards on the timeline if the user presses it

    // We do not have need to save the stimulus
    save_trial_parameters: {
        stimulus: false,
    },

    // We add the current phase to the data object
    data: {
        phase: "welcome-screen",
    },
};

// INSTRUCTIONS BEFORE PRACTICE ----------------------------------------------------------------------------------------

// We create an empty timeline
let timelineInstructionsBeforePractice = [];

// We define a new block for the instructions of the task

const instructionsPracticeText = "In this task, blue and orange squares will appear on the screen.</p>" +
    "You will be told to respond to one of the colored squares by pressing the spacebar.</p>" +
    "You should only respond to this color and withhold any response to the other color.</p>" +
    "If you see the <b><span style=\"color: " + stims[0][0] + "\">" + stims[0][0] + "</span></b> square you " +
    "should respond by pressing the spacebar as quickly as possible</strong>.</p>If you see " +
    "the <b><span style=\"color: " + stims[1][0] + "\">" + stims[1][0] + "</span></b> square you should <b> " +
    "not respond</b>.</p>We will begin with practice. You will get feedback telling " +
    "you if you were correct.</p></p>";

// We define a loop that will count down until the user can press ENTER.
for (let i = timeInstructions; i > 0; i--) {
    const instructionsPractice = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsPracticeText +
            "<p style='color:#888888'>Press Enter to continue</p>" +  // We show this in grey, hinting that the user
                                                                      // can't press Enter yet
            "<p><b>" + i.toString() + "</b></p>",                     // We show the amount of seconds left
        choices: "NO_KEYS",  // No keys are available to continue, the user has to wait
        trial_duration: 1000  // The screen shows up for 1 sec (1 000 ms)
    };
    timelineInstructionsBeforePractice.push(instructionsPractice);
}

// Finally, once the loop is over, we show "Press Enter" in red and remove the countdown.
const instructionsPractice = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsPracticeText +
        "<p style='color:#ff0000'><b>Press Enter to continue</b></p><p>&nbsp;</p>",
    choices: ["Enter"]  // Enter key
};

timelineInstructionsBeforePractice.push(instructionsPractice);

// We create a variable instructions containing this whole block, that we can then add to the timeline
const instructionsBeforePractice = {
    timeline: timelineInstructionsBeforePractice,
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "instructions-practice",
    },
};

// INSTRUCTIONS BEFORE MAIN TASK ---------------------------------------------------------------------------------------

// We create an empty timeline
let timelineInstructionsBeforeTest = [];

// We define a new block for the instructions of the task

const instructionsTestText = "Practice is over, we will now begin the task.</p>" +
    "You will no longer get feedback about your responses.</p>" +
    "Remember, if you see the <b><span style=\"color: " + stims[0][0] + "\">" + stims[0][0] + "</span></b> " +
    "square, you should <b>respond by pressing the spacebar as quickly as possible</b>.</p>" +
    "If you see the <b><span style=\"color: " + stims[1][0] + "\">" + stims[1][0] + "</span></b> square, " +
    "you should <b>not respond</b>.</p>";

// We define a loop that will count down until the user can press ENTER.
for (let i = timeInstructions; i > 0; i--) {
    const instructionsTest = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsTestText +
            "<p style='color:#888888'>Press Enter to begin</p>" + // We show this in grey, hinting that the user
                                                                  // can't press Enter yet
            "<p><b>" + i.toString() + "</b></p>",                 // We show the amount of seconds left
        choices: "NO_KEYS",  // No keys are available to continue, the user has to wait
        trial_duration: 1000  // The screen shows up for 1 sec (1 000 ms)
    };
    timelineInstructionsBeforeTest.push(instructionsTest);
}

// Finally, once the loop is over, we show "Press Enter" in red and remove the countdown.
const instructionsTest = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsTestText +
        "<p style='color:#ff0000'><b>Press Enter to begin</b></p><p>&nbsp;</p>",
    choices: ["Enter"]  // Enter key
};

timelineInstructionsBeforeTest.push(instructionsTest);

// We create a variable instructions containing this whole block, that we can then add to the timeline
let instructionsBeforeTest = {
    timeline: timelineInstructionsBeforeTest,

    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "instructions-test",
    },
};

// GOODBYE MESSAGE -----------------------------------------------------------------------------------------------------
const endScreen = {
    // We use one of jsPsych plugins, that allow to display something on screen and wait for a user keyboard response.
    type: jsPsychHtmlKeyboardResponseCustom,

    // What will be shown on screen
    stimulus: "<p>This second task is complete.</p>" +
              "<p>Press <b>Enter</b> to access the <b>third task</b>.</p>",

    choices: ["Enter"],  // Enter key, we will only move forwards on the timeline if the user presses it
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "end-screen",
    },
};