var jsPsychCategorizeHtmlCustom = (function (jspsych) {
    'use strict';

    var version = "2.1.0";

    const info = {
        name: "categorize-html-custom",
        version,
        parameters: {
            /** The HTML content to be displayed. */
            stimulus: {
                type: jspsych.ParameterType.HTML_STRING,
                default: void 0
            },
            /** The stimulus that appears after a key press. */
            stimulus_after_key_press: {                               //New parameter to define the stimulus to show
                type: jspsych.ParameterType.HTML_STRING,              //after the key has been pressed.
                default: void 0
            },
            /** The key character indicating the correct response. */
            key_answer: {
                type: jspsych.ParameterType.KEY,
                default: void 0
            },
            /** This array contains the key(s) that the participant is allowed to press in order to respond to the stimulus. Keys should be specified as characters (e.g., `'a'`, `'q'`, `' '`, `'Enter'`, `'ArrowDown'`) - see [this page](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) and [this page (event.key column)](https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/) for more examples. Any key presses that are not listed in the array will be ignored. The default value of `"ALL_KEYS"` means that all keys will be accepted as valid responses. Specifying `"NO_KEYS"` will mean that no responses are allowed. */
            choices: {
                type: jspsych.ParameterType.KEYS,
                default: "ALL_KEYS"
            },
            /** A label that is associated with the correct answer. Used in conjunction with the `correct_text` and `incorrect_text` parameters. */
            text_answer: {
                type: jspsych.ParameterType.HTML_STRING,
                default: null,
            },
            /** String to show when the correct answer is given. Can contain HTML formatting. The special string `%ANS%` can be used within the string. If present, the plugin will put the `text_answer` for the trial in place of the `%ANS%` string (see example below). */
            correct_text: {
                type: jspsych.ParameterType.HTML_STRING,
                default: "<p class='feedback'>Correct</p>",
            },
            /** String to show when the wrong answer is given. Can contain HTML formatting. The special string `%ANS%` can be used within the string. If present, the plugin will put the `text_answer` for the trial in place of the `%ANS%` string (see example below). */
            incorrect_text: {
                type: jspsych.ParameterType.HTML_STRING,
                default: "<p class='feedback'>Incorrect</p>",
            },
            /** Show any type of feedback at all. */
            show_feedback: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Show feedback",
                default: true,
            },
            /** How long to show the stimulus. */
            stimulus_duration: {
                type: jspsych.ParameterType.INT,
                default: null,
            },
            /** How long to show trial. */
            trial_duration: {
                type: jspsych.ParameterType.INT,
                default: null,
            },
            /** How long to show feedback. */
            feedback_duration: {
                type: jspsych.ParameterType.INT,
                default: 2000,
            },
            /** How long to wait before moving on to the next trial. */
            post_trial_duration: {
                type: jspsych.ParameterType.INT,
                default: null,
            },
        },
        data: {
            /** Either the path to the image file or the string containing the HTML formatted content that the participant saw on this trial. */
            stimulus: {
                type: jspsych.ParameterType.STRING
            },
            /** Indicates which key the participant pressed.  */
            response: {
                type: jspsych.ParameterType.STRING
            },
            /** The response time in milliseconds for the participant to make a response. The time is measured from when the stimulus first appears on the screen until the participant's response. */
            rt: {
                type: jspsych.ParameterType.INT
            },
            /** `true` if the participant got the correct answer, `false` otherwise. */
            correct: {
                type: jspsych.ParameterType.BOOL
            }
        },
        // prettier-ignore
        citations: {
            "apa": "de Leeuw, J. R., Gilbert, R. A., & Luchterhandt, B. (2023). jsPsych: Enabling an Open-Source Collaborative Ecosystem of Behavioral Experiments. Journal of Open Source Software, 8(85), 5351. https://doi.org/10.21105/joss.05351 ",
            "bibtex": '@article{Leeuw2023jsPsych, 	author = {de Leeuw, Joshua R. and Gilbert, Rebecca A. and Luchterhandt, Bj{\\" o}rn}, 	journal = {Journal of Open Source Software}, 	doi = {10.21105/joss.05351}, 	issn = {2475-9066}, 	number = {85}, 	year = {2023}, 	month = {may 11}, 	pages = {5351}, 	publisher = {Open Journals}, 	title = {jsPsych: Enabling an {Open}-{Source} {Collaborative} {Ecosystem} of {Behavioral} {Experiments}}, 	url = {https://joss.theoj.org/papers/10.21105/joss.05351}, 	volume = {8}, }  '
        }
    };

    class CategorizeHtmlCustomPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }

        static {
            this.info = info;
        }

        trial(display_element, trial) {
            trial.start_time = jsPsych.getTotalTime()
            display_element.innerHTML =
                '<div id="jspsych-categorize-html-custom-stimulus" class="jspsych-categorize-html-custom-stimulus">' +
                trial.stimulus + "</div>";
            if (trial.stimulus_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    display_element.querySelector("#jspsych-categorize-html-custom-stimulus").style.visibility = "hidden";
                }, trial.stimulus_duration);
            }
            var trial_data = {};
            const after_response = (info2) => {
                this.jsPsych.pluginAPI.cancelAllKeyboardResponses();
                if (info.key !== "NO_KEYS") {
                    display_element.innerHTML =
                        '<div id="jspsych-categorize-html-custom-stimulus" class="jspsych-categorize-html-custom-stimulus">' +
                        trial.stimulus_after_key_press + "</div>";
                }
                var correct = false;
                if (this.jsPsych.pluginAPI.compareKeys(trial.key_answer, info2.key)) {
                    correct = true;
                }
                trial_data = {
                    rt: info2.rt,
                    correct,
                    stimulus: trial.stimulus,
                    response: info2.key
                };
                if (trial.trial_duration !== null) {
                    this.jsPsych.pluginAPI.setTimeout(() => {
                        after_timeout(correct, info);
                    }, trial.trial_duration - (jsPsych.getTotalTime() - trial.start_time));
                }
            };
            const after_timeout = (correct, info) => {
                this.jsPsych.pluginAPI.clearAllTimeouts();
                display_element.innerHTML = "";
                var timeout = info.rt == null;
                if (trial.show_feedback) {
                    doFeedback(correct, timeout);
                } else {
                    postTrial();
                }
            }
            const postTrial = () => {
                this.jsPsych.pluginAPI.clearAllTimeouts();
                this.jsPsych.pluginAPI.setTimeout(endTrial, trial.post_trial_duration);
            }
            const doFeedback = (correct, timeout) => {
                // Feedback
                var atext = "";
                if (correct) {
                    atext = trial.correct_text.replace("%ANS%", trial.text_answer);
                } else {
                    atext = trial.incorrect_text.replace("%ANS%", trial.text_answer);
                }
                display_element.innerHTML += atext;
                this.jsPsych.pluginAPI.setTimeout(postTrial, trial.feedback_duration);
            };
            const endTrial = () => {
                display_element.innerHTML = "";
                this.jsPsych.finishTrial(trial_data);
            };
            this.jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: after_response,
                valid_responses: trial.choices,
                rt_method: "performance",
                persist: false,
                allow_held_key: false,
            });
            if (trial.trial_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    after_response({
                        key: "NO_KEYS",
                        rt: -1,
                    });
                }, trial.trial_duration);
            }
        }
    }

    return CategorizeHtmlCustomPlugin;

})(jsPsychModule);