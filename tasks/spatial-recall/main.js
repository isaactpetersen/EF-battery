const timeline = [];

timeline.push(welcomeScreen);
timeline.push(fullscreenOn);
timeline.push(getBrowserAndURLInfo);
timeline.push(instructions);
timeline.push(recallForwards);
timeline.push(uploadDataNode);
timeline.push(endScreen);
timeline.push(fullscreenOff);

jsPsych.run(timeline);