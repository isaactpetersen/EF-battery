let current_trial = 1;

let reset_block = {
    type: jsPsychCallFunction,
    func: function () {
        current_trial = 1
    },
}

let appendData = function (data) {
    //var isFullScreen = document.mozFullScreen || document.webkitIsFullScreen || (!window.screenTop && !window.screenY)
    let isAtMaxWidth = (screen.width - window.innerWidth) === 0;
    let isAtMaxHeight = (screen.height - window.innerHeight) === 0;
    let isFullScreen = (isAtMaxWidth && isAtMaxHeight);
    jsPsych.data.addDataToLastTrial({
        trial_num: current_trial,
        full_screen: isFullScreen,
    })
    current_trial = current_trial + 1
}

const heart_practice_trial = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: () => {
        return createHeartFlowerStim(
            jsPsych.timelineVariable("icon"),
            jsPsych.timelineVariable("side")
        );
    },
    choices: () => {
        if (jsPsych.timelineVariable("side") === "left") {
            return ["a"]
        }
        if (jsPsych.timelineVariable("side") === "right") {
            return ["l"]
        }
    },
    data: {
        task: "response",
        exp_stage: "practice_hearts",
        exp_id: "hearts-flowers",
        icon: jsPsych.timelineVariable("icon"),
        side: jsPsych.timelineVariable("side"),
        correct_response: () => {
            return getCorrectResponse(
                jsPsych.timelineVariable("icon"),
                jsPsych.timelineVariable("side")
            );
        },
    },
    save_trial_parameters: {
        stimulus: false,
    },
    on_finish: appendData,
};

const flower_practice_trial = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: () => {
        return createHeartFlowerStim(
            jsPsych.timelineVariable("icon"),
            jsPsych.timelineVariable("side")
        );
    },
    choices: () => {
        if (jsPsych.timelineVariable("side") === "right") {
            return ["a"]
        }
        if (jsPsych.timelineVariable("side") === "left") {
            return ["l"]
        }
    },
    data: {
        task: "response",
        exp_stage: "practice_flowers",
        exp_id: "hearts-flowers",
        icon: jsPsych.timelineVariable("icon"),
        side: jsPsych.timelineVariable("side"),
        correct_response: () => {
            return getCorrectResponse(
                jsPsych.timelineVariable("icon"),
                jsPsych.timelineVariable("side")
            );
        },
    },
    save_trial_parameters: {
        stimulus: false,
    },
    on_finish: appendData,
};

const heart_flower_trial = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: () => {
        return createHeartFlowerStim(
            jsPsych.timelineVariable("icon"),
            jsPsych.timelineVariable("side")
        );
    },
    choices: ["a", "l"],
    data: {
        task: "response",
        exp_stage: "test",
        exp_id: "hearts-flowers",
        icon: jsPsych.timelineVariable("icon"),
        side: jsPsych.timelineVariable("side"),
        correct_response: () => {
            return getCorrectResponse(
                jsPsych.timelineVariable("icon"),
                jsPsych.timelineVariable("side")
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
        appendData(data);
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

const heart_flower_gap = {
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

const heart_flower_fixation = {
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

const too_slow = {
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

const heart_practice_timeline = {
    timeline: [heart_flower_fixation, heart_flower_gap, heart_practice_trial],
    timeline_variables: heart_practice_trials,
    sample: {
        type: "fixed-repetitions",
        size: practice_reps_per_side,
    },
    data: {
        phase: "heart-practice",
    },
};

const flower_practice_timeline = {
    timeline: [heart_flower_fixation, heart_flower_gap, flower_practice_trial],
    timeline_variables: flower_practice_trials,
    sample: {
        type: "fixed-repetitions",
        size: practice_reps_per_side,
    },
    data: {
        phase: "flower-practice",
    },
};

const heart_flower_timeline = {
    timeline: [
        heart_flower_fixation,
        heart_flower_gap,
        heart_flower_trial,
        too_slow,
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

function createHeartFlowerStim(icon, side) {
    return `<div class="heart-flower-stim heart-flower-${side}">
    <img src="tasks/hearts-flowers/${icon}.png" />
  </div>`;
}

function getCorrectResponse(icon, side) {
    if (icon === "heart") {
        if (side === "left") {
            return "a";
        } else {
            return "l";
        }
    } else {
        if (side === "left") {
            return "l";
        } else {
            return "a";
        }
    }
}
