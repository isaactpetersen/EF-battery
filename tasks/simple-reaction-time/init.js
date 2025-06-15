// Instructions time
const timeInstructionsPractice1 = 5;
const timeInstructionsPractice2 = 5;
const timeInstructionsTest = 5;

// Task-specific variables
const numberOfTrialsPractice = 5;
const numberOfBlocksTest = 3;
const numberOfTrialsPerBlockTest = 50;

// Stimulus
const stim = '<div class = shape-box><div id = cross></div></div>'
const minTimeBeforeStimulus = 2000; // ms
const maxTimeBeforeStimulus = 6500; // ms
const durationStimulus = 2000; // ms

// Trials too fast
const timeInstructionsTooFastPractice = 5;
let trialsBelowRT = 0;
const minAcceptableTimeRT = 125;
const thresholdTrialsBelowRT = 5;
const timeInstructionsNoResponse = 5;

// Trials without response
const timeInstructionsNoResponsePractice = 5;
let trialsNoResponse = 0;
const thresholdTrialsNoResponse = 5;
const timeInstructionsTooFast = 10;

const append_to_datafile = "";
const task = "simple-reaction-time";

const jsPsych = initJsPsych({
    on_finish: function () {
        redirectToSona();
    }
});