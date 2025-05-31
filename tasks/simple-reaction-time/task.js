/* ************************************ */
/* Define helper functions */
/* ************************************ */
function assessPerformance() {
    let experiment_data = jsPsych.data.getTrialsOfType('poldrack-single-stim')
    let trial_count = 0
    let missed_count = 0
    let rt_array = []
    let rt = 0
    for (let i = 0; i < experiment_data.length; i++) {
        if (experiment_data[i].possible_responses !== 'none') {
            trial_count += 1
            rt = experiment_data[i].rt
            if (rt === -1) {
                missed_count += 1
            } else {
                rt_array.push(rt)
            }
        }
    }
    //calculate average rt
    let avg_rt = -1
    if (rt_array.length !== 0) {
        avg_rt = math.median(rt_array)
    }
    let missed_percent = missed_count/trial_count
    let credit_var = (missed_percent < 0.4 && avg_rt > 100)
    jsPsych.data.addDataToLastTrial({"credit_var": credit_var})
}

function randomExponential(rate, randomUniform) {
    // http://en.wikipedia.org/wiki/Exponential_distribution#Generating_exponential_variates
    rate = rate || 1;

    // Allow to pass a random uniform value or function
    // Default to Math.random()
    let U = randomUniform;
    if (typeof randomUniform === 'function') U = randomUniform();
    if (!U) U = Math.random();

    return -Math.log(U) / rate;
}

let get_trial_time_practice = function() {
    // ref: https://gist.github.com/nicolashery/5885280
    gap = randomExponential(1)*1000
    if (gap > 4500) {
        gap = 4500;
    }
    return gap + 2000;
}

let get_trial_time = function() {
    // ref: https://gist.github.com/nicolashery/5885280
    gap = randomExponential(1)*1000
    if (gap > 4500) {
        gap = 4500
    }
    if (flag_curr_trial === 1){
        gap = 10000
        fast_rt_flags = 0
    }
    return gap
}

let get_message_time = function(){
    if (flag_curr_trial === 1) {
        return 9000
    }
    else {
        return -1
    }
}

let get_message = function(){
    let fast_rt_message = '<div class = centerbox><p class = block-text>We have detected a number of trials where the reaction time was implausibly fast.  Please make sure that you hit the space bar <strong> once</strong>, as quickly as possible <strong>only after the large X appears</strong>.</p></div>'
    if (flag_curr_trial === 1){
        return fast_rt_message
    } else{
        return '<div class = centerbox></div>'
    }
}

/* Append gap and current trial to data and then recalculate for next trial*/
let appendData = function(data) {
    let curr_rt = data.rt
    if (curr_rt < 125 && curr_rt !== -1){
        fast_rt_flags +=1
    }

    if (fast_rt_flags >= flag_thresh){
        flag_curr_trial = 1
    }

    jsPsych.data.addDataToLastTrial({
        trial_num: current_trial
    })
    current_trial = current_trial + 1
}

/* ************************************ */
/* Define experimental variables */
/* ************************************ */

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
//Set up post task questionnaire
let post_task_block = {
    type: 'survey-text',
    data: {
        trial_id: "post task questions"
    },
    questions: ['<p class = center-block-text style = "font-size: 20px">Please summarize what you were asked to do in this task.</p>',
        '<p class = center-block-text style = "font-size: 20px">Do you have any comments about this task?</p>'],
    rows: [15, 15],
    columns: [60,60]
};

/* define practice block */
let practice_block = {
    type: 'poldrack-single-stim',
    stimulus: stim,
    timing_post_trial: 0,
    timing_stim: 2000,
    timing_response: get_trial_time_practice,
    response_ends_trial: false,
    is_html: true,
    data: {
        trial_id: "stim",
        exp_stage: "practice"
    },
    choices: [32],
    on_finish: function(data) {
        appendData(data)
    }
};

/* define test block */
let test_block1 = {
    type: 'poldrack-single-stim',
    stimulus: stim,
    timing_stim: 2000,
    timing_response: 2000,
    timing_post_trial: 0,
    response_ends_trial: false,
    is_html: true,
    data: {
        trial_id: "stim",
        exp_stage: "test"
    },
    choices: [32],
    on_finish: function(data) {
        appendData(data)
    }
};

let test_block2 = {
    type: 'poldrack-single-stim',
    stimulus: get_message,
    timing_stim: get_message_time,
    timing_response: get_trial_time,
    timing_post_trial: 0,
    response_ends_trial: false,
    choices: 'none',
    is_html: true,
    data: {
        trial_id: "gap-message",
        exp_stage: "test"
    },
    on_finish: function(){
        flag_curr_trial = 0;
    }
};

/* create experiment definition array */
let simple_reaction_time_experiment = [];
simple_reaction_time_experiment.push(instruction_node);

simple_reaction_time_experiment.push(start_practice_block);
for (let i = 0; i < practice_len; i++) {
    simple_reaction_time_experiment.push(practice_block);
}
simple_reaction_time_experiment.push(start_test_block);

for(let b = 0; b < 3; b++){
    for (let i = 0; i < block_len; i++) {
        simple_reaction_time_experiment.push(test_block1);
        simple_reaction_time_experiment.push(test_block2);
    }
    simple_reaction_time_experiment.push(rest_block)
}

simple_reaction_time_experiment.push(post_task_block)
simple_reaction_time_experiment.push(end_block);