const go_stimuli_block_practice = 1;
const no_go_stimuli_block_practice = 1;
const blocks_practice = 5;

const go_stimuli_block_main = 5; // Number of go trials per block
const no_go_stimuli_block_main = 1; // Number of no-go trials per block
const blocks_main = 50; // Number of times the test trial blocks are shown
                        // 5 go + 1 no-go x 50 = 300 test trials

const time_instructions = 10;

const append_to_datafile = "";

//We initialize jsPsych
let jsPsych = initJsPsych({
    on_finish: function() {

        let current_html = window.location.href.split("/"); //We get the current URL, and separate all the elements by the "/" symbol
        let address = ""
        // We create a new URL by adding all the elements from the current URL apart from the last one (the task)
        for (let i = 0; i < current_html.length - 1; i++) {
            address += current_html[i] + "/"
        }

        // We add the task to the URL
        address += "experiment-hearts-flowers.html";
        redirectToNextPage(address);
    }
});