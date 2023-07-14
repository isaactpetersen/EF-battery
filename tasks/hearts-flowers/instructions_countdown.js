// FULLSCREEN ON

var fullscreen_on = {
  type: jsPsychFullscreen,
  message: "This task must be completed in fullscreen mode.</br>"+
  "Please, do not press the ESC key during the task, and avoid all distractions.</br></br>"+
  "If you quit the fullscreen mode during the task, please press <b>F11</b> on Windows </br>"+
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

// CURSOR OFF

var cursor_off = {
    type: jsPsychCallFunction,
    func: function() {
        document.body.style.cursor= "none";
    }
}

// HEART INSTRUCTIONS

timeline_heart_instructions = [];

const heart_instructions_1 = {
  type: jsPsychHtmlKeyboardResponseCustom,
  stimulus: "<div class='instructions'>Welcome to this task. It will take around 5 minutes.</p>"+
  "Press <strong>Enter</strong> to begin.</div>",
  choices: ["Enter"],
};
timeline_heart_instructions.push(heart_instructions_1);

instructions_text = "<div class='instructions'>"+
"<p>In this task, you will use the <b>A</b> and <b>L</b> keys on your keyboard.</p>"+
"<p>Please rest your <b>left index finger</b> on the A key and your <b>right index finger</b> on the "+
"L key.</p>"+
"<img src='tasks/hearts-flowers/keyboard.png' width='50%'/>"+
"<p></p></div>";

var i;
for (i = time_heart_instructions_2; i > 0; i--) {
  const heart_instructions_2 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text+
    "<p style='color:#888888'>Press either key to continue.</p>"+
    "<p><b>"+i.toString()+"</b></p>",
    choices: "NO_KEYS",
    trial_duration: 1000,
  };
  timeline_heart_instructions.push(heart_instructions_2);
};

const heart_instructions_2 = {
  type: jsPsychHtmlKeyboardResponseCustom,
  stimulus: instructions_text+
  "<p style='color:#ff0000'><b>Press either key to continue.</b></p><p>&nbsp;</p>",
  choices: ["a", "l"]
};
timeline_heart_instructions.push(heart_instructions_2);

instructions_text = "<div class='instructions'><div class='instructions-float'>"+
"<p>In this task, you're going to see a number of <b>hearts</b> and <b>flowers</b> in the box "+
"below.</p>";

var i;
for (i = time_heart_instructions_3; i > 0; i--) {
  const heart_instructions_3 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text+
    "<p style='color:#888888'>Press Enter to continue</p>"+
    "<p><b>"+i.toString()+"</b></p></div>"+
    "<div class='heart-flower-stim'></div></div>",   
    choices: "NO_KEYS",
    trial_duration: 1000,
  };
  timeline_heart_instructions.push(heart_instructions_3);
};

const heart_instructions_3 = {
  type: jsPsychHtmlKeyboardResponseCustom,
  stimulus: instructions_text+
  "<p style='color:#ff0000'><b>Press Enter to continue</b></p><p>&nbsp;</p></div>"+
  "<div class='heart-flower-stim'></div></div>",
  choices: ["Enter"]
};
timeline_heart_instructions.push(heart_instructions_3);

instructions_text = "<div class='instructions'><div class='instructions-float'>"+
"<p>When you see a <b>heart</b>, press the key that is on the <b>same</b> side as the heart.</p>";

var i;
for (i = time_heart_instructions_4; i > 0; i--) {
  const heart_instructions_4 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text+
    "<p style='color:#888888'>Here, you should press the <b>A</b> key.</p>"+
    "<p><b>"+i.toString()+"</b></p></div>"+
    "<div class='heart-flower-stim heart-flower-left'><img src='tasks/hearts-flowers/heart.png'/>"+
    "</div></div>",
    choices: "NO_KEYS",
    trial_duration: 1000,
  };
  timeline_heart_instructions.push(heart_instructions_4);
};

const heart_instructions_4 = {
  type: jsPsychHtmlKeyboardResponseCustom,
  stimulus: instructions_text+
  "<p><b>Here, you should press the <b>A</b> key.</b></p><p>&nbsp;</p></div>"+
  "<div class='heart-flower-stim heart-flower-left'><img src='tasks/hearts-flowers/heart.png'/>"+
  "</div></div>",
  choices: ["a"]
};
timeline_heart_instructions.push(heart_instructions_4);

const heart_instructions_5 = {
  type: jsPsychHtmlKeyboardResponseCustom,
  stimulus: "<div class='instructions'><div class='instructions-float'>"+
  "<p>Now, you should press the <b>L</b> key.</p></div>"+
  "<div class='heart-flower-stim heart-flower-right'><img src='tasks/hearts-flowers/heart.png'/>"+
  "</div></div>",
  choices: ["l"],
};
timeline_heart_instructions.push(heart_instructions_5);

instructions_text = "<div class='instructions'><div class='instructions-float'>"+
"<p>Very good. Try it a few more times—it goes pretty quickly.</p>"+
"<p><b>Please go as fast as you can!</b></p>";

var i;
for (i = time_heart_instructions_6; i > 0; i--) {
  const heart_instructions_6 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text+
    "<p style='color:#888888'>Press Enter to continue.</p>"+
    "<p><b>"+i.toString()+"</b></p></div>"+
    "<div class='heart-flower-stim'></div></div>",   
    choices: "NO_KEYS",
    trial_duration: 1000,
  };
  timeline_heart_instructions.push(heart_instructions_6);
};

const heart_instructions_6 = {
  type: jsPsychHtmlKeyboardResponseCustom,
  stimulus: instructions_text+
  "<p style='color:#ff0000'><b>Press Enter to continue</b></p><p>&nbsp;</p></div>"+
  "<div class='heart-flower-stim'></div></div>",
  choices: ["Enter"]
};
timeline_heart_instructions.push(heart_instructions_6);

const heart_instructions = {
  timeline: timeline_heart_instructions,
  save_trial_parameters: {
    stimulus: false,
  },
  data: {
    phase: "heart-instructions",
  },
};

// FLOWER INSTRUCTIONS

timeline_flower_instructions = [];

const flower_instructions_1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<div class='instructions'><div class='instructions-float'>"+
    "<p>Great!</p>"+
    "<p><b>Press Enter to continue.</b></p></div>"+
    "<div class='heart-flower-stim'></div></div>",
    choices: ["Enter"],
};
timeline_flower_instructions.push(flower_instructions_1);

instructions_text = "<div class='instructions'><div class='instructions-float'>"+
"<p>When you see a <b>flower</b>, press the key that is on the <b>opposite</b> side of the flower.</p>";

var i;
for (i = time_flower_instructions_2; i > 0; i--) {
  const flower_instructions_2 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text+
    "<p style='color:#888888'>Here, you should press the <b>L</b> key.</p>"+
    "<p><b>"+i.toString()+"</b></p></div>"+
    "<div class='heart-flower-stim heart-flower-left'><img src='tasks/hearts-flowers/flower.png'/>"+
    "</div></div>",
    choices: "NO_KEYS",
    trial_duration: 1000,
  };
  timeline_flower_instructions.push(flower_instructions_2);
};

const flower_instructions_2 = {
  type: jsPsychHtmlKeyboardResponseCustom,
  stimulus: instructions_text+
  "<p><b>Here, you should press the <b>L</b> key.</b></p><p>&nbsp;</p></div>"+
  "<div class='heart-flower-stim heart-flower-left'><img src='tasks/hearts-flowers/flower.png'/>"+
  "</div></div>",
  choices: ["l"]
};
timeline_flower_instructions.push(flower_instructions_2);

const flower_instructions_3 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<div class='instructions'><div class='instructions-float'>"+
    "<p>And here, you should press the <b>A</b> key.</p></div>"+
    "<div class='heart-flower-stim heart-flower-right'><img src='tasks/hearts-flowers/flower.png'/>"+
    "</div></div>",
    choices: ["a"],
};
timeline_flower_instructions.push(flower_instructions_3);

instructions_text = "<div class='instructions'><div class='instructions-float'>"+
"<p>Very good. Try it a few more times. This can be tricky to get the hang of.</p>"+
"<p><b>Please go as fast as you can!</b></p>";

var i;
for (i = time_flower_instructions_4; i > 0; i--) {
  const flower_instructions_4 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text+
    "<p style='color:#888888'>Press Enter to continue</p>"+
    "<p><b>"+i.toString()+"</b></p></div>"+
    "<div class='heart-flower-stim'></div></div>",   
    choices: "NO_KEYS",
    trial_duration: 1000,
  };
  timeline_flower_instructions.push(flower_instructions_4);
};

const flower_instructions_4 = {
  type: jsPsychHtmlKeyboardResponseCustom,
  stimulus: instructions_text+
  "<p style='color:#ff0000'><b>Press Enter to continue</b></p><p>&nbsp;</p></div>"+
  "<div class='heart-flower-stim'></div></div>",
  choices: ["Enter"]
};
timeline_flower_instructions.push(flower_instructions_4);


const flower_instructions = {
  timeline: timeline_flower_instructions,
  save_trial_parameters: {
    stimulus: false,
  },
  data: {
    phase: "heart-instructions",
  },
};

// MIXED INSTRUCTIONS

instructions_text = "<div class='instructions'>"+
    "<p>Great! Now the real activity begins. Both <b>hearts</b> and <b>flowers</b> will pop up.</p>"+
    "<p>When you see a <b>heart</b>, press the key that is on the <b>same</b> side as the heart.</p>"+
    "<p>When you see a <b>flower</b>, press the key that is on the <b>opposite</b> side of the flower.</p>"+
    "<p><b>Please respond as accurately and as quickly as you can!</b></p>"+
    "<p>This will take about three minutes to complete.</p>";

timeline_mixed_instructions = [];

var i;
for (i = time_mixed_instructions; i > 0; i--) {
  const mixed_instructions_1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text+
    "<p style='color:#888888'>Press Enter to begin. Good luck!</p>"+
    "<p><b>"+i.toString()+"</b></p></div>",
    choices: "NO_KEYS",
    trial_duration: 1000,
  };
  timeline_mixed_instructions.push(mixed_instructions_1);
};

const mixed_instructions_1 = {
  type: jsPsychHtmlKeyboardResponseCustom,
  stimulus: instructions_text+
  "<p style='color:#ff0000'><b>Press Enter to begin. Good luck!</b></p><p>&nbsp;</p></div>",
  choices: ["Enter"]
};
timeline_mixed_instructions.push(mixed_instructions_1);

const mixed_instructions = {
  timeline: timeline_mixed_instructions,
  save_trial_parameters: {
    stimulus: false,
  },
  data: {
    phase: "test-instructions",
  },
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

// CURSOR ON

var cursor_on = {
    type: jsPsychCallFunction,
    func: function() {
        document.body.style.cursor= "auto";
    }
}

// FULLSCREEN OFF

var fullscreen_off = {
  type: jsPsychFullscreen,
  message: "This task must be completed in fullscreen mode.</br>"+
  "Please, do not press the ESC key during the task, and avoid all distractions.</br></br>"+
  "If you quit the fullscreen mode during the task, please press <b>F11</b> on Windows </br>"+
  "or the combination <b>Control-⌘-F</b> on Mac to come back to fullscreen.</br>",
  button_label: 'Continue',
  fullscreen_mode: false,
};