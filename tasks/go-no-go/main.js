//We define the global timeline for this experiment
var timeline = [];

//We add the instructions sub-timeline
timeline.push(instructions);

//We run the experiment
jsPsych.run(timeline);