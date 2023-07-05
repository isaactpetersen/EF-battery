var fullscreen_on = {
    type: jsPsychFullscreen,
    message: "This experiment must be passed in fullscreen mode.</br>"+
             "Please, do not press the ESC key during the experiment, and avoid all distractions.</br></br>"+
             "If you quit the fullscreen mode during the experiment, please press <b>F11</b> on Windows </br>"+
             "or the combination <b>Control-⌘-F</b> on Mac to come back to fullscreen.</br>",
    button_label: 'Continue',
    fullscreen_mode: true,
};

const heart_instructions = {
  timeline: [{
	type: jsPsychHtmlKeyboardResponseCustom,
	stimulus: "<div class='instructions'>Welcome to the experiment. This task will take around 5 minutes.</p>"+
	          "Press <strong>Enter</strong> to begin.</div>",
	choices: ["Enter"],
    },
    {
      type: jsPsychHtmlKeyboardResponseCustom,
      stimulus: "<div class='instructions'>"+
                "<p>In this task, you will use the <b>A</b> and <b>L</b> keys on your keyboard.</p>"+
                "<p>Please rest your <b>left index finger</b> on the A key and your <b>right index finger</b> on the "+
                "L key.</p>"+
                "<img src='tasks/hearts-flowers/keyboard.png' width='50%'/>"+
                "<p>Press either key to continue.</p></div>",
      choices: ["a", "l"],
    },
    {
      type: jsPsychHtmlKeyboardResponseCustom,
      stimulus: "<div class='instructions'><div class='instructions-float'>"+
                "<p>In this task, you're going to see a number of <b>hearts</b> and <b>flowers</b> in the box "+
                "below.</p>"+
                "<p>Press <b>Enter</b> to continue.</p></div>"+
                "<div class='heart-flower-stim'></div></div>",
      choices: ["Enter"],
    },
    {
      type: jsPsychHtmlKeyboardResponseCustom,
      stimulus: "<div class='instructions'><div class='instructions-float'>"+
                "<p>When you see a <b>heart</b>, press the key that is on the <b>same</b> side as the heart.</p>"+
                "<p>Here, you should press the <b>A</b> key.</p></div>"+
                "<div class='heart-flower-stim heart-flower-left'><img src='tasks/hearts-flowers/heart.png'/>"+
                "</div></div>",
      choices: ["a"],
    },
    {
      type: jsPsychHtmlKeyboardResponseCustom,
      stimulus: "<div class='instructions'><div class='instructions-float'>"+
                "<p>Now, you should press the <b>L</b> key.</p></div>"+
                "<div class='heart-flower-stim heart-flower-right'><img src='tasks/hearts-flowers/heart.png'/>"+
                "</div></div>",
      choices: ["l"],
    },
    {
      type: jsPsychHtmlKeyboardResponseCustom,
      stimulus: "<div class='instructions'><div class='instructions-float'>"+
                "<p>Very good. Try it a few more times—it goes pretty quickly.</p>"+
                "<p><b>Please go as fast as you can!</b></p>"+
                "<p>Press Enter to continue.</p>"+
                "</div><div class='heart-flower-stim'></div></div>",
      choices: ["Enter"],
    },
  ],
  save_trial_parameters: {
    stimulus: false,
  },
  data: {
    phase: "heart-instructions",
  },
};

const flower_instructions = {
  timeline: [
    {
      type: jsPsychHtmlKeyboardResponseCustom,
      stimulus: "<div class='instructions'><div class='instructions-float'>"+
                "<p>Great!</p>"+
                "<p>Press Enter to continue.</p></div>"+
                "<div class='heart-flower-stim'></div></div>",
      choices: ["Enter"],
    },
    {
      type: jsPsychHtmlKeyboardResponseCustom,
      stimulus: "<div class='instructions'><div class='instructions-float'>"+
                "<p>When you see a <b>flower</b>, press the key that is on the <b>opposite</b> side of the flower.</p>"+
                "<p>Here, you should press the <b>L</b> key.</p></div>"+
                "<div class='heart-flower-stim heart-flower-left'><img src='tasks/hearts-flowers/flower.png'/>"+
                "</div></div>",
      choices: ["l"],
    },
    {
      type: jsPsychHtmlKeyboardResponseCustom,
      stimulus: "<div class='instructions'><div class='instructions-float'>"+
                "<p>And here, you should press the <b>A</b> key.</p></div>"+
                "<div class='heart-flower-stim heart-flower-right'><img src='tasks/hearts-flowers/flower.png'/>"+
                "</div></div>",
      choices: ["a"],
    },
    {
      type: jsPsychHtmlKeyboardResponseCustom,
      stimulus: "<div class='instructions'><div class='instructions-float'>"+
                "<p>Very good. Try it a few more times. This can be tricky to get the hang of.</p>"+
                "<p><b>Please go as fast as you can!</b></p>"+
                "<p>Press Enter to continue.</p></div>"+
                "<div class='heart-flower-stim'></div></div>",
      choices: ["Enter"],
    },
  ],
  save_trial_parameters: {
    stimulus: false,
  },
  data: {
    phase: "heart-instructions",
  },
};

const mixed_instructions = { // update estimate of task duration
  timeline: [
    {
      type: jsPsychHtmlKeyboardResponseCustom,
      stimulus: "<div class='instructions'>"+
                "<p>Great! Now the real activity begins. Both <b>hearts</b> and <b>flowers</b> will pop up.</p>"+
                "<p>When you see a <b>heart</b>, press the key that is on the <b>same</b> side as the heart.</p>"+
                "<p>When you see a <b>flower</b>, press the key that is on the <b>opposite</b> side of the flower.</p>"+
                "<p><b>Please respond as accurately and as quickly as you can!</b></p>"+
                "<p>This will take about three minutes to complete.</p>"+
                "<p>Press Enter to begin. Good luck!</p></div>",
      choices: ["Enter"],
    },
  ],
  save_trial_parameters: {
    stimulus: false,
  },
  data: {
    phase: "test-instructions",
  },
};

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

var fullscreen_off = {
    type: jsPsychFullscreen,
    message: "This experiment must be passed in fullscreen mode.</br>"+
             "Please, do not press the ESC key during the experiment, and avoid all distractions.</br></br>"+
             "If you quit the fullscreen mode during the experiment, please press <b>F11</b> on Windows </br>"+
             "or the combination <b>Control-⌘-F</b> on Mac to come back to fullscreen.</br>",
    button_label: 'Continue',
    fullscreen_mode: false,
};