// Instructions time
const timeInstructionsPractice1 = 1;
const timeInstructionsPractice2 = 1;
const timeInstructionsTest = 1;

// Task-specific variables
const numberOfTrialsPractice = 3;
const numberOfBlocksTest = 2;
const numberOfTrialsPerBlockTest = 3;

// Stimulus
const stim = '<div class = shape-box><div id = cross></div></div>'
const minTimeBeforeStimulus = 2000; // ms
const maxTimeBeforeStimulus = 6500; // ms
const durationStimulus = 2000; // ms

// Trials too fast
const timeInstructionsTooFastPractice = 5;
let trialsBelowRT = 0;
const minAcceptableTimeRT = 125;
const thresholdTrialsBelowRT = 1;
const timeInstructionsNoResponse = 1;

// Trials without response
let trialsNoResponse = 0;
const thresholdTrialsNoResponse = 1;
const timeInstructionsTooFast = 1;

const append_to_datafile = "";
const task = "simple-reaction-time";

const jsPsych = initJsPsych({
    on_finish: function () {
        redirectToSona();
    }
});