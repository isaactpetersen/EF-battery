var upload_data = {
    type: jsPsychCallFunction,
    async: true,
    func: function(done) {
        last_trial_data = jsPsych.data.getLastTrialData().trials[0];
        file_name = "go-no-go";
        if ("subid" in last_trial_data){
            file_name += "_" + last_trial_data["subid"] + append_to_datafile;
        };
        extension = ".csv";

        current_html = window.location.href.split("/"); //We get the current URL, and separate all the elements by the "/" symbol

        if (current_html[0].startsWith("http")) {
            save_url = "write_data_new.php"
            data_dir = "results/go-no-go/"
            try {
                var response_data = saveData(save_url, data_dir, file_name, extension);
                done(response_data);
            } catch (error) {
                console.error(error);
            }
        } else if (current_html[0].startsWith("file")) {
            jsPsych.data.get().localSave("csv", file_name + extension);
            done(true);
        };

    }
}

function saveData(save_url, data_dir, file_name, extension) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', save_url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve();
                } else {
                    reject(new Error('Error saving data: ' + xhr.status));
                }
            }
        };
    xhr.send(JSON.stringify({file_name: file_name, extension: extension, data_dir: data_dir, data: jsPsych.data.get().csv()}));
    });
}