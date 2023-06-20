//We randomly define if the user should focus on orange or blue squares, to counterbalance
var stims = jsPsych.randomization.shuffle([["orange", "stim1"],["blue", "stim2"]])

//We define the practice stimuli
//Go condition
var practice_stimuli = [{
  //The stimulus: a big square of one of the two colors
  stimulus: "<div class = centerbox><div id=" + stims[0][1] + "></div></div>",
  data: {
    trial_id: "Practice",
    condition: "Go",
    correct_response: " "
  },
  timeout_message: "<div style='color:red'>Incorrect</div>",
  condition: "Go",
  key_answer: " "
},
//No-Go condition
{
  //The stimulus: a big square of the other color
  stimulus: "<div class = centerbox><div id=" + stims[1][1] + "></div></div>",
  data: {
    trial_id: "Practice",
    condition: "No-Go",
    correct_response: undefined
  },
  timeout_message: "<div style='color:green'>Correct!</div>",
  condition: "No-Go",
  key_answer: "NO_KEYS"
}];