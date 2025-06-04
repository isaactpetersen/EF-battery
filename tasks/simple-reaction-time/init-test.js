// Instructions time
const timeInstructionsPractice1 = 1;
const timeInstructionsPractice2 = 1;
const timeInstructionsTest = 1;

// Task-specific variables
const numberOfTrialsPractice = 3;
const numberOfBlocksTest = 2;
const numberOfTrialsPerBlockTest = 3;
const stim = '<div class = shapebox><div id = cross></div></div>'

const append_to_datafile = "";

const jsPsych = initJsPsych({
    on_finish: function () {
        redirectToSona();
    }
});