const limit_error_to_end_task = 2;
const timeInstructions = 10;

const append_to_datafile = "";

const jsPsych = initJsPsych({
    on_finish: function () {
        let address = getCurrentURLHead();
        address += "experiment-go-no-go.html";
        redirectToNextTask(address);
    }
});




