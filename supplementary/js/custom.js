requirejs.config({
    "baseUrl": "../supplementary/js",
    "shim": {
        "jquery.md5": ["jquery"]
    }
});

requirejs(['jquery','jquery.md5'],
function ($) {
//     alert("hello");
    
    // assign the user agent string to a Python variable; it will be passed to the hourofci submit button
    Jupyter.notebook.kernel.execute("user_agent = " + "'" + navigator.userAgent + "'");
    
    
    function findCellByTag(tagName) {
        return (Jupyter.notebook.get_cells()
            .filter(
                ({metadata: {tags}}) => tags && tags.includes(tagName)
            )
        );
    }
    
    // execute the 'Init' cells
    // get the init cell index
    var init_cells = findCellByTag('Init').map((cell) => Jupyter.notebook.find_cell_index(cell))
    Jupyter.notebook.execute_cells(init_cells);
    
    // hide input of the 'Hide' cells
    var hide_cells = findCellByTag('Hide');
    var display = true; 
    function toggle() {
        if (display) { 
            for (var c=0; c < hide_cells.length ; c++) { hide_cells[c].input.hide(); }
        }
        else { 
            for (var c=0; c < hide_cells.length ; c++) { hide_cells[c].input.show(); }
        }
        display = !display;
    }
    $(document).ready(toggle);
    $('#toggle_code').click(function() {
        toggle();
    });
    
    // hide output indicator (e.g. `Out [4]:`)
    $(".output_prompt").css("opacity", 0);
    
    // logging
    // retrieve info variables
    var username = location.href.split('/')[4];
    var username_hash = $.md5(username);
    var user_agent_hash = $.md5(navigator.userAgent);
    var lesson = "template"; // TO-DO: retrieve from the path of the lesson
    var lesson_level = "beginner";
    var url_pre = "https://check.hourofci.org:4000/"+username_hash+"/"+user_agent_hash+"/"+lesson+"/"+lesson_level+"/"

    // customize the click function of the play button
    var run_this_cell = $('.run_this_cell');
    run_this_cell.off('click').click(function(event){
        event.stopImmediatePropagation();
    
        // replace that.execute()
        // $(this) instead of this
        var cell_element = $(this).parents('.cell');
        var cell_idx = Jupyter.notebook.get_cell_elements().index(cell_element);
        var cell = Jupyter.notebook.get_cell(cell_idx);
        // Jupyter.notebook.execute_cells(cell_idx); 
        cell.execute();
    
        // hit the API url if it is a question
        var tags = cell.metadata.tags;
        var question_list = ['Q1','Q2','Q3','Q4','Q5','Q6','Q7','Q8'];
        var question = tags.find(item => question_list.includes(item));
        if (question !== undefined) {
            var url = url_pre+question+"/run";
            $.ajax({
                type: 'GET',
                url: url,
                success: function() {
                    console.log("Run "+question);
                },
                error: function() {
                    alert("Error");
                }
            });
        }
    });

});

