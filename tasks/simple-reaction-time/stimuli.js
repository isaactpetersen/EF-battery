/**
 * Returns a random number from an exponential distribution, times it by 1000 to get a time in milliseconds
 * (max. 4500 ms), and adds a delay if specified.
 * @returns {number} A random number from an exponential distribution.
 */
function getTrialTime(delay = 0) {
    return Math.min(-Math.log(Math.random()) * 1000 + delay, maxTimeBeforeStimulus);
}

let practiceStimuliBlockStimuli = [];
for (let i = 0; i < numberOfTrialsPractice; i++) {
    let trial_time = getTrialTime(minTimeBeforeStimulus);
    practiceStimuliBlockStimuli.push({
        time_before_stimulus: trial_time,
        trial_duration: trial_time + durationStimulus,
        data: {
            trial_id: "stim",
            phase: "practice",
            timeBeforeStimulus: trial_time
        },
    });
}

let testBlocksStimuli = [];
for (let i = 0; i < numberOfBlocksTest; i++) {
    let testBlockStimuli = [];
    for (let j = 0; j < numberOfTrialsPerBlockTest; j++) {
        let trial_time = getTrialTime(minTimeBeforeStimulus);
        testBlockStimuli.push({
            time_before_stimulus: trial_time,
            trial_duration: trial_time + durationStimulus,
            data: {
                trial_id: "stim",
                phase: "test",
                timeBeforeStimulus: trial_time
            },
        });
    }
    testBlocksStimuli.push(testBlockStimuli);
}
