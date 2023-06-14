# EF-battery
jsPsych code for executive functioning battery

# To-Do:

1. Combine the three tasks ([Spatial Recall](https://github.com/isaactpetersen/spatial-recall), [Go/No-Go](https://github.com/isaactpetersen/go-nogo), [Cued Task Switching](https://github.com/isaactpetersen/cued-task-switching)), ideally using the latest version of jsPsych; present them to the subject in the following order:
    1. [Spatial Recall](https://github.com/isaactpetersen/spatial-recall)
    1. [Go/No-Go](https://github.com/isaactpetersen/go-nogo)
    1. [Cued Task Switching](https://github.com/isaactpetersen/cued-task-switching)
1. [Extract variables from URL](https://www.jspsych.org/7.3/reference/jspsych-data/#jspsychdataurlvariables), and save to exported data: 
    - subject ID: `subid`
    - SONA ID: `sonaid`
1. Export data from each task, separately, as csv, with filename as: `task_subid.csv`
1. End Spatial Recall task when get two wrong in a row
1. On finish, redirect to external URL, but only if `sonaid` != 0
- Maybe:
    - Combined Progress Bar

# Instructions:

- Place code in this github repo
- Commit each change separately so I can see and learn how to do each step, e.g.:
    - combine tasks
    - extract `subid` and `sonaid` from URL
    - export data from each task, separately, as csv, with filename as: `task_subid.csv`
    - end spatial recall task when get two wrong in a row
    - on finish, redirect to external URL, but only if `sonaid` != 0
- Use these lines to extract the subject ID and SONA ID from the URL, so they can be saved in the filename and datafile, and can be used to assign credit.
    - `var subid = jsPsych.data.getURLVariable("subid")`
    - `var sonaid = jsPsych.data.getURLVariable("sonaid")`
- At the end of the final task, with the `on_finish` function, include the [code to redirect SONA participants to an external URL](#redirect-to-url), but only if their `sonaid` != 0.
- To save the data on the server, use the [`write_data_new.php`](https://github.com/isaactpetersen/EF-battery/blob/main/write_data_new.php) PHP file
- Use/adapt this the [code to save the data](#save-data):

## Redirect to URL

This is code to redirect participants to an external URL.
Use/adapt this code to redirect participants to a URL, but only if their `sonaid` != 0.
We need to replace the https text before `+subid` with my SONA project completion URL and remove the XXXX and put `subid`.
I will supply a revised `experiment_id` and `credit_token` (the ones in the link above are for another study)

```js
on_finish: function(){
                window.location = https://uiowa-psych.sona-systems.com/webstudy_credit.aspx?experiment_id=476&credit_token=78a4b09dd29b421cb92b7ffa6db933d8&survey_code=+subid }
```

## Save Data

This is code to export data.
Use/adapt this the code to export data from each task, separately, as csv, with filename as: `task_subid.csv`
I'm not sure what the "filter" is for, and we are using a different task.

```js
    /* save the data */
    var save_data_block = {
        type: 'call-function',
        func: function(){
            console.log(jsPsych.data.get().filter({trial_type: 'arrow-stim'}).csv())//this should work
            data = jsPsych.data.get().filter({trial_type: 'arrow-stim'}).json()
            save_data(data,'arrow-data',ExpName,subid)
        },
    }
```
