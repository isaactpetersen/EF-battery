// PRACTICE TRIAL ------------------------------------------------------------------------------------------------------
let practiceTrial = {
    type: jsPsychCategorizeHtmlCustom,  // Plugin to use
    stimulus: jsPsych.timelineVariable("stimulus"),  // Stimulus to use: the attribute "stimulus" from the trial
    stimulus_after_key_press: jsPsych.timelineVariable("stimulus_after_key_press"),  // Stimulus to use after there is a key press to have visual feedback
    choices: [" "],  // Keyboard choices: space bar only
    key_answer: jsPsych.timelineVariable("key_answer"),  // What is the good answer for a specific trial
    correct_text: message_correct,  // Feedback message to show if it's a correct answer
    incorrect_text: message_incorrect,  // Feedback message to show if it's an incorrect answer
    timeout_message: jsPsych.timelineVariable("timeout_message"),  // Feedback message to show if the trial duration has passed without any key press
    stimulus_duration: 750,  // Duration of the stimulus inside the trial
    trial_duration: 750,  // Duration of the trial
    feedback_duration: 1000,  // Duration of the feedback
    data: jsPsych.timelineVariable('data'),  // Data defined in the stimulus
    on_finish: appendData  // Add fullscreen info and current trial number to the data
}

// Practice loop
let practiceLoop = {
    timeline: [practiceTrial],  //The timeline of one trial
    timeline_variables: practice_trials,  // The trials to apply
    randomize_order: false
};

// TEST TRIAL ----------------------------------------------------------------------------------------------------------
// Trial
let mainTaskTrial = {
    type: jsPsychCategorizeHtmlCustom,
    stimulus: jsPsych.timelineVariable("stimulus"),
    stimulus_after_key_press: jsPsych.timelineVariable("stimulus_after_key_press"),
    choices: [" "],
    key_answer: jsPsych.timelineVariable("key_answer"),
    show_feedback: false,
    stimulus_duration: 750,
    trial_duration: 750,
    feedback_duration: 1000,
    post_trial_duration: 250,
    data: jsPsych.timelineVariable('data'),
    on_finish: appendData
}

// Experiment loop
let mainTaskLoop = {
    timeline: [mainTaskTrial],  //The timeline of one trial
    timeline_variables: main_trials,
    randomize_order: false
};

// UPLOAD DATA ---------------------------------------------------------------------------------------------------------
let uploadDataNode = {
    type: jsPsychCallFunction,
    async: true,
    func: uploadData,
}