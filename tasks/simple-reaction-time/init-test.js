// Instructions time
const timeInstructionsPractice1 = 1;
const timeInstructionsPractice2 = 1;
const timeInstructionsTest = 1;

// Task-specific variables
const numberOfTrialsPractice = 3;
const numberOfBlocksTest = 2;
const numberOfTrialsPerBlockTest = 3;
const minAcceptableTimeRT = 125;
const thresholdTrialsBelowRT = 1;
let trialsBelowRT = 0;
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