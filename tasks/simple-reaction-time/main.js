const timeline = [];

timeline.push(fullscreenOn);
timeline.push(getBrowserAndURLInfo);
timeline.push(cursorOff);
timeline.push(welcomeScreen);
timeline.push(instructionsPractice);
timeline.push(practiceBlock);
timeline.push(instructionsTest);
timeline.push(testBlocks);
timeline.push(uploadDataNode);
timeline.push(cursorOn);
timeline.push(endScreen);
timeline.push(fullscreenOff);

jsPsych.run(timeline);