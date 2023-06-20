//We define the global timeline for this experiment
var timeline = [];

//We add the instructions sub-timeline
timeline.push(instructions);

//We add the practice sub-timeline
timeline.push(practice_loop);

//We run the experiment
jsPsych.run(timeline);