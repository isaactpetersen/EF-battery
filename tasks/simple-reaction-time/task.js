// PRACTICE TRIAL ------------------------------------------------------------------------------------------------------
const practiceTrialBlank = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "",
    stimulus_duration: jsPsych.timelineVariable("time_before_stimulus"),
    trial_duration: jsPsych.timelineVariable("time_before_stimulus"),
    data: jsPsych.timelineVariable("data"),
    response_ends_trial: false,
    choices: [" "],
};

const practiceTrialStim = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: stim,
    stimulus_duration: durationStimulus,
    trial_duration: durationStimulus,
    data: jsPsych.timelineVariable("data"),
    response_ends_trial: true,
    choices: [" "],
    on_finish: addTrialVariables
};

const practiceTrial = {
    timeline: [practiceTrialBlank, practiceTrialStim],
}

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
        return (data["respTooEarly"] && data["answered"]);
    }
}

function addTrialVariables() {
    let data_trial = jsPsych.data.get().last(2)
    let data_blank = data_trial.values()[0];
    let data_stim = data_trial.values()[1];

    data_blank["trialPhase"] = "blank";
    data_stim["trialPhase"] = "stim";

    data_stim["respTooEarly"] = false;
    data_stim["respBeforeStim"] = false;
    data_stim["answered"] = false;
    data_stim["trialOK"] = false;

    data_stim["phaseAnswered"] = "none";

    if (data_blank["rt"] === -1 || data_blank["rt"] === null) {
        data_blank["rt"] = null;
        if (data_stim["rt"] === -1|| data_stim["rt"] === null) {
            data_stim["rt"] = null;
            if (data_stim.phase !== "practice") {
                trialsNoResponse += 1;
            }
            data_stim["phaseAnswered"] = "none";
        }
        else if (data_stim["rt"] <= minAcceptableTimeRT && data_stim.phase !== "practice") {
            trialsBelowRT += 1;
            data_stim["answered"] = true;
            data_stim["phaseAnswered"] = "stim, too early";
            data_stim["respTooEarly"] = true;
        } else {
            data_stim["answered"] = true;
            data_stim["phaseAnswered"] = "stim, OK";
            data_stim["trialOK"] = true;
        }
    } else {
        if (data_stim.phase !== "practice") {
            trialsBelowRT += 1;
        }
        data_stim["respBeforeStim"] = true;
        data_stim["respTooEarly"] = true;
        data_stim["phaseAnswered"] = "blank";
        data_stim["answered"] = true;
        data_stim["rt"] = null;
    }

    // console.log(data_stim);
    // console.log(data_stim.phase);
    // console.log(trialsNoResponse);
    // console.log(trialsBelowRT);

    data_stim["trialsBelowRT"] = trialsBelowRT;
    data_stim["trialsNoResponse"] = trialsNoResponse;
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
const testTrialBlank = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "", // Placeholder
    stimulus_duration: jsPsych.timelineVariable("time_before_stimulus"),
    trial_duration: jsPsych.timelineVariable("time_before_stimulus"),
    data: jsPsych.timelineVariable("data"),
    response_ends_trial: false,
    choices: [" "],
}

const testTrialStim = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: stim,
    stimulus_duration: durationStimulus,
    trial_duration: durationStimulus,
    data: jsPsych.timelineVariable("data"),
    response_ends_trial: true,
    choices: [" "],
    on_finish: addTrialVariables
}

const testTrial = {
    timeline: [testTrialBlank, testTrialStim],
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

let timelineTestBlock = [];
timelineTestBlock.push(testTrial);
timelineTestBlock.push(conditionMessageNoResponse);
timelineTestBlock.push(conditionalMessageShortRT);

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