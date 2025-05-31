// FULLSCREEN ON
let fullscreen_on = {
    type: jsPsychFullscreen,
    message: "This task must be completed in fullscreen mode.</br>" +
        "Please, do not press the ESC key during the task, and avoid all distractions.</br></br>" +
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

//======================================================================================================================

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

//======================================================================================================================

// CURSOR OFF
let cursor_off = {
    type: jsPsychCallFunction,
    func: function () {
        document.body.style.cursor = "none";
    }
}

//======================================================================================================================

// INSTRUCTIONS
let timeline_instructions_practice = [];

const instructions_welcome = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<div class='instructions'>Welcome to the final task. It will take around 5 minutes.</p>" +
        "Press <strong>Enter</strong> to begin.</div>",
    choices: ["Enter"],
};
timeline_instructions_practice.push(instructions_welcome);

//----------------------------------------------------------------------------------------------------------------------

let instructions_text = "<div class='instructions'>" +
    "<p>In this experiment, we are testing how fast you can respond.</p>" +
    "<p>On each trial, press the <b>space bar</b> as quickly as possible <strong>after</strong> you see the " +
    "large <b>\"X\"</b>.</p></div>";

for (let i = time_instructions_practice_1; i > 0; i--) {
    const instructions_practice_1 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructions_text +
            "<p style='color:#888888'>Press Enter to continue.</p>" +
            "<p><b>" + i.toString() + "</b></p>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timeline_instructions_practice.push(instructions_practice_1);
}

const instructions_practice_1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text + "<p style='color:#ff0000'><b>Press Enter to continue.</b></p><p>&nbsp;</p>",
    choices: ["Enter"],
};
timeline_instructions_practice.push(instructions_practice_1);

//----------------------------------------------------------------------------------------------------------------------

instructions_text = "<div class='instructions'><p>We will now start with 5 practice trials.</p></div>";

for (let i = time_instructions_practice_2; i > 0; i--) {
    const instructions_practice_2 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructions_text +
            "<p style='color:#888888'>Press Enter to continue.</p>" +
            "<p><b>" + i.toString() + "</b></p>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timeline_instructions_practice.push(instructions_practice_2);
}

const instructions_practice_2 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text + "<p style='color:#ff0000'><b>Press Enter to continue.</b></p><p>&nbsp;</p>",
    choices: ["Enter"],
};
timeline_instructions_practice.push(instructions_practice_2);

//----------------------------------------------------------------------------------------------------------------------

const instructions_practice = {
    timeline: timeline_instructions_practice,
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "instructions_practice",
    },
};

//----------------------------------------------------------------------------------------------------------------------

let timeline_instructions_test = [];

instructions_text = "<div class='instructions'><p>We will now start the test.</p>" +
    "Respond to the \"X\" as quickly as possible by pressing the space bar.</p>" +
    "There will be two breaks.</p></div>";

for (let i = time_instructions_test; i > 0; i--) {
    const instructions_test_1 = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructions_text +
            "<p style='color:#888888'>Press Enter to continue.</p>" +
            "<p><b>" + i.toString() + "</b></p>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timeline_instructions_test.push(instructions_test_1);
}

const instructions_test_1 = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text + "<p style='color:#ff0000'><b>Press Enter to continue.</b></p><p>&nbsp;</p>",
    choices: ["Enter"],
};
timeline_instructions_test.push(instructions_test_1);

//----------------------------------------------------------------------------------------------------------------------

const instructions_test = {
    timeline: timeline_instructions_test,
    save_trial_parameters: {
        stimulus: false,
    },
    data: {
        phase: "instructions_test",
    },
};

//----------------------------------------------------------------------------------------------------------------------

let timeline_instructions_rest = [];

instructions_text = "Take a break!";

for (let i = time_instructions_rest; i > 0; i--) {
    const instructions_rest = {
        type: jsPsychHtmlKeyboardResponseCustom,
        stimulus: instructions_text +
            "<p style='color:#888888'>Press Enter to continue.</p>" +
            "<p><b>" + i.toString() + "</b></p>",
        choices: "NO_KEYS",
        trial_duration: 1000,
    };
    timeline_instructions_rest.push(instructions_rest);
}

const instructions_rest = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: instructions_text + "<p style='color:#ff0000'><b>Press Enter to continue.</b></p><p>&nbsp;</p>",
    choices: ["Enter"],
};
timeline_instructions_rest.push(instructions_rest);

//----------------------------------------------------------------------------------------------------------------------

const end_screen = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: "<div class='instructions'>" +
        "<p>You have completed the final task.</p>" +
        "<p>Press Enter to end the experiment.</p></div>",
    choices: ["Enter"],
    save_trial_parameters: {
        stimulus: false,
    },
};

//======================================================================================================================

// CURSOR ON
let cursor_on = {
    type: jsPsychCallFunction,
    func: function () {
        document.body.style.cursor = "auto";
    }
}

//======================================================================================================================

// FULLSCREEN OFF
let fullscreen_off = {
    type: jsPsychFullscreen,
    message: "This task must be completed in fullscreen mode.</br>" +
        "Please, do not press the ESC key during the task, and avoid all distractions.</br></br>" +
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