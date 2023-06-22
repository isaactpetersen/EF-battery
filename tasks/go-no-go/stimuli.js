//We randomly define if the user should focus on orange or blue squares, to counterbalance
var stims = jsPsych.randomization.shuffle([["orange", "stim1"], ["blue", "stim2"]]);
var message_correct = "<b><div style='color:green; font-size:30px'>Correct!</div></b>";
var message_incorrect = "<b><div style='color:red; font-size:30px''>Incorrect</div></b>";

//We define the practice stimuli
//Go condition
var practice_stimuli = [{
  //The stimulus: a big square of one of the two colors
  stimulus: "<div class = centerbox><div id=" + stims[0][1] + "></div></div>",
  stimulus_after_key_press: "<div class = centerbox><div id=" + stims[0][1] + "-responded></div></div>",
  data: {
    trial_id: "Practice",
    condition: "Go",
    correct_response: " "
  },
  timeout_message: message_incorrect,
  condition: "Go",
  key_answer: " "
},
//No-Go condition
{
  //The stimulus: a big square of the other color
  stimulus: "<div class = centerbox><div id=" + stims[1][1] + "></div></div>",
  stimulus_after_key_press: "<div class = centerbox><div id=" + stims[1][1] + "-responded></div></div>",
  data: {
    trial_id: "Practice",
    condition: "No-Go",
    correct_response: undefined
  },
  timeout_message: message_correct,
  condition: "No-Go",
  key_answer: "NO_KEYS"
}];