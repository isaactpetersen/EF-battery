const timeline = [];

timeline.push(welcomeScreen);
timeline.push(fullscreenOn);
timeline.push(getBrowserAndURLInfo);
timeline.push(instructions);
timeline.push(recall_forwards);
timeline.push(uploadData);
timeline.push(endScreen);
timeline.push(fullscreenOff);

jsPsych.run(timeline);