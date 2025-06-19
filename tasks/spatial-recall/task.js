timelineRecall = [];

let fixationCross = {
    type: jsPsychHtmlKeyboardResponseCustom,
    stimulus: '<p style="font-size: 48px;">+</p>',
    choices: 'NO_KEYS',
    trial_duration: 1200,
};
timelineRecall.push(fixationCross);

let spatialRecall = {
    type: jsPsychSpatialRecall,
    grid_size: 4,
    sequence: jsPsych.timelineVariable('sequence'),
    backwards: false,
    data: {
        exp_id: "spatial-recall",
        exp_stage: "test",
    },
    on_finish: appendData,
};
timelineRecall.push(spatialRecall);

let stoppingFunction = {
    type: jsPsychCallFunction,
    func: function () {
        if (!jsPsych.data.getLastTrialData().values()[0].correct) {  //We check if the last trial was correct
            false_in_a_row += 1;  // If it wasn't, we add 1 to "false_in_a_row"
        } else {
            false_in_a_row = 0;  // If it was, we reset "false_in_a_row"
        }
        if (false_in_a_row === limit_error_to_end_task) {  // If we reach the limit (2 false in a row), we end the timeline
            jsPsych.abortCurrentTimeline();
        }
    },
};
timelineRecall.push(stoppingFunction);

let recallForwards = {
    timeline: timelineRecall,
    timeline_variables: stimuli,
};

// UPLOAD DATA ---------------------------------------------------------------------------------------------------------
let uploadDataNode = {
    type: jsPsychCallFunction,
    async: true,
    func: uploadData,
}