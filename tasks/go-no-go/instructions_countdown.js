//FULLSCREEN ON

let fullscreen_on = {
    type: jsPsychFullscreen,
    message: "This task must be completed in fullscreen mode.</br>" +
        "Please avoid all distractions, and do not press the ESC key during the task.</br></br>" +
        "If you quit the fullscreen mode during the task, please press <b>F11</b> on Windows </br>" +
        "or the combination <b>Control-⌘-F</b> on Mac to come back to fullscreen.</br>",
    button_label: 'Continue',
    fullscreen_mode: true,
    on_finish: function () {
        const time = Date.now();
        const now = new Date(time);
        jsPsych.data.addDataToLastTrial({
            date_start: now.toLocaleString('en-US', {timeZone: 'America/Chicago'}),
        })
    }
};

// GET BROWSER INFO AND URL VALUES
let get_browser_and_url_info = {
    type: jsPsychCallFunction,

    func: function () {

        let data = {browser_info: navigator.userAgent};

        //If the URL has a question mark in it
        if ((window.location.href).indexOf('?') !== -1) {

            // We get the part of the URL containing the variables (everything after the question mark)
            let queryString = window.location.href.split('?')[1];

            // We split this string by ampersand "&" symbol
            let variables = queryString.split("&");

            // For every variable
            for (let i = 0; i < variables.length; i++) {

                let key = variables[i].split("=")[0]; // We get what is before the "=" symbol
                let value = variables[i].split("=")[1]; // We get what is after the "=" symbol
                value = decodeURIComponent(value); // We remove special characters if there are
                eval("data." + key + " = value"); // We assign it to data
            }
        }

        jsPsych.data.addProperties(data);

        data = {};

        // Get IP address and add it to the data
        getUserIP(function (ip) {
            data.ip_address = ip;
            jsPsych.data.addProperties(data);
        });

    },
};

// Function to get IP address using ipinfo.io
function getUserIP(callback) {
    $.getJSON('https://api.ipify.org?format=json', function (data) {
        callback(data.ip);
    });
}

//CURSOR OFF

let cursor_off = {
    type: jsPsychCallFunction,
    func: function () {
        document.body.style.cursor = "none";
    }
}

//WELCOME MESSAGE

//We create an empty timeline
let timelineInstructionsBeforePractice = [];

//We define a block for the welcome screen
let instructionsWelcome = {
    //We use one of jsPsych plugins, that allow to display something on screen and wait for a user keyboard response.
    type: jsPsychHtmlKeyboardResponseCustom,

    //What will be shown on screen
    stimulus: "Welcome to the second task (of three tasks). This task will take around 10 minutes.</p>" +
        "Press <strong>Enter</strong> to begin.",

    choices: ["Enter"] //Enter key, we will only move forwards on the timeline if the user presses it
};

//We add this first screen to the timeline
timelineInstructionsBeforePractice.push(instructionsWelcome);

//INSTRUCTIONS BEFORE PRACTICE

//We define a new block for the instructions of the task

let instructions_text = "In this task, blue and orange squares will appear on the screen.</p>" +
    "You will be told to respond to one of the colored squares by pressing the spacebar.</p>" +
    "You should only respond to this color and withhold any response to the other color.</p>" +
    "If you see the <b><span style=\"color: " + stims[0][0] + "\">" + stims[0][0] + "</span></b> square you " +
    "should respond by pressing the spacebar as quickly as possible</strong>.</p>If you see " +
    "the <b><span style=\"color: " + stims[1][0] + "\">" + stims[1][0] + "</span></b> square you should <b> " +
    "not respond</b>.</p>We will begin with practice. You will get feedback telling " +
    "you if you were correct.</p></p>";

//We define a loop that will count down until the user can press ENTER.
for (let i = time_instructions; i > 0; i--) {
    let instructionsTask = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructions_text +
            "<p style='color:#888888'>Press Enter to continue</p>" + //We show this in grey, hinting that the user
            //can't press Enter yet
            "<p><b>" + i.toString() + "</b></p>", //We show the amount of seconds left
        choices: "NO_KEYS", //No keys are available to continue, the user has to wait
        trial_duration: 1000 //The screen shows up for 1 sec (1 000 ms)
    };
    timelineInstructionsBeforePractice.push(instructionsTask);
}

//Finally, once the loop is over, we show "Press Enter" in red and remove the countdown.
let instructionsTask = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text +
        "<p style='color:#ff0000'><b>Press Enter to continue</b></p><p>&nbsp;</p>",
    choices: ["Enter"] //Enter key
};

timelineInstructionsBeforePractice.push(instructionsTask);

//We create a variable instructions containing this whole block, that we can then add to the timeline
let instructionsBeforePractice = {
    timeline: timelineInstructionsBeforePractice,
};

//INSTRUCTIONS BEFORE MAIN TASK

//We create an empty timeline
let timelineInstructionsBeforeMainTask = [];

//We define a new block for the instructions of the task

instructions_text = "Practice is over, we will now begin the task.</p>" +
    "You will no longer get feedback about your responses.</p>" +
    "Remember, if you see the <b><span style=\"color: " + stims[0][0] + "\">" + stims[0][0] + "</span></b> " +
    "square, you should <b>respond by pressing the spacebar as quickly as possible</b>.</p>" +
    "If you see the <b><span style=\"color: " + stims[1][0] + "\">" + stims[1][0] + "</span></b> square, " +
    "you should <b>not respond</b>.</p>";

//We define a loop that will count down until the user can press ENTER.
for (let i = time_instructions; i > 0; i--) {
    let instructionsTask = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructions_text +
            "<p style='color:#888888'>Press Enter to begin</p>" + //We show this in grey, hinting that the user
            //can't press Enter yet
            "<p><b>" + i.toString() + "</b></p>", //We show the amount of seconds left
        choices: "NO_KEYS", //No keys are available to continue, the user has to wait
        trial_duration: 1000 //The screen shows up for 1 sec (1 000 ms)
    };
    timelineInstructionsBeforeMainTask.push(instructionsTask);
}

//Finally, once the loop is over, we show "Press Enter" in red and remove the countdown.
instructionsTask = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text +
        "<p style='color:#ff0000'><b>Press Enter to begin</b></p><p>&nbsp;</p>",
    choices: ["Enter"] //Enter key
};

timelineInstructionsBeforeMainTask.push(instructionsTask);

//We create a variable instructions containing this whole block, that we can then add to the timeline
let instructionsBeforeMainTask = {
    timeline: timelineInstructionsBeforeMainTask,
};

// CURSOR ON

let cursor_on = {
    type: jsPsychCallFunction,
    func: function () {
        document.body.style.cursor = "auto";
    }
}

//GOODBYE MESSAGE

let timeline_instructions_goodbye = [];

//We define a block for the welcome screen
let instructionsGoodbye = {
    //We use one of jsPsych plugins, that allow to display something on screen and wait for a user keyboard response.
    type: jsPsychHtmlKeyboardResponseCustom,

    //What will be shown on screen
    stimulus: "<p>This second task is complete.</p>" +
        "<p>Press <b>Enter</b> to access the <b>third and final task</b>.</p>",

    choices: ["Enter"] //Enter key, we will only move forwards on the timeline if the user presses it
};

timeline_instructions_goodbye.push(instructionsGoodbye);

let goodbye = {
    timeline: timeline_instructions_goodbye,
};

//FULLSCREEN OFF
//Remove fullscreen
let fullscreen_off = {
    type: jsPsychFullscreen,
    message: "This task must be completed in fullscreen mode.</br>" +
        "Please avoid all distractions, and do not press the ESC key during the task.</br></br>" +
        "If you quit the fullscreen mode during the task, please press <b>F11</b> on Windows </br>" +
        "or the combination <b>Control-⌘-F</b> on Mac to come back to fullscreen.</br>",
    button_label: 'Continue',
    fullscreen_mode: false,
    on_finish: function () {
        const time = Date.now();
        const now = new Date(time);
        jsPsych.data.addDataToLastTrial({
            date_finish: now.toLocaleString('en-US', {timeZone: 'America/Chicago'}),
        })
    }
};
