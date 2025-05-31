//We define the global timeline for this experiment
let timeline = [];

//Fullscreen on
timeline.push(fullscreen_on);

//Get browser and URL info
timeline.push(get_browser_and_url_info);

//Cursor off
timeline.push(cursor_off);

//We add the instructions sub-timeline
timeline.push(instructionsBeforePractice);

//We add the practice sub-timeline
timeline.push(practice_loop);

//We reset the trial counter
timeline.push(reset_block);

//We add the instructions before the main test
timeline.push(instructionsBeforeMainTask);

//We add the main task
timeline.push(main_task_loop);

//We upload the data
timeline.push(upload_data);

//Cursor on
timeline.push(cursor_on);

//We add the goodbye message
timeline.push(goodbye);

//Fullscreen off
timeline.push(fullscreen_off);

//We run the experiment
jsPsych.run(timeline);