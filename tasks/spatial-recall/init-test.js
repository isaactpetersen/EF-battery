limit_error_to_end_task = 1;
time_instructions = 1;

//We initialize jsPsych
var jsPsych = initJsPsych({
    on_finish: function() {
        last_trial_data = jsPsych.data.getLastTrialData().trials[0];
        file_name = "spatial-recall";
        if ("subid" in last_trial_data){
            file_name += "-" + last_trial_data["subid"] + "_test";
        };
        extension = ".csv";

        current_html = window.location.href.split("/");
        redirect_html = ""
        
        for (i = 0; i < current_html.length - 1; i++) {
            redirect_html += current_html[i] + "/"
        };

        // We add the task to the URL
        redirect_html += "experiment-go-no-go-test.html";

        if (current_html[0].startsWith("http")) {
            save_url = "write_data_new.php"
            data_dir = "results/spatial-recall/"
            saveAndRedirect(save_url, data_dir, file_name, extension, redirect_html);

        } else if (current_html[0].startsWith("file")) {
            save_url = redirect_html + "write_data_new.php"
            data_dir = redirect_html + "results/spatial-recall/"
            jsPsych.data.get().localSave("csv", file_name + extension);
            redirectToNextPage(redirect_html);
        };
    }
});

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

async function saveAndRedirect(save_url, data_dir, file_name, extension, redirect_html) {
    try {
        await saveData(save_url, data_dir, file_name, extension);
        redirectToNextPage(redirect_html);
    } catch (error) {
        console.error(error);
    }
}

function redirectToNextPage(redirect_html) {

    if((window.location.href).indexOf('?') != -1) {
        var variables = window.location.href.split('?')[1]; 
        redirect_html += "?" + variables;
    };

    last_trial_data = jsPsych.data.getLastTrialData().trials[0];
    if(last_trial_data["chain"] != "false"){
        window.location = redirect_html;
    };  

}