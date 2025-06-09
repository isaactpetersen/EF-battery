/**
 * Returns a random number from an exponential distribution, times it by 1000 to get a time in milliseconds
 * (max. 4500 ms), and adds a delay if specified.
 * @returns {number} A random number from an exponential distribution.
 */
function getTrialTime(delay = 0) {
    return Math.min(-Math.log(Math.random()) * 1000 + delay, maxTimeBeforeStimulus);
}

// PRACTICE TRIAL ------------------------------------------------------------------------------------------------------
// const firstBlankTrial = {
//     type: jsPsychHtmlKeyboardResponseCustom,
//     stimulus: "",
//     stimulus_duration: 0,  // Placeholder
//     trial_duration: minTimeBeforeStimulus,  // Placeholder
//     response_ends_trial: false,
//     data: {
//         trial_id: "stim-0",
//         exp_stage: "time-before-first-stim"
//     },
//     choices: [" "],
//     on_finish: appendData
// }

const practiceTrial = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: stim,
    time_before_stimulus: 0,  // Placeholder
    stimulus_duration: durationStimulus,
    trial_duration: durationStimulus,  // Placeholder
    response_ends_trial: "while_stimulus",
    data: {
        trial_id: "stim",
        exp_stage: "practice",
        timeBeforeStimulus: 0
    },
    choices: [" "],
    on_finish: addTrialVariables
};

const conditionalMessageShortRTPractice = {
    timeline: timelineTooFastPractice,
    conditional_function: () => {
        let data = jsPsych.data.get().last(1).values()[0];
        //console.log(data["rt"], data["time_before_stimulus"]);
        if (data["rt"] <= thresholdTrialsBelowRT) {
            trialsBelowRT = 0;
            return true;
        }
        return false;
    }
}

function addTrialVariables() {
    let data = jsPsych.data.get().last(1).values()[0];
    data["rt"] -= data["timeBeforeStimulus"];
    data["answered"] = data["response"] === " ";
    if (!data["answered"]) {
        data.rt = null;
        trialsNoResponse += 1;
    }
    else if (data.rt < minAcceptableTimeRT && data.phase !== "practice") {
        trialsBelowRT += 1;
    }
    data["trialsBelowRT"] = trialsBelowRT;
    data["trialsNoResponse"] = trialsNoResponse;
    appendData();
}

let timelinePracticeBlock = [];
for (let i = 0; i < numberOfTrialsPractice; i++) {
    let timeBeforeStimulus = getTrialTime(minTimeBeforeStimulus);
    practiceTrial.time_before_stimulus = timeBeforeStimulus;
    practiceTrial.trial_duration = timeBeforeStimulus + durationStimulus;
    practiceTrial.data.timeBeforeStimulus = timeBeforeStimulus;
    timelinePracticeBlock.push(practiceTrial);
    timelinePracticeBlock.push(conditionalMessageShortRTPractice);
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
    time_before_stimulus: 0,  // Placeholder
    stimulus_duration: durationStimulus,
    trial_duration: durationStimulus,  // Placeholder
    response_ends_trial: "while_stimulus",
    data: {
        trial_id: "stim",
        exp_stage: "test",
        timeBeforeStimulus: 0
    },
    choices: [" "],
    on_finish: addTrialVariables
}

const conditionalMessageShortRT = {
    timeline: timelineTooFast,
    conditional_function: () => {
        if (trialsBelowRT === thresholdTrialsBelowRT) {
            trialsBelowRT = 0;
            return true;
        }
        return false;
    }
}

const conditionMessageNoResponse = {
    timeline: timelineNoResponse,
    conditional_function: () => {
        if (trialsNoResponse === thresholdTrialsNoResponse) {
            trialsNoResponse = 0;
            return true;
        }
        return false;
    }
}

let timelineTestBlocks = [];
for (let i = 0; i < numberOfBlocksTest; i++){
    for (let j = 0; j < numberOfTrialsPerBlockTest; j++){
        let timeBeforeStimulus = getTrialTime(minTimeBeforeStimulus);
        testTrial.time_before_stimulus = timeBeforeStimulus;
        testTrial.trial_duration = timeBeforeStimulus + durationStimulus;
        testTrial.data.timeBeforeStimulus = timeBeforeStimulus;
        timelineTestBlocks.push(testTrial);
        timelineTestBlocks.push(conditionalMessageShortRT);
        timelineTestBlocks.push(conditionMessageNoResponse);
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