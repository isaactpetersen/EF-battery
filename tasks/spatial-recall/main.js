const timeline = [];

timeline.push(fullscreen_on);
timeline.push(get_browser_and_url_info);
timeline.push(instructions);
timeline.push(recall_forwards);
timeline.push(fullscreen_off);
timeline.push(end_screen);

jsPsych.run(timeline);