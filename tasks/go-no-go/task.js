var getLastTrialKeyPressed = function() {
    //return jsPsych.data.getLastTrialData().select('response').values[0];
    return jsPsych.data.getLastTrialData().select('data');
}

var practice_block = {
  type: jsPsychCategorizeHtml,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: [" "],
  key_answer: jsPsych.timelineVariable("key_answer"),
  correct_text: "<div style='color:green'>Correct!</div>",
  incorrect_text: "<div style='color:red'>Incorrect</div>",
  timeout_message: jsPsych.timelineVariable("timeout_message"),
  show_feedback_on_timeout: false,
  stimulus_duration: 3000,
  trial_duration: 3000,
  feedback_duration: 1000,
  show_stim_with_feedback: false,
}

var practice_loop = {
	timeline: [practice_block],
	timeline_variables: practice_stimuli,
	randomize_order: true
};