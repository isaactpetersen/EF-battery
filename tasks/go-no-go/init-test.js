const go_stimuli_block_practice = 1;
const no_go_stimuli_block_practice = 1;
const blocks_practice = 1;

const go_stimuli_block_main = 1;  // Number of go trials per block
const no_go_stimuli_block_main = 1;  // Number of no-go trials per block
const blocks_main = 1;  // Number of times the test trial blocks are shown
                        // 5 go + 1 no-go x 50 = 300 test trials

const timeInstructions = 1;

const append_to_datafile = "_test";
const task = "go-no-go";

// We initialize jsPsych
let jsPsych = initJsPsych({
    on_finish: function () {
        // We get the current URL (this allows the redirection to function the same way locally and online)
        let address = getCurrentURLHead();
        // We add the next task to the URL
        address += "experiment-hearts-flowers-test.html";
        redirectToNextTask(address);
    }
});