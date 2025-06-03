// WELCOME SCREEN ------------------------------------------------------------------------------------------------------
const welcomeScreen = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<p>Now, you will complete three cognitive tasks.</p>" +
        "<p>All together, these three tasks will last approximately 20 minutes.</p>" +
        "<p>The tasks require a keyboard.</p>" +
        "<p><b><u>Please complete the tasks using a computer with a keyboard!</u></b></p>" +
        "<p>Please do not use a smartphone, tablet, or other mobile device.</p>" +
        "<p style='color:#ff0000'><b>Press Enter to continue</b></p><p>&nbsp;</p></div>",
    choices: ["Enter"],
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "welcome-screen",
    },
};

// INSTRUCTIONS --------------------------------------------------------------------------------------------------------
const timelineInstructions = [];

const instructionsTestText1 = "<p>In this task, you will see a grid of squares that will flash blue one at a " +
    "time.</p><p>Your goal is to remember the order in which the squares flashed blue.</p>" +
    "<p>At the end of each trial, press the tiles that flashed in the <b>same order</b> as they were presented to " +
    "you.</p>";

for (let i = timeInstructions; i > 0; i--) {
    const instructionsTest1 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsTestText1 +
            "<p style='color:#888888'>Press Enter to continue.</p>" +
            "<p><b>" + i.toString() + "</b></p>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineInstructions.push(instructionsTest1);
}

const instructionsTest1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsTestText1 +
        "<p style='color:#ff0000'><b>Press Enter to continue</b></p><p>&nbsp;</p></div>",
    choices: ["Enter"]
};
timelineInstructions.push(instructionsTest1);

instructionsTestText2 = "<p>Do your best to memorize the order, but do not write them down</p>" +
    "<p>or use any other external tool to help you remember.</p>" +
    '<p>If you make a mistake, click the "Clear" button to erase your entries.</p>';

for (let i = timeInstructions; i > 0; i--) {
    const instructionsTest2 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsTestText2 +
            "<p style='color:#888888'>When you're ready, press Enter to get started.</p>" +
            "<p><b>" + i.toString() + "</b></p>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineInstructions.push(instructionsTest2);
}

const instructionsTest2 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsTestText2 +
        "<p style='color:#ff0000'><b>When you're ready, press Enter to get started.</b></p><p>&nbsp;</p></div>",
    choices: ["Enter"]
};
timelineInstructions.push(instructionsTest2);

const instructions = {
    timeline: timelineInstructions,
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "instructions-test",
    },
};

// END SCREEN ----------------------------------------------------------------------------------------------------------
const endScreen = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<div class='instructions'>" +
        "<p>This first task is complete.</p>" +
        "<p>Press <b>Enter</b> to access the <b>second task</b>.</p></div>",
    choices: ["Enter"],
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "end-screen",
    },
};