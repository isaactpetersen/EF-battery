/**
 * Returns a random number from an exponential distribution, times it by 1000 to get a time in milliseconds
 * (max. 4500 ms), and adds a delay if specified.
 * @returns {number} A random number from an exponential distribution.
 */
function getTrialTime(delay = 0) {
    return Math.min(-Math.log(Math.random()) * 1000, 4500) + delay
}

// PRACTICE TRIAL ------------------------------------------------------------------------------------------------------
const firstBlankTrial = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: stim,
    stimulus_duration: 0,  // Placeholder
    trial_duration: 2000,  // Placeholder
    response_ends_trial: false,
    data: {
        trial_id: "stim-0",
        exp_stage: "practice"
    },
    choices: [" "],
    on_finish: function() {
        appendData();
    }
}

const practiceTrial = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: stim,
    stimulus_duration: 2000,
    trial_duration: 6500,  // Placeholder
    response_ends_trial: false,
    data: {
        trial_id: "stim",
        exp_stage: "practice"
    },
    choices: [" "],
    on_finish: function() {
        appendData();
    }
};

let timelinePracticeBlock = [];
getTrialTime(2000);
timelinePracticeBlock.push(firstBlankTrial);
for (let i = 0; i < numberOfTrialsPractice; i++) {
    practiceTrial.trial_duration = getTrialTime(2000);
    timelinePracticeBlock.push(practiceTrial);
}

const practiceBlock = {
    timeline: timelinePracticeBlock,
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "practice",
    },
};

// TEST TRIAL ----------------------------------------------------------------------------------------------------------
const testTrial = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: stim,
    stimulus_duration: 2000,
    trial_duration: 4500,  // Placeholder
    response_ends_trial: false,
    data: {
        trial_id: "stim",
        exp_stage: "test"
    },
    choices: [" "],
    on_finish: function() {
        appendData();
    }
}

const shortRTMessage = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<div class = centerbox><p class = block-text>We have detected a number of trials where the reaction " +
              "time was implausibly fast.  Please make sure that you hit the space bar <strong>once</strong>, as " +
              "quickly as possible <strong>only after the large X appears</strong>.</p></div>",
    timing_stim: 9000,
    timing_response: 0,
    timing_post_trial: 0,
    response_ends_trial: false,
    choices: 'none',
    data: {
        trial_id: "gap-message",
        exp_stage: "test"
    },
};

const conditionalMessageShortRT = {
    timeline: [shortRTMessage],
    conditional_function: () => {
        let data = jsPsych.data.get().last(1).values()[0];
        console.log(data);
        return false;
    }
}

let timelineTestBlocks = [];
for (let i = 0; i < numberOfBlocksTest; i++){
    getTrialTime(0);
    timelineTestBlocks.push(firstBlankTrial);
    for (let j = 0; j < numberOfTrialsPerBlockTest; j++){
        testTrial.trial_duration = getTrialTime(0);
        timelineTestBlocks.push(testTrial);
        timelineTestBlocks.push(conditionalMessageShortRT);
    }
    if (i !== numberOfBlocksTest - 1) {
        timelineTestBlocks.push(instructionsRest);
    }
}

const testBlocks = {
    timeline: timelineTestBlocks,
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "test",
    },
};