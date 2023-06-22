var getLastTrialKeyPressed = function() {
    //return jsPsych.data.getLastTrialData().select('response').values[0];
    return jsPsych.data.getLastTrialData().select('data');
}

// PRACTICE TRIALS

//Trial
var practice_trial = {
    type: jsPsychCategorizeHtmlCustom, // Plugin to use
    stimulus: jsPsych.timelineVariable("stimulus"), // Stimulus to use: the attribute "stimulus" from the trial
    stimulus_after_key_press: jsPsych.timelineVariable("stimulus_after_key_press"), // Stimulus to use after there is a key press to have visual feedback
    choices: [" "], // Keyboard choices: space bar only
    key_answer: jsPsych.timelineVariable("key_answer"), // What is the good answer for a specific trial
    correct_text: message_correct, // Feedback message to show if it's a correct answer
    incorrect_text: message_incorrect, // Feedback message to show if it's an incorrect answer
    timeout_message: jsPsych.timelineVariable("timeout_message"), // Feedback message to show if the trial duration has passed without any key press
    stimulus_duration: 1500, // Duration of the stimulus inside the trial
    trial_duration: 1500, // Duration of the trial
    feedback_duration: 1000, // Duration of the feedback
}

//Practice loop
var practice_loop = {
	timeline: [practice_trial], //The timeline of one trial
	timeline_variables: practice_trials, // The trials to apply
	randomize_order: false
};

// MAIN TASK TRIALS

//Trial
var main_task_trial = {
    type: jsPsychCategorizeHtmlCustom,
    stimulus: jsPsych.timelineVariable("stimulus"),
    stimulus_after_key_press: jsPsych.timelineVariable("stimulus_after_key_press"),
    choices: [" "],
    key_answer: jsPsych.timelineVariable("key_answer"),
    show_feedback: false,
    stimulus_duration: 1500,
    trial_duration: 1500,
    feedback_duration: 1000,
}

//Time between two trials
var post_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "",
    choices: "NO_KEYS",
    trial_duration: 500,
}

//Experiment loop
var main_task_loop = {
	timeline: [main_task_trial, post_trial], //The timeline of one trial: trial + post trial
	timeline_variables: main_trials,
	randomize_order: false
};