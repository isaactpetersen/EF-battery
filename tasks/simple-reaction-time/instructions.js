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

const instructionsPracticeText2 = "<div class='instructions'><p>We will now start with " + numberOfTrialsPractice + " practice trials.</p></div>";

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

// WARNING TRIAL TOO FAST PRACTICE -------------------------------------------------------------------------------------
let timelineTooFastPractice = [];

const instructionsTooFastPractice = "<p>Please wait until the cross appears to press the space bar.</b>";

for (let i = timeInstructionsTooFastPractice; i > 0; i--) {
    const instructionsTooFastPractice1 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsTooFastPractice +
            "<p style='color:#888888'>Press the space bar to continue.</p>" +
            "<p><b>" + i.toString() + "</b></p>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineTooFastPractice.push(instructionsTooFastPractice1);
}

const instructionsTooFastPractice1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsTooFastPractice + "<p style='color:#ff0000'><b>Press the space bar to " +
        "continue.</b></p><p>&nbsp;</p>",
    choices: [" "],
};
timelineTooFastPractice.push(instructionsTooFastPractice1);

// INSTRUCTIONS TEST ---------------------------------------------------------------------------------------------------
let timelineInstructionsTest = [];

let instructionsTestText = "<div class='instructions'><p>We will now start the test.</p>" +
    "Respond to the \"X\" as quickly as possible by pressing the space bar.</p>"
if (numberOfBlocksTest === 2) {
    instructionsTestText += "There will be 1 break.</p></div>";
} else if (numberOfBlocksTest > 2) {
    instructionsTestText += "There will be " + numberOfBlocksTest + " breaks.</p></div>";
}

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

// INSTRUCTIONS NO RESPONSE --------------------------------------------------------------------------------------------
let timelineNoResponse = [];

const instructionsNoResponse = "<div class='instructions'>" +
    "<p>We have detected a number of a trials where <b>you did not press the space bar</b> in time.</p>" +
    "<p>On each trial, press the <b>space bar</b> as quickly as possible <b>after</b> you see the " +
    "large <b>\"X\"</b>.</p></div>";

for (let i = timeInstructionsNoResponse; i > 0; i--) {
    const instructionsNoResponse1 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsNoResponse +
            "<p style='color:#888888'>Press the space bar to continue.</p>" +
            "<p><b>" + i.toString() + "</b></p>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineNoResponse.push(instructionsNoResponse1);
}

const instructionsNoResponse1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsNoResponse + "<p style='color:#ff0000'><b>Press the space bar to " +
        "continue.</b></p><p>&nbsp;</p>",
    choices: [" "],
};
timelineNoResponse.push(instructionsNoResponse1);

// INSTRUCTIONS TOO FAST -----------------------------------------------------------------------------------------------
let timelineTooFast = [];

const instructionsTooFast =
    "<p>We have detected a number of a trials where the reaction time was <b>implausibly fast.</b></p>" +
    "<p>Please make sure that you hit the space bar <b>once</b>, as " +
    "quickly as possible <b>only after the large X appears</b>.</p>";

for (let i = timeInstructionsTooFast; i > 0; i--) {
    const instructionsTooFast1 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsTooFast +
            "<p style='color:#888888'>Press the space bar to continue.</p>" +
            "<p><b>" + i.toString() + "</b></p>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineTooFast.push(instructionsTooFast1);
}

const instructionsTooFast1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsTooFast + "<p style='color:#ff0000'><b>Press the space bar to " +
        "continue.</b></p><p>&nbsp;</p>",
    choices: [" "],
};
timelineTooFast.push(instructionsTooFast1);

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
