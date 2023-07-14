// FULLSCREEN ON

var fullscreen_on = {
  type: jsPsychFullscreen,
  message: "This experiment must be passed in fullscreen mode.</br>"+
  "Please, do not press the ESC key during the experiment, and avoid all distractions.</br></br>"+
  "If you quit the fullscreen mode during the experiment, please press <b>F11</b> on Windows </br>"+
  "or the combination <b>Control-⌘-F</b> on Mac to come back to fullscreen.</br>",
  button_label: 'Continue',
  fullscreen_mode: true,
};


// GET BROWSER INFO AND URL VALUES
var get_browser_and_url_info = {
  type: jsPsychCallFunction,

  func: function(){

    var data = {browser_info: navigator.userAgent};

    //If the URL has a question mark in it
    if((window.location.href).indexOf('?') != -1) {

      // We get the part of the URL containing the variables (everything after the question mark)
      var queryString = window.location.href.split('?')[1]; 

      // We split this string by ampersand "&" symbol
      var variables = queryString.split("&");

      // For every variable
      for (i = 0; i < variables.length; i++) {
        
        var key = variables[i].split("=")[0]; // We get what is before the "=" symbol
        var value = variables[i].split("=")[1]; // We get what is after the "=" symbol
        value = decodeURIComponent(value); // We remove special characters if there are
        eval("data." + key + " = value"); // We assign it to data
      };
    
    jsPsych.data.addProperties(data);

    };
    
  },
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
  message: "This experiment must be passed in fullscreen mode.</br>"+
  "Please, do not press the ESC key during the experiment, and avoid all distractions.</br></br>"+
  "If you quit the fullscreen mode during the experiment, please press <b>F11</b> on Windows </br>"+
  "or the combination <b>Control-⌘-F</b> on Mac to come back to fullscreen.</br>",
  button_label: 'Continue',
  fullscreen_mode: false,
};