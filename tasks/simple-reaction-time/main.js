const timeline = [];

timeline.push(fullscreenOn);
timeline.push(getBrowserAndURLInfo);
timeline.push(cursorOff);
timeline.push(welcomeScreen);
timeline.push(instructionsPractice);
timeline.push(practice_block);
timeline.push(instructionsTest);
timeline.push(test_block);
timeline.push(uploadData);
timeline.push(cursorOn);
timeline.push(endScreen);
timeline.push(fullscreenOff);

jsPsych.run(timeline);