# ALIFE 
A dynamic, js/opengl interactive simulation of life and 
environments.


## Environment 

The environment object allows us to acess a simulated 2D flat map of size X by Y. The environment contains all information of organisms and systems within the simulation.

Objects (systems, organisms) and their respective data is contained within the `objectMap` field. An environment's `objectMap` is a Map of the form:

    {
        [x, y] : {
            objects: {
                id: {
                    information...
                },
                ...
            }
        },
        ...
    }



## Renderer 

ThreeJS is used for rendering the simulation. But their does exist a data pipeline made for the rendered environment as opposed to the used environment. 

