let uploadData = {
    type: jsPsychCallFunction,
    async: true,
    func: function (done) {
        let last_trial_data = jsPsych.data.getLastTrialData().trials[0];
        let file_name = "spatial-recall";
        if ("subid" in last_trial_data) {
            file_name += "_" + last_trial_data["subid"] + append_to_datafile;
        }
        let extension = ".csv";

        let current_html = window.location.href.split("/"); //We get the current URL, and separate all the elements by the "/" symbol

        if (current_html[0].startsWith("http")) {
            let save_url = "write_data_new.php"
            let data_dir = "results/spatial-recall/"
            try {
                let response_data = saveData(save_url, data_dir, file_name, extension);
                done(response_data);
            } catch (error) {
                console.error(error);
            }
        } else if (current_html[0].startsWith("file")) {
            jsPsych.data.get().localSave("csv", file_name + extension);
            done(true);
        }
    }
}