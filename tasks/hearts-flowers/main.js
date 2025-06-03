const timeline = [];

timeline.push(preload);
timeline.push(fullscreenOn);
timeline.push(getBrowserAndURLInfo);
timeline.push(cursorOff);
timeline.push(welcomeScreen);
timeline.push(heartInstructions);
timeline.push(heart_practice_timeline);
timeline.push(reset_block);
timeline.push(flowerInstructions);
timeline.push(flower_practice_timeline);
timeline.push(reset_block);
timeline.push(mixedInstructions);
timeline.push(heart_flower_timeline);
timeline.push(uploadData);
timeline.push(cursorOn);
timeline.push(endScreen);
timeline.push(fullscreenOff);

jsPsych.run(timeline);