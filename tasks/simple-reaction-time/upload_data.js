let upload_data = {
    type: jsPsychCallFunction,
    async: true,
    func: function (done) {
        let last_trial_data = jsPsych.data.getLastTrialData().trials[0];
        let file_name = "simple-reaction-time";
        if ("subid" in last_trial_data) {
            file_name += "_" + last_trial_data["subid"] + append_to_datafile;
        }
        let extension = ".csv";

        let current_html = window.location.href.split("/"); // We get the current URL, and separate all the elements by the "/" symbol

        if (current_html[0].startsWith("http")) {
            let save_url = "write_data_new.php"
            let data_dir = "results/simple-reaction-time/"
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

function saveData(save_url, data_dir, file_name, extension) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', save_url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve();
                } else {
                    reject(new Error('Error saving data: ' + xhr.status));
                }
            }
        };
        xhr.send(JSON.stringify({
            file_name: file_name,
            extension: extension,
            data_dir: data_dir,
            data: jsPsych.data.get().csv()
        }));
    });
}