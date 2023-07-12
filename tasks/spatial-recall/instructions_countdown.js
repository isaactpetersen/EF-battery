// FULLSCREEN ON

var fullscreen_on = {
  type: jsPsychFullscreen,
  message: "This experiment must be completed in fullscreen mode.</br>"+
  "Please, do not press the ESC key during the experiment, and avoid all distractions.</br></br>"+
  "If you quit the fullscreen mode during the experiment, please press <b>F11</b> on Windows </br>"+
  "or the combination <b>Control-⌘-F</b> on Mac to come back to fullscreen.</br>",
  button_label: 'Continue',
  fullscreen_mode: true,
};


// INSTRUCTIONS
instructions_text = "<p>In this task, you will see a grid of squares that will flash blue one at a time.</p>"+
"<p>Your goal is to remember the order in which the squares flashed blue.</p>"+
"<p>At the end of each trial, press the tiles that flashed in the <b>same order</b> as they were presented to you.</p>";

timeline_instructions = [];

var i;
for (i = time_instructions; i > 0; i--) {
  const instructions_1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text+
    "<p style='color:#888888'>Press Enter to continue.</p>"+
    "<p><b>"+i.toString()+"</b></p>",
    choices: "NO_KEYS",
    trial_duration: 1000,
  };
  timeline_instructions.push(instructions_1);
};

const instructions_1 = {
  type: jsPsychHtmlKeyboardResponseCustom,
  stimulus: instructions_text+
  "<p style='color:#ff0000'><b>Press Enter to continue</b></p><p>&nbsp;</p></div>",
  choices: ["Enter"]
};
timeline_instructions.push(instructions_1);

instructions_text = "<p>Do your best to memorize the order, but do not write them down</p>"+
"<p>or use any other external tool to help you remember.</p>"+
'<p>If you make a mistake, click the "Clear" button to erase your entries.</p>';

var i;
for (i = time_instructions; i > 0; i--) {
  const instructions_2 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text+
    "<p style='color:#888888'>When you're ready, press Enter to get started.</p>"+
    "<p><b>"+i.toString()+"</b></p>",
    choices: "NO_KEYS",
    trial_duration: 1000,
  };
  timeline_instructions.push(instructions_2);
};

const instructions_2 = {
  type: jsPsychHtmlKeyboardResponseCustom,
  stimulus: instructions_text+
  "<p style='color:#ff0000'><b>When you're ready, press Enter to get started.</b></p><p>&nbsp;</p></div>",
  choices: ["Enter"]
};
timeline_instructions.push(instructions_2);

const instructions = {
  timeline: timeline_instructions,
};

// END SCREEN

const end_screen = {
  type: jsPsychHtmlKeyboardResponseCustom,
  stimulus: "<div class='instructions'>"+
  "<p>This task is complete.</p>"+
  "<p>Press Enter to end the experiment.</p></div>",
  choices: ["Enter"],
  save_trial_parameters: {
    stimulus: false,
  },
};

// FULLSCREEN OFF

var fullscreen_off = {
  type: jsPsychFullscreen,
  message: "This experiment must be completed in fullscreen mode.</br>"+
  "Please, do not press the ESC key during the experiment, and avoid all distractions.</br></br>"+
  "If you quit the fullscreen mode during the experiment, please press <b>F11</b> on Windows </br>"+
  "or the combination <b>Control-⌘-F</b> on Mac to come back to fullscreen.</br>",
  button_label: 'Continue',
  fullscreen_mode: false,
};