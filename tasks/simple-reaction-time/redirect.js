function redirectToNextPage() {

    let last_trial_data = jsPsych.data.getLastTrialData().trials[0];
    if (last_trial_data["chain"] !== "false") {
        if ("sonaid" in last_trial_data) {
            let sonaid = last_trial_data["sonaid"];

            if (sonaid !== "0") {
                let experiment_id = "INSERT_HERE";
                let credit_token = "INSERT_HERE";
                window.location = "https://uiowa-psych.sona-systems.com/webstudy_credit.aspx?experiment_id=" + experiment_id + "&credit_token=" + credit_token + "&survey_code=" + sonaid;
            }
        }
    }
}