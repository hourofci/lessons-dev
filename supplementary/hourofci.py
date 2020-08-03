import ipywidgets as widgets
import requests
# Retrieve username
import getpass
# Encoding
import hashlib

# Execute a notebook
import io
import nbformat 
from IPython import get_ipython

# v7 - Add user_agent parameter, which is from the notebook
def SubmitBtn(user_agent,lesson,lesson_level,question,widget):
    """ Display a submit button

    Input:
    lesson (e.g., "geospatial-data")
    lesson_level (e.g., "beginner")
    question - defined behind instead of in the notebooks
    widget - the widget of which value will be submitted
    """

    # Submit button
    button = widgets.Button(
        description = 'Submit',
        disabled = False,
        button_style = '',
        icon = 'check'
    )
    
    display(button)
    
    # Output
    output = widgets.Output()
    display(output) 
    

    # Submit function
    def submit(b):

        # Logging
        host = "check.hourofci.org"
        port = "4000" 
        answer = widget.value

        # v6 - Retrieve username
        if str(getpass.getuser()).split('-')[0] == "jupyter":
            username = str(getpass.getuser()).split('-')[1] # In Jupyterhub, getuser() = Jupyter-username
        else:
            username = str(getpass.getuser())
        # v7 - Encode username
        username_hash = hashlib.md5(username.encode()).hexdigest()

        # v7 - Encode user agent
        user_agent_hash = hashlib.md5(user_agent.encode()).hexdigest()

        # v6 - Add username 
        # v7 - Add user agent
        url = "https://{}:{}/{}/{}/{}/{}/{}/{}".format(host, port, username_hash, user_agent_hash, lesson, lesson_level, question, answer)
        # print(url)
        # Send_request
        r = requests.get(url)

        # Print widget value
        with output:
            output.clear_output()
            print(widget.value)
            if r.status_code == requests.codes.ok:
                print("Submit Successfully!")
    
    button.on_click(submit)



# v8 - Add a run button to run a cell and record this action
def RunBtn(user_agent,lesson,lesson_level,nbfilename,code_tag):
    """ Display a run button

    Input:
    lesson (e.g., "geospatial-data")
    lesson_level (e.g., "beginner")
    nbfilename - name of the current jupyter notebook
    code_tag - tags of the code cell we want to run (e.g., "Q1")
    """

    # Run button
    button = widgets.Button(
        description = '   Run',
        disabled = False,
        button_style = '',
        icon = 'step-forward'
    )
    
    display(button)
    
    # Output
    output = widgets.Output()
    display(output) 
    
    # Run function
    def run(b):
        output.clear_output()

        # v8 - Run a cell
        # TODO: add the path of the file
        nbfile = nbfilename+".ipynb"
        execute_notebook_cell(nbfile,code_tag)

        # Logging
        host = "check.hourofci.org"
        port = "4000" 

        # Retrieve username
        if str(getpass.getuser()).split('-')[0] == "jupyter":
            username = str(getpass.getuser())
        else:
            username = str(getpass.getuser()).split('-')[1] # In Jupyterhub, getuser() =jupyter-username
        # Encode username
        username_hash = hashlib.md5(username.encode()).hexdigest()

        # Encode user agent
        user_agent_hash = hashlib.md5(user_agent.encode()).hexdigest()

        url = "https://{}:{}/{}/{}/{}/{}/{}/{}".format(host, port, username_hash, user_agent_hash, lesson, lesson_level, code_tag, "Run")
        # Send_request
        r = requests.get(url)
        # print(r.status_code)

        # Give feedback if run sucessfully
        with output:
            # output.clear_output()
            if r.status_code == requests.codes.ok:
                print("\n\nRun Successfully!")

    def execute_notebook_cell(nbfile,code_tag):
        """ Execute the specific cells in a notebook
        """
        with io.open(nbfile) as f:
            nb = nbformat.read(f, 4)      
        
        ip = get_ipython()
    
        # The results are shown in the output area so they can be cleared
        with output:
            for cell in nb.cells:
                if 'tags' in cell.metadata and code_tag in cell.metadata.tags:
                    ip.run_cell(cell.source)
    
    button.on_click(run)


# def execute_notebook_cell(nbfile,code_tag):
#     """ Execute the specific cells in a notebook
#     """
#     with io.open(nbfile) as f:
#         nb = nbformat.read(f, 4)      
        
#     ip = get_ipython()
    
#     for cell in nb.cells:
#         if 'tags' in cell.metadata and code_tag in cell.metadata.tags:
#             ip.run_cell(cell.source)


