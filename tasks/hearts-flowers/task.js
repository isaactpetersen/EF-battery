// FUNCTIONS -----------------------------------------------------------------------------------------------------------
function createHeartFlowerStim(icon, side) {
    return `<div class="heart-flower-stim heart-flower-${side}">
    <img alt=${icon} src="tasks/hearts-flowers/${icon}.png" />
  </div>`;
}

function getCorrectResponse(icon, side) {
    if (icon === "heart") {
        if (side === "left") {
            return "A";
        } else {
            return "L";
        }
    } else {
        if (side === "left") {
            return "L";
        } else {
            return "A";
        }
    }
}

// PRACTICE TRIAL ------------------------------------------------------------------------------------------------------
const heartPracticeTrial = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: () => {
        return createHeartFlowerStim(
            jsPsych.evaluateTimelineVariable("icon"),
            jsPsych.evaluateTimelineVariable("side")
        );
    },
    choices: () => {
        if (jsPsych.evaluateTimelineVariable("side") === "left") {
            return ["A"]
        }
        if (jsPsych.evaluateTimelineVariable("side") === "right") {
            return ["L"]
        }
    },
    data: {
        task: "response",
        exp_stage: "practice_hearts",
        exp_id: "hearts-flowers",
        icon: jsPsych.evaluateTimelineVariable("icon"),
        side: jsPsych.evaluateTimelineVariable("side"),
        correct_response: () => {
            return getCorrectResponse(
                jsPsych.evaluateTimelineVariable("icon"),
                jsPsych.evaluateTimelineVariable("side")
            );
        },
    },
    save_trial_parameters: {
        stimulus: false,
    },
    on_finish: appendData,
};

const flowerPracticeTrial = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: () => {
        return createHeartFlowerStim(
            jsPsych.evaluateTimelineVariable("icon"),
            jsPsych.evaluateTimelineVariable("side")
        );
    },
    choices: () => {
        if (jsPsych.evaluateTimelineVariable("side") === "right") {
            return ["A"]
        }
        if (jsPsych.evaluateTimelineVariable("side") === "left") {
            return ["L"]
        }
    },
    data: {
        task: "response",
        exp_stage: "practice_flowers",
        exp_id: "hearts-flowers",
        icon: jsPsych.evaluateTimelineVariable("icon"),
        side: jsPsych.evaluateTimelineVariable("side"),
        correct_response: () => {
            return getCorrectResponse(
                jsPsych.evaluateTimelineVariable("icon"),
                jsPsych.evaluateTimelineVariable("side")
            );
        },
    },
    save_trial_parameters: {
        stimulus: false,
    },
    on_finish: appendData,
};

// TEST TRIAL ----------------------------------------------------------------------------------------------------------
const heartFlowerTrial = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: () => {
        return createHeartFlowerStim(
            jsPsych.evaluateTimelineVariable("icon"),
            jsPsych.evaluateTimelineVariable("side")
        );
    },
    choices: ["A", "L"],
    data: {
        task: "response",
        exp_stage: "test",
        exp_id: "hearts-flowers",
        icon: jsPsych.evaluateTimelineVariable("icon"),
        side: jsPsych.evaluateTimelineVariable("side"),
        correct_response: () => {
            return getCorrectResponse(
                jsPsych.evaluateTimelineVariable("icon"),
                jsPsych.evaluateTimelineVariable("side")
            );
        },
    },
    save_trial_parameters: {
        stimulus: false,
    },
    on_start: (trial) => {
        if (trial.data.phase === "test") {
            trial.trial_duration = response_window;
        }
    },
    on_finish: (data) => {
        appendData();
        data.response = data.response.toUpperCase();
        data.correct = data.response === data.correct_response;
        if (data.phase === "test") {
            const test_data = jsPsych.data
                .get()
                .filter({phase: "test", task: "response"});
            if (test_data.count() === 1) {
                data.switch = false;
            }
            if (test_data.count() > 1) {
                const last_trial = test_data.last(2).values()[0]; // need last(2) because last(1) is this trial.
                data.switch = last_trial.icon !== data.icon;
            }
        }
    },
};

// COMMON TRIALS -------------------------------------------------------------------------------------------------------
const heartFlowerGap = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: `<div class="heart-flower-stim"></div>`,
    choices: "NO_KEYS",
    trial_duration: blank_duration,
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        task: "blank",
    },
};

const heartFlowerFixation = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: `<div class="heart-flower-stim heart-flower-fixation">
    <p>+</p>
    </div>
  `,
    choices: "NO_KEYS",
    trial_duration: fixation_duration,
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        task: "fixation",
    },
};

const tooSlow = {
    timeline: [
        {
            type: jsPsychHtmlKeyboardResponseCustom,
            stimulus: `<div class="heart-flower-stim heart-flower-feedback">
        <p>Try to respond faster</p>
      </div>`,
            choices: "NO_KEYS",
            trial_duration: too_slow_duration,
            save_trial_parameters: {
                stimulus: false,
            },
            data: {
                task: "too_slow",
            },
        },
    ],
    conditional_function: () => {
        const last_trial = jsPsych.data
            .get()
            .filter({task: "response"})
            .last(1)
            .values()[0];
        return last_trial.rt === null;

    },
};

// TIMELINES -----------------------------------------------------------------------------------------------------------
const heartPracticeTimeline = {
    timeline: [heartFlowerFixation, heartFlowerGap, heartPracticeTrial],
    timeline_variables: heart_practice_trials,
    sample: {
        type: "fixed-repetitions",
        size: practice_reps_per_side,
    },
    data: {
        phase: "heart-practice",
    },
};

const flowerPracticeTimeline = {
    timeline: [heartFlowerFixation, heartFlowerGap, flowerPracticeTrial],
    timeline_variables: flower_practice_trials,
    sample: {
        type: "fixed-repetitions",
        size: practice_reps_per_side,
    },
    data: {
        phase: "flower-practice",
    },
};

const heartFlowerTimeline = {
    timeline: [
        heartFlowerFixation,
        heartFlowerGap,
        heartFlowerTrial,
        tooSlow,
    ],
    timeline_variables: trials,
    sample: {
        type: "fixed-repetitions",
        size: test_reps_per_item,
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