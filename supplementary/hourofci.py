import ipywidgets as widgets
from ipywidgets import Layout
import requests
# Encoding
import hashlib

# Default response of a question
# def out():
#     print("Answer successfully submitted.\n")
def out():
    pass

# Add user_agent parameter, which is from the notebook
def SubmitBtn(user_agent, lesson, lesson_level, question,widget,out_func=out,text="Submit",test=False):
    """ Display a submit button

    Input:
    lesson (e.g., "geospatial-data")
    lesson_level (e.g., "beginner")
    question - defined behind instead of in the notebooks
    widget - the widget of which value will be submitted
    out_func - printing after the button is clicked (default output is "Answer successfully submitted.\n")
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

        # Encode user agent
        user_agent_hash = hashlib.md5(user_agent.encode()).hexdigest()
        
        if test:
            url = "https://{}:{}/test/{}/{}/{}/{}/{}".format(host, port, user_agent_hash, lesson, lesson_level, question, str(answer))
        else:
            url = "https://{}:{}/{}/{}/{}/{}/{}".format(host, port, user_agent_hash, lesson, lesson_level, question, str(answer))
            
        # Send_request
        r = requests.get(url)

        # Print widget value
        with output:
            output.clear_output()
            
            if type(widget) != str:
                # print("Your answer is: " + str(answer))
                pass 
            
            if r.status_code == requests.codes.ok:
                print("Answer successfully submitted.\n")
                
            out_func()
    
    button.on_click(submit)
