// Instructions time
const timeInstructionsPractice1 = 5;
const timeInstructionsPractice2 = 5;
const timeInstructionsTest = 5;

// Task-specific variables
const numberOfTrialsPractice = 5;
const numberOfBlocksTest = 3;
const numberOfTrialsPerBlockTest = 50;
const minAcceptableTimeRT = 125;
const thresholdTrialsBelowRT = 5;
const stim = '<div class = shape-box><div id = cross></div></div>'

const minTimeBeforeStimulus = 2000;
const maxTimeBeforeStimulus = 6500;
const timeInstructionsTooFast = 9000;

const append_to_datafile = "";
const task = "simple-reaction-time";

const jsPsych = initJsPsych({
    on_finish: function () {
        redirectToSona();
    }
});