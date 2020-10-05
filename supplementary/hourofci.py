import ipywidgets as widgets
from ipywidgets import Layout
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
def SubmitBtn(user_agent, lesson, lesson_level, question,widget,out_func=out,text="Submit"):
    """ Display a submit button

    Input:
    lesson (e.g., "geospatial-data")
    lesson_level (e.g., "beginner")
    question - defined behind instead of in the notebooks
    widget - the widget of which value will be submitted
    out_func - printing after the button is clicked (default value is an empty function)
    text - description that shows on the button (default value is "Submit")
    """

    # Submit button
    button = widgets.Button(
        description = text,
        layout=Layout(width='auto', height='auto'),
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
        
        if type(widget) == str: # If a string is passed, this string will be logged as the answer
            answer = widget
        elif type(widget) == list: # If there are multiple widgets, record them in a list
            answer = []
            for i in range(len(widget)):
                answer.append(widget[i].value)
        else:
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
        url = "https://{}:{}/{}/{}/{}/{}/{}/{}".format(host, port, username_hash, user_agent_hash, lesson, lesson_level, question, str(answer))
        # print(url)
        # Send_request
        r = requests.get(url)

        # Print widget value
        with output:
            output.clear_output()
            
            if type(widget) != str:
                # print("Your answer is: " + str(answer))
                pass 
            
            # if r.status_code == requests.codes.ok:
            #     print("Submit Successfully!\n")
            out_func()
    
    button.on_click(submit)
