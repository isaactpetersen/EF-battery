const limit_error_to_end_task = 1;
const time_instructions = 1;

const append_to_datafile = "_test";

const jsPsych = initJsPsych({
    on_finish: function () {

        let current_html = window.location.href.split("/");
        let address = ""

        for (let i = 0; i < current_html.length - 1; i++) {
            address += current_html[i] + "/"
        }

        address += "experiment-go-no-go-test.html";
        redirectToNextPage(address);

    }
});