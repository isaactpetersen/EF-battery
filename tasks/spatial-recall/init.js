const limit_error_to_end_task = 2;
const time_instructions = 10;

const append_to_datafile = "";

const jsPsych = initJsPsych({
    on_finish: function () {

        let current_html = window.location.href.split("/");
        let address = ""

        for (let i = 0; i < current_html.length - 1; i++) {
            address += current_html[i] + "/"
        }

        address += "experiment-go-no-go.html";
        redirectToNextPage(address);

    }
});




