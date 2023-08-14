const timeline = [];

timeline.push(welcome);
timeline.push(fullscreen_on);
timeline.push(get_browser_and_url_info);
timeline.push(instructions);
timeline.push(recall_forwards);
timeline.push(upload_data);
timeline.push(end_screen);
timeline.push(fullscreen_off);

jsPsych.run(timeline);