# ALIFE 
A dynamic, js/opengl interactive simulation of life and environments.

## Introduction 
ALIFE is an experiment that I created for the sole intention to create my first visual simulation of my generative 
experiments with data structures and artificial intelligence. 

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

## Organism 

Every organism has a to simulate movement

## TODO 

1. Integrate sigmoid neural networks to the organism AI. Have this neural network do predictable behaviour. Eventually
integrate evolution into the speciation process.
2. Create scavengers and full recyclers
3. Integrate water needs and sunlight distribution.
4. Create a genetics system. 
4.5: Create memory for food, predation, and environment.
5. Create a picker for the organisms and food which will display stats. (OPTIONAL) Have the camera track the object while it is clicked and add an escape option.
6. GUI
7. 3D???