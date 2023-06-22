//We define the global timeline for this experiment
var timeline = [];

//We add the instructions sub-timeline
timeline.push(instructionsBeforePractice);

//We add the practice sub-timeline
timeline.push(practice_loop);

//We add the instructions before the main test
timeline.push(instructionsBeforeMainTask);

//We add the main task
timeline.push(main_task_loop);

//We add the goodbye message
timeline.push(goodbye);

//We run the experiment
jsPsych.run(timeline);