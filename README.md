# EF-battery
jsPsych code for executive functioning battery

# Structure

 - Combination of three executive functioning tasks:
    1. [Spatial Recall](https://github.com/isaactpetersen/spatial-recall)
    1. [Go/No-Go](https://github.com/isaactpetersen/go-nogo)
    1. [Hearts and Flowers](https://github.com/isaactpetersen/jspsych-hearts-flowers)
- Expected variables from the URL:
    - subject ID: `subid`
    - SONA ID: `sonaid`
- End [Spatial Recall](https://github.com/isaactpetersen/spatial-recall) task when get two wrong in a row
- On finish, redirect to SONA URL to give SONA participants credit, but only if `sonaid` != 0

# To-Do

- Update the SONA `experiment_id` and `credit_token` in the `init.js` and `init-test.js` files in the following folder: `/hearts-flowers/`

# Post-Processing

## Spatial Recall

## Go/No-Go

- set anticipatory responses (RT < 200 ms) to missing for both accuracy and RT
- examine RT in correct go trials only

## Hearts and Flowers

- set anticipatory responses (RT < 200 ms) to missing for both accuracy and RT
- examine RT in correct trials only

# Run the Tasks

## Main Task Link

The tasks can be run from the following link:

https://devpsylab.psychology.uiowa.edu/Tasks/EF-battery/experiment-spatial-recall.html?src=sona&subid=9999&sonaid=99999

Or, alternatively:

https://devpsylab.psychology.uiowa.edu/Tasks/EF-battery/experiment-spatial-recall?src=sona&subid=9999&sonaid=99999

## Individual Tasks

Here are the links to the individual tasks:

### Spatial Recall

https://devpsylab.psychology.uiowa.edu/Tasks/EF-battery/experiment-spatial-recall.html?src=sona&subid=9999&sonaid=99999&chain=false

### Go/No-Go

https://devpsylab.psychology.uiowa.edu/Tasks/EF-battery/experiment-go-no-go.html?src=sona&subid=9999&sonaid=99999&chain=false

### Hearts and Flowers

https://devpsylab.psychology.uiowa.edu/Tasks/EF-battery/experiment-hearts-flowers.html?src=sona&subid=9999&sonaid=99999&chain=false

## Test Versions

For briefer, test versions of the tasks (for troubleshooting), you can run these versions:

### Spatial Recall

https://devpsylab.psychology.uiowa.edu/Tasks/EF-battery/experiment-spatial-recall-test.html?src=sona&subid=9999&sonaid=99999

### Go/No-Go

https://devpsylab.psychology.uiowa.edu/Tasks/EF-battery/experiment-go-no-go-test.html?src=sona&subid=9999&sonaid=99999

### Hearts and Flowers

https://devpsylab.psychology.uiowa.edu/Tasks/EF-battery/experiment-hearts-flowers-test.html?src=sona&subid=9999&sonaid=99999
