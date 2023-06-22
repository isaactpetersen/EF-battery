var getLastTrialKeyPressed = function() {
    //return jsPsych.data.getLastTrialData().select('response').values[0];
    return jsPsych.data.getLastTrialData().select('data');
}

var practice_block = {
  type: jsPsychCategorizeHtmlCustom,
  stimulus: jsPsych.timelineVariable("stimulus"),
  stimulus_after_key_press: jsPsych.timelineVariable("stimulus_after_key_press"),
  choices: [" "],
  key_answer: jsPsych.timelineVariable("key_answer"),
  correct_text: message_correct,
  incorrect_text: message_incorrect,
  timeout_message: jsPsych.timelineVariable("timeout_message"),
  show_feedback_on_timeout: false,
  stimulus_duration: 1500,
  trial_duration: 1500,
  feedback_duration: 1000,
}

var practice_loop = {
	timeline: [practice_block],
	timeline_variables: practice_trials,
	randomize_order: true
};