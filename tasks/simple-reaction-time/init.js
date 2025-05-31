// Instructions time
const time_instructions_practice_1 = 5;
const time_instructions_practice_2 = 5;
const time_instructions_test = 5;
const time_instructions_rest = 5;

// generic task variables
let sumInstructTime = 0 // ms
const instructTimeThresh = 0 /// in seconds

// task specific variables
const practice_len = 5
const num_blocks = 3
const block_len = 50
let gap = 0
const current_trial = 0
const stim = '<div class = shapebox><div id = cross></div></div>'
const flag_thresh = 5
let fast_rt_flags = 0;
let flag_curr_trial = 0;

const append_to_datafile = "";

const jsPsych = initJsPsych({
    on_finish: function () {
        redirectToNextPage();
    }
});