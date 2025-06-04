const timeline = [];

timeline.push(preload);
timeline.push(fullscreenOn);
timeline.push(getBrowserAndURLInfo);
timeline.push(cursorOff);
timeline.push(welcomeScreen);
timeline.push(heartInstructions);
timeline.push(heartPracticeTimeline);
timeline.push(resetBlock);
timeline.push(flowerInstructions);
timeline.push(flowerPracticeTimeline);
timeline.push(resetBlock);
timeline.push(mixedInstructions);
timeline.push(heartFlowerTimeline);
timeline.push(uploadDataNode);
timeline.push(cursorOn);
timeline.push(endScreen);
timeline.push(fullscreenOff);

jsPsych.run(timeline);