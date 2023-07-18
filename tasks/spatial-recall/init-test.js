limit_error_to_end_task = 1;
time_instructions = 1;

//We initialize jsPsych
var jsPsych = initJsPsych({
    override_safe_mode: true, //We keep this here for test purposes, as we're running the code locally for now. If we remove it, we get a warning that some jsPsych functions only work online.
    on_finish: function() {
        last_trial_data = jsPsych.data.getLastTrialData().trials[0];
        file_name = "spatial-recall";
        if ("subid" in last_trial_data){
            file_name += "-" + last_trial_data["subid"];
        };
        file_name += ".csv";

        current_html = window.location.href.split("/");
        redirect_html = ""
        
        for (i = 0; i < current_html.length - 1; i++) {
            redirect_html += current_html[i] + "/"
        };

        save_url = redirect_html + "write_data_new.php"
        data_dir = redirect_html + "results/spatial-recall/"

        if (current_html[0].startsWith("http")) {
            console.log("Detecting HTTP, loading the saving data function...");
            saveData(save_url, data_dir, file_name);

        } else if (current_html[0].startsWith("file")) {
            jsPsych.data.get().localSave("csv", file_name);
        }

        // We add the task to the URL
        redirect_html += "experiment-go-no-go-test.html";

        // We add the variables that we have in the URL
        if((window.location.href).indexOf('?') != -1) {

          var variables = window.location.href.split('?')[1]; 
          redirect_html += "?" + variables;

        };

        // We redirect to the next task
        // window.location = redirect_html;    
    }
});

function saveData(save_url, data_dir, file_name) {
    console.log("Opening an XML request...");
    var xhr = new XMLHttpRequest();
    xhr.open('POST', save_url); // 'write_data_new.php' is the path to the php file described above.
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log("Sending to the PHP function...");
    xhr.send(JSON.stringify({file_name: file_name, data_dir: data_dir, data: jsPsych.data.get()}));
}