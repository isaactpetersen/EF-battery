//We randomly define if the user should focus on orange or blue squares, to counterbalance
var stims = jsPsych.randomization.shuffle([["orange", "stim1"], ["blue", "stim2"]]);
var message_correct = "<b><div style='color:green; font-size:30px'>Correct!</div></b>";
var message_incorrect = "<b><div style='color:red; font-size:30px''>Incorrect</div></b>";

//We define the practice stimuli
//Go condition
var practice_stimuli_block = [{
    //The stimulus: a big square of one of the two colors
    stimulus: "<div class = centerbox><div id=" + stims[0][1] + "></div></div>",
    stimulus_after_key_press: "<div class = centerbox><div id=" + stims[0][1] + "-responded></div></div>",
    data: {
    trial_id: "Practice",
    condition: "Go",
    correct_response: " "
    },
    timeout_message: message_incorrect,
    key_answer: " "
},
//No-Go condition
{
    //The stimulus: a big square of the other color
    stimulus: "<div class = centerbox><div id=" + stims[1][1] + "></div></div>",
    stimulus_after_key_press: "<div class = centerbox><div id=" + stims[1][1] + "-responded></div></div>",
    data: {
    trial_id: "Practice",
    condition: "No-Go",
    correct_response: "NO_KEYS"
    },
    timeout_message: message_correct,
    key_answer: "NO_KEYS"
}];

var practice_trials = jsPsych.randomization.repeat(practice_stimuli_block, 5); //Put here how many pairs of trials you
                                                                               //want in the practice trials

var main_stimuli_block = [];
var number_of_go_stimuli_per_block = 5; //number of go trials per block
var number_of_no_go_stimuli_per_block = 1; //number of no-go trials per block

//Go stimuli
for (var i = 0; i < number_of_go_stimuli_per_block; i++){
    main_stimuli_block.push({
        stimulus: "<div class = centerbox><div id=" + stims[0][1] + "></div></div>",
        stimulus_after_key_press: "<div class = centerbox><div id=" + stims[0][1] + "-responded></div></div>",
        data: {
            trial_id: "Task",
            condition: "Go",
            correct_response: " "
        },
        key_answer: " "
    });
};

//No-go stimuli
for (var i = 0; i < number_of_no_go_stimuli_per_block; i++){
    main_stimuli_block.push({
        stimulus: "<div class = centerbox><div id=" + stims[1][1] + "></div></div>",
        stimulus_after_key_press: "<div class = centerbox><div id=" + stims[1][1] + "-responded></div></div>",
        data: {
            trial_id: "Task",
            condition: "No-Go",
            correct_response: "NO_KEYS"
        },
        key_answer: "NO_KEYS"
    });
};

var main_trials = jsPsych.randomization.repeat(main_stimuli_block, 50); //number of times the test trial blocks are shown
                                                                        //5 go + 1 no-go x 50 = 300 test trials
