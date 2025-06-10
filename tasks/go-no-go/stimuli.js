// We randomly define if the user should focus on orange or blue squares, to counterbalance
let stims = jsPsych.randomization.shuffle([["orange", "stim1"], ["blue", "stim2"]]);
let message_correct = "<b><div style='color:green; font-size:30px'>Correct!</div></b>";
let message_incorrect = "<b><div style='color:red; font-size:30px''>Incorrect</div></b>";

// We define the practice stimuli
let practice_stimuli_block = [];

// Go condition
for (let i = 0; i < go_stimuli_block_practice; i++){
    practice_stimuli_block.push({
        stimulus: "<div class = centerbox><div id=" + stims[0][1] + "></div></div>",
        stimulus_after_key_press: "<div class = centerbox><div id=" + stims[0][1] + "-responded></div></div>",
        data: {
            exp_stage: "practice",
            exp_id: "go-nogo",
            condition: "go",
            correct_response: " ",
            square_color: stims[0][0],
            stim_number: stims[0][1],
        },
        timeout_message: message_incorrect,
        key_answer: " "
    });
}

// No-go condition
for (let i = 0; i < go_stimuli_block_practice; i++){
    practice_stimuli_block.push({
        stimulus: "<div class = centerbox><div id=" + stims[1][1] + "></div></div>",
        stimulus_after_key_press: "<div class = centerbox><div id=" + stims[1][1] + "-responded></div></div>",
        data: {
            exp_stage: "practice",
            exp_id: "go-nogo",
            condition: "nogo",
            correct_response: "NO_KEYS",
            square_color: stims[1][0],
            stim_number: stims[1][1],
        },
        timeout_message: message_correct,
        key_answer: "NO_KEYS"
    });
}

let practice_trials = jsPsych.randomization.repeat(practice_stimuli_block, blocks_practice);

let main_stimuli_block = [];

// Go stimuli
for (let i = 0; i < go_stimuli_block_main; i++){
    main_stimuli_block.push({
        stimulus: "<div class = centerbox><div id=" + stims[0][1] + "></div></div>",
        stimulus_after_key_press: "<div class = centerbox><div id=" + stims[0][1] + "-responded></div></div>",
        data: {
            exp_stage: "test",
            exp_id: "go-nogo",
            condition: "go",
            correct_response: " ",
            square_color: stims[0][0],
            stim_number: stims[0][1],
        },
        key_answer: " "
    });
}

// No-go stimuli
for (let i = 0; i < no_go_stimuli_block_main; i++){
    main_stimuli_block.push({
        stimulus: "<div class = centerbox><div id=" + stims[1][1] + "></div></div>",
        stimulus_after_key_press: "<div class = centerbox><div id=" + stims[1][1] + "-responded></div></div>",
        data: {
            exp_stage: "test",
            exp_id: "go-nogo",
            condition: "nogo",
            correct_response: "NO_KEYS",
            square_color: stims[1][0],
            stim_number: stims[1][1],
        },
        key_answer: "NO_KEYS"
    });
}

let main_trials = jsPsych.randomization.repeat(main_stimuli_block, blocks_main);