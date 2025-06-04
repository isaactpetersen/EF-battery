/**
 * Returns a random number from an exponential distribution, times it by 1000 to get a time in milliseconds
 * (max. 4500 ms), and adds a delay if specified.
 * @returns {number} A random number from an exponential distribution.
 */
function getTrialTime(delay = 0) {
    return Math.min(-Math.log(Math.random()) * 1000 + delay, maxTimeBeforeStimulus)
}

// PRACTICE TRIAL ------------------------------------------------------------------------------------------------------
const firstBlankTrial = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "",
    stimulus_duration: 0,  // Placeholder
    trial_duration: minTimeBeforeStimulus,  // Placeholder
    response_ends_trial: false,
    data: {
        trial_id: "stim-0",
        exp_stage: "practice"
    },
    choices: [" "],
    on_finish: appendData
}

const practiceTrial = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: stim,
    stimulus_duration: minTimeBeforeStimulus,
    trial_duration: maxTimeBeforeStimulus,  // Placeholder
    response_ends_trial: false,
    data: {
        trial_id: "stim",
        exp_stage: "practice"
    },
    choices: [" "],
    on_finish: appendData
};

let timelinePracticeBlock = [];
getTrialTime(minTimeBeforeStimulus);
timelinePracticeBlock.push(firstBlankTrial);
for (let i = 0; i < numberOfTrialsPractice; i++) {
    practiceTrial.trial_duration = getTrialTime(minTimeBeforeStimulus);
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
    stimulus_duration: minTimeBeforeStimulus,
    trial_duration: maxTimeBeforeStimulus,  // Placeholder
    response_ends_trial: false,
    data: {
        trial_id: "stim",
        exp_stage: "test"
    },
    choices: [" "],
    on_finish: appendData
}

const shortRTMessage = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<p>We have detected a number of trials where the reaction time was implausibly fast.</p>" +
              "<p>Please make sure that you hit the space bar <strong>once</strong>, as " +
              "quickly as possible <strong>only after the large X appears</strong>.</p></div>",
    stimulus_duration: timeInstructionsTooFast,
    trial_duration: timeInstructionsTooFast,
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
        if (data.rt < minAcceptableTimeRT) {
            trialsBelowRT += 1;
        }
        if (trialsBelowRT === thresholdTrialsBelowRT) {
            trialsBelowRT = 0;
            return true;
        }
        return false;
    }
}

let timelineTestBlocks = [];
for (let i = 0; i < numberOfBlocksTest; i++){
    getTrialTime(minTimeBeforeStimulus);
    timelineTestBlocks.push(firstBlankTrial);
    for (let j = 0; j < numberOfTrialsPerBlockTest; j++){
        testTrial.trial_duration = getTrialTime(minTimeBeforeStimulus);
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

// UPLOAD DATA ---------------------------------------------------------------------------------------------------------
let uploadDataNode = {
    type: jsPsychCallFunction,
    async: true,
    func: uploadData,
}