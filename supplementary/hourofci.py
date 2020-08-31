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

def out():
    pass

# Add user_agent parameter, which is from the notebook
def SubmitBtn(user_agent, lesson, lesson_level, question,widget,out_func=out):
    """ Display a submit button

    Input:
    lesson (e.g., "geospatial-data")
    lesson_level (e.g., "beginner")
    question - defined behind instead of in the notebooks
    widget - the widget of which value will be submitted
    out_func - printing after the button is clicked
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

        # Retrieve username
        if str(getpass.getuser()).split('-')[0] == "jupyter":
            username = str(getpass.getuser()).split('-')[1] # In Jupyterhub, getuser() = Jupyter-username
        else:
            username = str(getpass.getuser())
        # Encode username
        username_hash = hashlib.md5(username.encode()).hexdigest()

        # Encode user agent
        user_agent_hash = hashlib.md5(user_agent.encode()).hexdigest()

        # Add username 
        # Add user agent
        url = "https://{}:{}/{}/{}/{}/{}/{}/{}".format(host, port, username_hash, user_agent_hash, lesson, lesson_level, question, answer)
        # print(url)
        # Send_request
        r = requests.get(url)

        # Print widget value
        with output:
            output.clear_output()
            print("Your answer is: "+widget.value)
            if r.status_code == requests.codes.ok:
                print("Submit Successfully!\n")
            out_func()
    
    button.on_click(submit)
