const limit_error_to_end_task = 1;
const timeInstructions = 1;

const append_to_datafile = "_test";

const jsPsych = initJsPsych({
    on_finish: function () {
        let address = getCurrentURLHead();
        address += "experiment-go-no-go-test.html";
        redirectToNextTask(address);
    }
});