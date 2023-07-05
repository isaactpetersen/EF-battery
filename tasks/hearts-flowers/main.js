const timeline = [];

timeline.push(preload);
timeline.push(fullscreen_on);
timeline.push(heart_instructions);
timeline.push(heart_practice_timeline);
timeline.push(reset_block);
timeline.push(flower_instructions);
timeline.push(flower_practice_timeline);
timeline.push(reset_block);
timeline.push(mixed_instructions);
timeline.push(heart_flower_timeline);
timeline.push(fullscreen_off);
timeline.push(end_screen);

jsPsych.run(timeline);