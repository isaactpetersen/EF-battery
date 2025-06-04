// WELCOME SCREEN ------------------------------------------------------------------------------------------------------
const welcomeScreen = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<div class='instructions'>Welcome to the final task. It will take around 5 minutes.</p>" +
        "Press <strong>Enter</strong> to begin.</div>",
    choices: ["Enter"],
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "welcome-screen",
    },
};

// INSTRUCTIONS PRACTICE -----------------------------------------------------------------------------------------------
let timelineInstructionsPractice = [];

const instructionsPracticeText1 = "<div class='instructions'>" +
    "<p>In this experiment, we are testing how fast you can respond.</p>" +
    "<p>On each trial, press the <b>space bar</b> as quickly as possible <strong>after</strong> you see the " +
    "large <b>\"X\"</b>.</p></div>";

for (let i = timeInstructionsPractice1; i > 0; i--) {
    const instructionsPractice1 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsPracticeText1 +
            "<p style='color:#888888'>Press Enter to continue.</p>" +
            "<p><b>" + i.toString() + "</b></p>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineInstructionsPractice.push(instructionsPractice1);
}

const instructionsPractice1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsPracticeText1 + "<p style='color:#ff0000'><b>Press Enter to continue.</b></p><p>&nbsp;</p>",
    choices: ["Enter"],
};
timelineInstructionsPractice.push(instructionsPractice1);

const instructionsPracticeText2 = "<div class='instructions'><p>We will now start with 5 practice trials.</p></div>";

for (let i = timeInstructionsPractice2; i > 0; i--) {
    const instructionsPractice2 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsPracticeText2 +
            "<p style='color:#888888'>Press Enter to continue.</p>" +
            "<p><b>" + i.toString() + "</b></p>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineInstructionsPractice.push(instructionsPractice2);
}

const instructionsPractice2 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsPracticeText2 + "<p style='color:#ff0000'><b>Press Enter to continue.</b></p><p>&nbsp;</p>",
    choices: ["Enter"],
};
timelineInstructionsPractice.push(instructionsPractice2);

const instructionsPractice = {
    timeline: timelineInstructionsPractice,
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "instructions-practice",
    },
};

// INSTRUCTIONS TEST ---------------------------------------------------------------------------------------------------
let timelineInstructionsTest = [];

const instructionsTestText = "<div class='instructions'><p>We will now start the test.</p>" +
    "Respond to the \"X\" as quickly as possible by pressing the space bar.</p>" +
    "There will be two breaks.</p></div>";

for (let i = timeInstructionsTest; i > 0; i--) {
    const instructionsTest1 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsTestText +
            "<p style='color:#888888'>Press Enter to continue.</p>" +
            "<p><b>" + i.toString() + "</b></p>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineInstructionsTest.push(instructionsTest1);
}

const instructionsTest1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsTestText + "<p style='color:#ff0000'><b>Press Enter to continue.</b></p><p>&nbsp;</p>",
    choices: ["Enter"],
};
timelineInstructionsTest.push(instructionsTest1);

const instructionsTest = {
    timeline: timelineInstructionsTest,
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "instructions-test",
    },
};

// INSTRUCTIONS REST ---------------------------------------------------------------------------------------------------
const instructionsRest = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<p>Take a break!</p><p><b>Press Enter when you are ready to continue.</b></p><p>&nbsp;</p>",
    choices: ["Enter"],
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "instructions-rest",
    },
};

// END SCREEN ----------------------------------------------------------------------------------------------------------
const endScreen = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<div class='instructions'>" +
        "<p>You have completed the final task.</p>" +
        "<p>Press Enter to end the experiment.</p></div>",
    choices: ["Enter"],
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "end-screen",
    },
};
