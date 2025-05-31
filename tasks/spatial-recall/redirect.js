function redirectToNextPage(address) {

    if ((window.location.href).indexOf('?') !== -1) {
        let variables = window.location.href.split('?')[1];
        address += "?" + variables;
    }

    let last_trial_data = jsPsych.data.getLastTrialData().trials[0];
    if (last_trial_data["chain"] !== "false") {
        window.location = address;
    }

}