var getLastTrialKeyPressed = function() {
    //return jsPsych.data.getLastTrialData().select('response').values[0];
    return jsPsych.data.getLastTrialData().select('data');
}

// PRACTICE TRIALS

var current_trial = 1

var reset_block = {
  type: jsPsychCallFunction,
  func: function() {
    current_trial = 1
  },
}

var appendData = function(data) {
  //var isFullScreen = document.mozFullScreen || document.webkitIsFullScreen || (!window.screenTop && !window.screenY)
  var isAtMaxWidth = (screen.width - window.innerWidth) === 0;
  var isAtMaxHeight = (screen.height - window.innerHeight) === 0;
  var isFullScreen = (isAtMaxWidth && isAtMaxHeight);
  console.log(screen.width, window.innerWidth, isAtMaxWidth, screen.height, window.innerHeight, isAtMaxHeight, isFullScreen);

  jsPsych.data.addDataToLastTrial({
    trial_num: current_trial,
    full_screen: isFullScreen,
  })
  current_trial = current_trial + 1
}

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
    stimulus_duration: 750, // Duration of the stimulus inside the trial
    trial_duration: 750, // Duration of the trial
    feedback_duration: 1000, // Duration of the feedback
    data: jsPsych.timelineVariable('data'), // Data defined in the stimulus
    on_finish: appendData
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
    stimulus_duration: 750,
    trial_duration: 750,
    feedback_duration: 1000,
    post_trial_duration: 250,
    data: jsPsych.timelineVariable('data'),
    on_finish: appendData
}

//Experiment loop
var main_task_loop = {
	timeline: [main_task_trial], //The timeline of one trial
	timeline_variables: main_trials,
	randomize_order: false
};