const limit_error_to_end_task = 1;
const timeInstructions = 1;
let false_in_a_row = 0;

const append_to_datafile = "_test";
const task = "spatial-recall";

const jsPsych = initJsPsych({
    on_finish: function () {
        let address = getCurrentURLHead();
        address += "experiment-go-no-go-test.html";
        redirectToNextTask(address);
    }
});