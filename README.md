# lessons-dev
This is a working repository for the development and refinement of Hour of CI lessons. Lessons in this repository will likely be partially broken.

To load this repository using the Hour of CI environment you should use the following URL:

http://pilot.hourofci.org/hub/user-redirect/git-pull?repo=https%3A%2F%2Fgithub.com%2Fhourofci%2Flessons-dev&app=notebook
  
This will automatically pull the lessons in development and make them available on Hour of CI in the 'lessons-dev' folder.  

## Adding a new notebook

To add a new Jupyter Notebook to a lesson:

  1. Copy the template.ipynb file from the 'template' folder. It contains several special cells and additional header information that is useful for Hour of CI lesson notebooks.
  
  2. Figure out the path and name of the new notebook. For example if you are creating the fifth spatial-thinking notebook a path may be:
  
    spatial-thinking/spatial-thinking-5.ipynb
	
	Use this path to enable Hour of CI to trust this new notebook. We do this by adding it to the 'postBuild' file.
	
	jupyter trust spatial-thinking/spatial-thinking-5.ipynb
	
	

Make sure to test the material using a small screen size:

In Chrome you can use 'Window Resizer' to set different sizes.
The target size is a 11-13" netbook.
https://chrome.google.com/webstore/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh?hl=en