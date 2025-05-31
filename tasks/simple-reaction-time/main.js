const timeline = [];

timeline.push(fullscreen_on);
timeline.push(get_browser_and_url_info);
timeline.push(cursor_off);
timeline.push(instructions_practice);
timeline.push(practice_block);
timeline.push(instructions_test);
timeline.push(test_block);
timeline.push(upload_data);
timeline.push(cursor_on);
timeline.push(end_screen);
timeline.push(fullscreen_off);

jsPsych.run(timeline);