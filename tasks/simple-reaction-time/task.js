

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
    time_before_stimulus: jsPsych.timelineVariable("time_before_stimulus"),  // Placeholder
    stimulus_duration: durationStimulus,
    trial_duration: jsPsych.timelineVariable("trial_duration"),  // Placeholder
    data: jsPsych.timelineVariable("data"),
    choices: [" "],
    on_finish: addTrialVariables
};

const conditionalMessageNoResponsePractice = {
    timeline: timelineNoResponsePractice,
    conditional_function: () => {
        let data = jsPsych.data.get().last(1).values()[0];
        return !data["answered"];
    }
}

const conditionalMessageShortRTPractice = {
    timeline: timelineTooFastPractice,
    conditional_function: () => {
        let data = jsPsych.data.get().last(1).values()[0];
        return data.rt < minAcceptableTimeRT;
    }
}

function addTrialVariables() {
    let data = jsPsych.data.get().last(1).values()[0];
    data["rt"] -= data["timeBeforeStimulus"];
    data["answered"] = data["response"] === " ";
    if (!data["answered"]) {
        data.rt = null;
        if (data.phase !== "practice") {
            trialsNoResponse += 1;
        }
    }
    else if (data.rt !== null && data.rt < minAcceptableTimeRT && data.phase !== "practice") {
        console.log("Too fast!");
        trialsBelowRT += 1;
    }

    data["respBeforeStim"] = data["rt"] !== null && data["rt"] < 0;

    data["trialsBelowRT"] = trialsBelowRT;
    data["trialsNoResponse"] = trialsNoResponse;
    appendData();
}

let timelinePracticeBlock = [];
timelinePracticeBlock.push(practiceTrial);
timelinePracticeBlock.push(conditionalMessageNoResponsePractice);
timelinePracticeBlock.push(conditionalMessageShortRTPractice);

const practiceBlock = {
    timeline: timelinePracticeBlock,
    timeline_variables: practiceStimuliBlockStimuli,
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
    time_before_stimulus: jsPsych.timelineVariable("time_before_stimulus"),  // Placeholder
    stimulus_duration: durationStimulus,
    trial_duration: jsPsych.timelineVariable("trial_duration"),  // Placeholder
    data: jsPsych.timelineVariable("data"),
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

let timelineTestBlock = [];
timelineTestBlock.push(testTrial);
timelineTestBlock.push(conditionalMessageShortRT);
timelineTestBlock.push(conditionMessageNoResponse);

let timelineTestBlocks = [];
for (let i = 0; i < numberOfBlocksTest; i++) {
    let testBlock = {
        timeline: timelineTestBlock,
        timeline_variables: testBlocksStimuli[i],
        save_trial_parameters: {
            stimulus: false,
        },
        data: {
            phase: "test",
        },
    };
    timelineTestBlocks.push(testBlock);
    if (i !== numberOfBlocksTest - 1) {
        timelineTestBlocks.push(instructionsRest);
    }
}

const testBlocks = {
    timeline: timelineTestBlocks,
}

// UPLOAD DATA ---------------------------------------------------------------------------------------------------------
let uploadDataNode = {
    type: jsPsychCallFunction,
    async: true,
    func: uploadData,
}