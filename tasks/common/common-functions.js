/**
 * Gets the current URL without the tail, and returns it.
 * Example: on "https://www.example.com/site/link.php", the function will return "https://www.example.com/site/".
 * @returns {string} The head of the URL of the current website.
 */

let getCurrentURLHead = () => {

    // We get the current URL, and separate all the elements by the "/" symbol
    let current_html = window.location.href.split("/");
    let address = "";
    // We create a new URL by adding all the elements from the current URL apart from the last one (the task)
    for (let i = 0; i < current_html.length - 1; i++) {
        address += current_html[i] + "/"
    }

    return address;
}

/**
 * Returns the IP address of the participant using ipify.
 * @param callback
 */
function getUserIP(callback) {
    $.getJSON('https://api.ipify.org?format=json', function (data) {
        callback(data.ip);
    });
}

/**
 * Creates a jsPsychFullscreen trial to set the experiment on fullscreen.
 * @type {{on_finish: fullscreenOn.on_finish, fullscreen_mode: boolean, button_label: string, type, message: string}}
 */
let fullscreenOn = {
    type: jsPsychFullscreen,
    message: "This task must be completed in fullscreen mode.</br>" +
        "Please avoid all distractions, and do not press the ESC key during the task.</br></br>" +
        "If you quit the fullscreen mode during the task, please press <b>F11</b> on Windows </br>" +
        "or the combination <b>Control-⌘-F</b> on Mac to come back to fullscreen.</br></br>",
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

/**
 * Creates a jsPsychFullscreen trial to remove the fullscreen at the end of the experiment.
 * @type {{on_finish: fullscreenOff.on_finish, fullscreen_mode: boolean, button_label: string, type, message: string}}
 */
let fullscreenOff = {
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

/**
 * Creates a jsPsychCallFunction trial to make the cursor disappear.
 * @type {{func: cursorOff.func, type}}
 */
let cursorOff = {
    type: jsPsychCallFunction,
    func: function () {
        document.body.style.cursor = "none";
    }
}

/**
 * Creates a jsPsychCallFunction trial to show the cursor back at the end of the experiment.
 * @type {{func: cursorOn.func, type}}
 */
let cursorOn = {
    type: jsPsychCallFunction,
    func: function () {
        document.body.style.cursor = "auto";
    }
}

/**
 * Adds the UserAgent and IP of the participant, and the variables contained in the URL in the data object of the
 * jsPsych experiment.
 * @type {{func: getBrowserAndURLInfo.func, type}}
 */
let getBrowserAndURLInfo = {
    type: jsPsychCallFunction,

    func: function () {

        let data = {browser_info: navigator.userAgent};

        // If the URL has a question mark in it
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

/**
 * Redirects to another task while transferring the URL parameters.
 * @param address {string} The destination URL.
 */
function redirectToNextTask(address) {

    if ((window.location.href).indexOf('?') !== -1) {
        let variables = window.location.href.split('?')[1];
        address += "?" + variables;
    }

    let last_trial_data = jsPsych.data.getLastTrialData().trials[0];
    if (last_trial_data["chain"] !== "false") {
        window.location = address;
    }

}

/**
 * Redirects to the SONA website at the end of all the tasks.
 */
function redirectToSona() {
    let last_trial_data = jsPsych.data.getLastTrialData().trials[0];
    if (last_trial_data["chain"] !== "false") {
        if ("sonaid" in last_trial_data) {
            let sonaid = last_trial_data["sonaid"];

            if (sonaid !== "0") {
                let experiment_id = "INSERT_HERE";
                let credit_token = "INSERT_HERE";
                window.location = "https://uiowa-psych.sona-systems.com/webstudy_credit.aspx?experiment_id=" + experiment_id + "&credit_token=" + credit_token + "&survey_code=" + sonaid;
            }
        }
    }
}

/**
 * Sends a POST request containing the data from a task.
 * @param save_url {string} The URL where to save the data.
 * @param data_dir {string} The directory in which to save the data.
 * @param file_name {string} The name of the file in which to save the data.
 * @param extension {string} The extension of the file.
 * @returns {Promise}
 */
function saveData(save_url, data_dir, file_name, extension) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', save_url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve();
                } else {
                    reject(new Error('Error saving data: ' + xhr.status));
                }
            }
        };
        xhr.send(JSON.stringify({
            file_name: file_name,
            extension: extension,
            data_dir: data_dir,
            data: jsPsych.data.get().csv()
        }));
    });
}

let current_trial = 1;

/**
 * Resets the current trial counter to 1.
 * @type {{func: resetBlock.func, type}}
 */
let resetBlock = {
    type: jsPsychCallFunction,
    func: function () {
        current_trial = 1
    },
}

/**
 * Appends fullscreen info and current trial number to the data of the current trial.
 * In the case of the Spatial Recall task, updates the trial only on Sequence trials.
 */
let appendData = function() {
    let isAtMaxWidth = (screen.width - window.innerWidth) === 0;
    let isAtMaxHeight = (screen.height - window.innerHeight) === 0;
    let isFullScreen = (isAtMaxWidth && isAtMaxHeight);

    jsPsych.data.addDataToLastTrial({
        trial_num: current_trial,
        full_screen: isFullScreen,
    })
    current_trial = current_trial + 1;
}

/**
 * Calls the function saveData with the appropriate parameters, or save the data locally, depending on the parameters.
 * @param done
 */
let uploadData = function(done) {
    let last_trial_data = jsPsych.data.getLastTrialData().trials[0];
    let file_name = task;
    if ("subid" in last_trial_data) {
        file_name += "_" + last_trial_data["subid"] + append_to_datafile;
    }
    let extension = ".csv";

    let current_html = window.location.href.split("/"); // We get the current URL, and separate all the elements by the "/" symbol

    if (current_html[0].startsWith("http") && !current_html[2].startsWith("localhost")) {
        let save_url = "write_data_new.php";
        let data_dir = "/data/apache-rw/" + current_html.split("/").slice(2, 5).join("/") + "/" + task + "/";
        console.log("Save URL:", save_url);
        console.log("Data dir:", data_dir);
        console.log("File name:", file_name);
        console.log("Extension:", extension);
        try {
            let response_data = saveData(save_url, data_dir, file_name, extension);
            done(response_data);
        } catch (error) {
            console.error(error);
        }
    } else if (current_html[0].startsWith("file") || current_html[2].startsWith("localhost")) {
        jsPsych.data.get().localSave("csv", file_name + extension);
        done(true);
    }
}
