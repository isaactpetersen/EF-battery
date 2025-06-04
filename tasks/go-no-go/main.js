// We define the global timeline for this experiment
const timeline = [];

// Fullscreen on
timeline.push(fullscreenOn);

// Get browser and URL info
timeline.push(getBrowserAndURLInfo);

// Cursor off
timeline.push(cursorOff);

// Welcome screen
timeline.push(welcomeScreen);

// We add the instructions sub-timeline
timeline.push(instructionsBeforePractice);

// We add the practice sub-timeline
timeline.push(practice_loop);

// We reset the trial counter
timeline.push(resetBlock);

// We add the instructions before the main test
timeline.push(instructionsBeforeTest);

// We add the main task
timeline.push(main_task_loop);

// We upload the data
timeline.push(uploadData);

// Cursor on
timeline.push(cursorOn);

// We add the goodbye message
timeline.push(endScreen);

// Fullscreen off
timeline.push(fullscreenOff);

// We run the experiment
jsPsych.run(timeline);