// WELCOME SCREEN ------------------------------------------------------------------------------------------------------
const welcomeScreen = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<div class='instructions'>Welcome to the third task. It will take around 5 minutes.</p>" +
        "Press <strong>Enter</strong> to begin.</div>",
    choices: ["Enter"],
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "welcome-screen",
    },
};

// HEART INSTRUCTIONS --------------------------------------------------------------------------------------------------
let timelineHeartInstructions = [];

const instructionsHeartText1 = "<div class='instructions'>" +
    "<p>In this task, you will use the <b>A</b> and <b>L</b> keys on your keyboard.</p>" +
    "<p>Please rest your <b>left index finger</b> on the A key and your <b>right index finger</b> on the " +
    "L key.</p>" +
    "<img src='tasks/hearts-flowers/keyboard.png' alt='keyboard image' width='50%'/>" +
    "<p></p></div>";

for (let i = timeHeartInstructions1; i > 0; i--) {
    const heartInstructions1 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsHeartText1 +
            "<p style='color:#888888'>Press either key to continue.</p>" +
            "<p><b>" + i.toString() + "</b></p>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineHeartInstructions.push(heartInstructions1);
}

const heartInstructions1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsHeartText1 +
        "<p style='color:#ff0000'><b>Press either key to continue.</b></p><p>&nbsp;</p>",
    choices: ["a", "l"]
};
timelineHeartInstructions.push(heartInstructions1);

const instructionsHeartText2 = "<div class='instructions'><div class='instructions-float'>" +
    "<p>In this task, you're going to see a number of <b>hearts</b> and <b>flowers</b> in the box " +
    "below.</p>";

for (let i = timeHeartInstructions2; i > 0; i--) {
    const heartInstructions2 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsHeartText2 +
            "<p style='color:#888888'>Press Enter to continue</p>" +
            "<p><b>" + i.toString() + "</b></p></div>" +
            "<div class='heart-flower-stim'></div></div>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineHeartInstructions.push(heartInstructions2);
}

const heartInstructions2 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsHeartText2 +
        "<p style='color:#ff0000'><b>Press Enter to continue</b></p><p>&nbsp;</p></div>" +
        "<div class='heart-flower-stim'></div></div>",
    choices: ["Enter"]
};
timelineHeartInstructions.push(heartInstructions2);

const instructionsHeartText3 = "<div class='instructions'><div class='instructions-float'>" +
    "<p>When you see a <b>heart</b>, press the key that is on the <b>same</b> side as the heart.</p>";

for (let i = timeHeartInstructions3; i > 0; i--) {
    const heartInstructions3 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsHeartText3 +
            "<p style='color:#888888'>Here, you should press the <b>A</b> key.</p>" +
            "<p><b>" + i.toString() + "</b></p></div>" +
            "<div class='heart-flower-stim heart-flower-left'><img src='tasks/hearts-flowers/heart.png'/>" +
            "</div></div>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineHeartInstructions.push(heartInstructions3);
}

const heartInstructions3 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsHeartText3 +
        "<p><b>Here, you should press the <b>A</b> key.</b></p><p>&nbsp;</p></div>" +
        "<div class='heart-flower-stim heart-flower-left'><img src='tasks/hearts-flowers/heart.png'/>" +
        "</div></div>",
    choices: ["a"]
};
timelineHeartInstructions.push(heartInstructions3);

const heartInstructions4 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<div class='instructions'><div class='instructions-float'>" +
        "<p>Now, you should press the <b>L</b> key.</p></div>" +
        "<div class='heart-flower-stim heart-flower-right'><img src='tasks/hearts-flowers/heart.png'/>" +
        "</div></div>",
    choices: ["l"],
};
timelineHeartInstructions.push(heartInstructions4);

const instructionsHeartText5 = "<div class='instructions'><div class='instructions-float'>" +
    "<p>Very good. Try it a few more times—it goes pretty quickly.</p>" +
    "<p><b>Please go as fast as you can!</b></p>";

for (let i = timeHeartInstructions5; i > 0; i--) {
    const heartInstructions5 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsHeartText5 +
            "<p style='color:#888888'>Press Enter to continue.</p>" +
            "<p><b>" + i.toString() + "</b></p></div>" +
            "<div class='heart-flower-stim'></div></div>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineHeartInstructions.push(heartInstructions5);
}

const heartInstructions5 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsHeartText5 +
        "<p style='color:#ff0000'><b>Press Enter to continue</b></p><p>&nbsp;</p></div>" +
        "<div class='heart-flower-stim'></div></div>",
    choices: ["Enter"]
};
timelineHeartInstructions.push(heartInstructions5);

const heartInstructions = {
    timeline: timelineHeartInstructions,
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "instructions-heart",
    },
};

// FLOWER INSTRUCTIONS -------------------------------------------------------------------------------------------------
timelineFlowerInstructions = [];

const flowerInstructions1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<div class='instructions'><div class='instructions-float'>" +
        "<p>Great!</p>" +
        "<p><b>Press Enter to continue.</b></p></div>" +
        "<div class='heart-flower-stim'></div></div>",
    choices: ["Enter"],
};
timelineFlowerInstructions.push(flowerInstructions1);

const instructionsFlowerText2 = "<div class='instructions'><div class='instructions-float'>" +
    "<p>When you see a <b>flower</b>, press the key that is on the <b>opposite</b> side of the flower.</p>";

for (let i = timeFlowerInstructions2; i > 0; i--) {
    const flowerInstructions2 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsFlowerText2 +
            "<p style='color:#888888'>Here, you should press the <b>L</b> key.</p>" +
            "<p><b>" + i.toString() + "</b></p></div>" +
            "<div class='heart-flower-stim heart-flower-left'><img src='tasks/hearts-flowers/flower.png'/>" +
            "</div></div>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineFlowerInstructions.push(flowerInstructions2);
}

const flowerInstructions2 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsFlowerText2 +
        "<p><b>Here, you should press the <b>L</b> key.</b></p><p>&nbsp;</p></div>" +
        "<div class='heart-flower-stim heart-flower-left'><img src='tasks/hearts-flowers/flower.png'/>" +
        "</div></div>",
    choices: ["l"]
};
timelineFlowerInstructions.push(flowerInstructions2);

const flowerInstructions3 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<div class='instructions'><div class='instructions-float'>" +
        "<p>And here, you should press the <b>A</b> key.</p></div>" +
        "<div class='heart-flower-stim heart-flower-right'><img src='tasks/hearts-flowers/flower.png'/>" +
        "</div></div>",
    choices: ["a"],
};
timelineFlowerInstructions.push(flowerInstructions3);

const instructionsFlowerText4 = "<div class='instructions'><div class='instructions-float'>" +
    "<p>Very good. Try it a few more times. This can be tricky to get the hang of.</p>" +
    "<p><b>Please go as fast as you can!</b></p>";

for (let i = timeFlowerInstructions4; i > 0; i--) {
    const flowerInstructions4 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsFlowerText4 +
            "<p style='color:#888888'>Press Enter to continue</p>" +
            "<p><b>" + i.toString() + "</b></p></div>" +
            "<div class='heart-flower-stim'></div></div>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineFlowerInstructions.push(flowerInstructions4);
}

const flowerInstructions4 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsFlowerText4 +
        "<p style='color:#ff0000'><b>Press Enter to continue</b></p><p>&nbsp;</p></div>" +
        "<div class='heart-flower-stim'></div></div>",
    choices: ["Enter"]
};
timelineFlowerInstructions.push(flowerInstructions4);


const flowerInstructions = {
    timeline: timelineFlowerInstructions,
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "instructions-flower",
    },
};

// MIXED INSTRUCTIONS --------------------------------------------------------------------------------------------------
const instructionsMixedText = "<div class='instructions'>" +
    "<p>Great! Now the real activity begins. Both <b>hearts</b> and <b>flowers</b> will pop up.</p>" +
    "<p>When you see a <b>heart</b>, press the key that is on the <b>same</b> side as the heart.</p>" +
    "<p>When you see a <b>flower</b>, press the key that is on the <b>opposite</b> side of the flower.</p>" +
    "<p><b>Please respond as accurately and as quickly as you can!</b></p>" +
    "<p>This will take about three minutes to complete.</p>";

timelineMixedInstructions = [];

for (let i = timeMixedInstructions; i > 0; i--) {
    const mixedInstructions1 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructionsMixedText +
            "<p style='color:#888888'>Press Enter to begin. Good luck!</p>" +
            "<p><b>" + i.toString() + "</b></p></div>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timelineMixedInstructions.push(mixedInstructions1);
}

const mixedInstructions1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructionsMixedText +
        "<p style='color:#ff0000'><b>Press Enter to begin. Good luck!</b></p><p>&nbsp;</p></div>",
    choices: ["Enter"]
};
timelineMixedInstructions.push(mixedInstructions1);

const mixedInstructions = {
    timeline: timelineMixedInstructions,
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "instructions-mixed",
    },
};

// END SCREEN ----------------------------------------------------------------------------------------------------------
const endScreen = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<div class='instructions'>" +
        "<p>You have completed the third task.</p>" +
        "<p>Press <b>Enter</b> to access the <b>fourth and final task</b>.</p>",
    choices: ["Enter"],
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "end-screen",
    },
};