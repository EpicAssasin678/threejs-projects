# Dev Log

## 4/17/23 

Optomizing and testing. 

So far, there were a LOT of issues with my recent code, one namely being that the method for storing objects in the environment's mapping with respect for coordinates was 
not functional, and as a result didn't work or serve a purpose. 

Within JS, object literal arrays, when passed as a parameter are, like everything in JS, passed by reference. Therefore when retrieving based on position,
the actual implementation faulters and doesn't work. 

Additionally, the wandering method had to change as it was nice, but didn't serve any legitimate purpose since the organism would wander in an ever increasing 
hypotenuse mode of travel. This could work in theory, but is highly inefficient and unlikely to find things in ever-changing environments. Additionally, a 
new method of travelling has been made for wandering which is far more random with memory to prevent backtracking. 

Currently wandering is moving to a random position within the bounds of remaining movement. Change is randomly x or y. Additionally, memory is an n long array full
of coords previously travelled and is checked before moving to a new coord to prevent a certain amount of backtracking.


Vision needs to be optomized, right now, the average vision of a creature is far 
too low and needs to be increased for environments.

> Update 
I fixed the entirety of my vision, detection, and simulation issues. Although right now this codebase has become quite spaghetti-ish. 

Outlining the general decision making processes for the organisms, I came up with the following map:

![Mind Map][https://viewer.diagrams.net/?tags=%7B%7D&highlight=000000&edit=_blank&layers=1&nav=1&title=Organism%20Decision%20Process#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1SaZB0cG2C9LcF4wtFZg8GxlAzOMRyXjI%26export%3Ddownload]


<img src="https://viewer.diagrams.net/?tags=%7B%7D&highlight=000000&edit=_blank&layers=1&nav=1&title=Organism%20Decision%20Process#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1SaZB0cG2C9LcF4wtFZg8GxlAzOMRyXjI%26export%3Ddownload" />

