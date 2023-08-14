const timeline = [];

timeline.push(preload);
timeline.push(fullscreen_on);
timeline.push(get_browser_and_url_info);
timeline.push(cursor_off);
timeline.push(heart_instructions);
timeline.push(heart_practice_timeline);
timeline.push(reset_block);
timeline.push(flower_instructions);
timeline.push(flower_practice_timeline);
timeline.push(reset_block);
timeline.push(mixed_instructions);
timeline.push(heart_flower_timeline);
timeline.push(upload_data);
timeline.push(cursor_on);
timeline.push(end_screen);
timeline.push(fullscreen_off);

jsPsych.run(timeline);