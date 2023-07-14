var current_trial = 1;
var false_in_a_row = 0;

var appendData = function(data) {
  //var isFullScreen = document.mozFullScreen || document.webkitIsFullScreen || (!window.screenTop && !window.screenY)
  var isAtMaxWidth = (screen.width - window.innerWidth) === 0;
  var isAtMaxHeight = (screen.height - window.innerHeight) === 0;
  var isFullScreen = (isAtMaxWidth && isAtMaxHeight);
  jsPsych.data.addDataToLastTrial({
    full_screen: isFullScreen,
  });
  if ("sequence" in jsPsych.data.getLastTrialData().trials[0]){
    jsPsych.data.addDataToLastTrial({
      trial_num: current_trial,
    })
    current_trial = current_trial + 1
  };
  
}

timeline_recall = [];

// var screen_check = {
//     type: jsPsychScreenCheck,
//     min_width: 258,
//     min_height: 364
//   };
// timeline_recall.push(screen_check);

var fixation_cross = {
  type: jsPsychHtmlKeyboardResponseCustom,
  stimulus: '<p style="font-size: 48px;">+</p>',
  choices: 'NO_KEYS',
  trial_duration: 1200,
  };
timeline_recall.push(fixation_cross);

var spatial_recall = {
  type: jsPsychSpatialRecall,
  grid_size: 4,
  sequence: jsPsych.timelineVariable('sequence'),
  backwards: false,
  data: {
    exp_id: "spatial-recall",
    exp_stage: "test",
  },
};
timeline_recall.push(spatial_recall);

var stopping_function = {
  type: jsPsychCallFunction,
  func: function() {
    if (!jsPsych.data.getLastTrialData().values()[0].correct){ //We check if the last trial was correct
      false_in_a_row += 1; // If it wasn't, we add 1 to "false_in_a_row"
    } else {
      false_in_a_row = 0; // If it was, we reset "false_in_a_row"
    };
    if (false_in_a_row == limit_error_to_end_task){ // If we reach the limit (2 false in a row), we end the timeline
      jsPsych.endCurrentTimeline();
    };
  },
};
timeline_recall.push(stopping_function);

var recall_forwards = {
  timeline: timeline_recall,
  timeline_variables: stimuli,
  on_finish: appendData,
};