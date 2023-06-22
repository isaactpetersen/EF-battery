var jsPsychCategorizeHtmlCustom = (function (jspsych) {
  'use strict';

  const info = {
      name: "categorize-html-custom",
      parameters: {
          /** The HTML content to be displayed. */
          stimulus: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Stimulus",
              default: undefined,
          },
          /** The stimulus that appears after a key press. */
          stimulus_after_key_press: {                               //New parameter to define the stimulus to show
              type: jspsych.ParameterType.HTML_STRING,              //after the key has been pressed.
              pretty_name: "Stimulus after key press",
              default: undefined,
          },
          /** The key to indicate the correct response. */
          key_answer: {
              type: jspsych.ParameterType.KEY,
              pretty_name: "Key answer",
              default: undefined,
          },
          /** Array containing the key(s) the subject is allowed to press to respond to the stimulus. */
          choices: {
              type: jspsych.ParameterType.KEYS,
              pretty_name: "Choices",
              default: "ALL_KEYS",
          },
          /** Label that is associated with the correct answer. */
          text_answer: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Text answer",
              default: null,
          },
          /** String to show when correct answer is given. */
          correct_text: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Correct text",
              default: "<p class='feedback'>Correct</p>",
          },
          /** String to show when incorrect answer is given. */
          incorrect_text: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Incorrect text",
              default: "<p class='feedback'>Incorrect</p>",
          },
          /** Whether or not to show feedback following a response timeout. */
          show_feedback_on_timeout: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Show feedback on timeout",
              default: false,
          },
          /** The message displayed on a timeout non-response. */
          timeout_message: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Timeout message",
              default: "<p>Please respond faster.</p>",
          },
          /** How long to show the stimulus. */
          stimulus_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Stimulus duration",
              default: null,
          },
          /** How long to show trial */
          trial_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Trial duration",
              default: null,
          },
          /** How long to show feedback. */
          feedback_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Feedback duration",
              default: 2000,
          },
      },
  };
  /**
   * **categorize-html-custom**
   *
   * jsPsych plugin for categorization trials with feedback
   *
   * @author Josh de Leeuw
   * @see {@link https://www.jspsych.org/plugins/jspsych-categorize-html/ categorize-html plugin documentation on jspsych.org}
   * Modified by Romain Pastureau
   */
  class CategorizeHtmlCustomPlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
          trial.start_time = jsPsych.getTotalTime() //We get the time elapsed since the start of the jsPsych experiment.
                                                    //This will be used to define when the experiment started.

          //We show the stimulus
          display_element.innerHTML =
              '<div id="jspsych-categorize-html-custom-stimulus" class="jspsych-categorize-html-custom-stimulus">' +
                  trial.stimulus + "</div>";

          //Hide image after time if the timing parameter is set
          if (trial.stimulus_duration !== null) {
              this.jsPsych.pluginAPI.setTimeout(() => {
                  display_element.querySelector("#jspsych-categorize-html-custom-stimulus").style.visibility = "hidden";
              }, trial.stimulus_duration);
          }

          //Structure containing the data for the trial
          var trial_data = {};

          //Create response function
          const after_response = (info) => {

              //Clear keyboard listener
              this.jsPsych.pluginAPI.cancelAllKeyboardResponses();

              // We show the modified stimulus after a key press.
              if (info.key !== null){
                  display_element.innerHTML =
                      '<div id="jspsych-categorize-html-custom-stimulus" class="jspsych-categorize-html-custom-stimulus">' +
                          trial.stimulus_after_key_press + "</div>";
              }

              //If the key pressed was the expected one (space in go, NO_KEYS in no go), we set correct on true
              var correct = false;
              if (this.jsPsych.pluginAPI.compareKeys(trial.key_answer, info.key)) {
                  correct = true;
              }

              //Save data
              trial_data = {
                  rt: info.rt,
                  correct: correct,
                  stimulus: trial.stimulus,
                  response: info.key,
              };

              //Once the stimulus duration is over, even if there was a key press, we show the feedback.
              if (trial.trial_duration !== null) {
                  this.jsPsych.pluginAPI.setTimeout(() => {
                      after_timeout(correct, info);
                  }, trial.trial_duration - (jsPsych.getTotalTime() - trial.start_time));
              }

          };

          //What happens once the stimulus duration is over
          const after_timeout = (correct, info) => {
              // kill any remaining setTimeout handlers
              this.jsPsych.pluginAPI.clearAllTimeouts();
              display_element.innerHTML = ""; //We empty the display
              var timeout = info.rt == null;
              doFeedback(correct, timeout); //We show the feedback
          }

          //Showing the feedback
          const doFeedback = (correct, timeout) => {
              //If timeout without having pressed any key, show the timeout message
              if (timeout && !trial.show_feedback_on_timeout) {
                  display_element.innerHTML += trial.timeout_message;
              }
              //Else, show the correct or incorrect answer
              else {
                  // Feedback
                  var atext = "";
                  if (correct) {
                      atext = trial.correct_text.replace("%ANS%", trial.text_answer);
                  }
                  else {
                      atext = trial.incorrect_text.replace("%ANS%", trial.text_answer);
                  }
                  // show the feedback
                  display_element.innerHTML += atext;
              }
              this.jsPsych.pluginAPI.setTimeout(endTrial, trial.feedback_duration);
          };

          //What happens at the end of the trial: we save the data
          const endTrial = () => {
              display_element.innerHTML = "";
              this.jsPsych.finishTrial(trial_data);
          };

          //Function to get the keyboard responses
          this.jsPsych.pluginAPI.getKeyboardResponse({
              callback_function: after_response,
              valid_responses: trial.choices,
              rt_method: "performance",
              persist: false,
              allow_held_key: false,
          });

          //What happens if we reached the end of the trial duration and the user didn't press any key
          if (trial.trial_duration !== null) {
              this.jsPsych.pluginAPI.setTimeout(() => {
                  after_response({
                      key: null,
                      rt: null,
                  });
              }, trial.trial_duration);
          }
      }
  }
  CategorizeHtmlCustomPlugin.info = info;

  return CategorizeHtmlCustomPlugin;

})(jsPsychModule);