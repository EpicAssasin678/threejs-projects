

export const GUI = () => {

    //create a box overtop the canvas
    let gui = document.createElement('div');
    gui.style.position = 'absolute';
    gui.style.top = '0px';
    gui.style.left = '0px';
    gui.style.width = '10%';
    gui.style.height = '10%';
    gui.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    gui.style.zIndex = '10';

    //add a title
    let title = document.createElement('h1');
    title.innerHTML = 'Statistics:';
    gui.appendChild(title);
    
    //add a list of statistics
    let stats = document.createElement('ul');
    stats.id = 'stats';
    gui.appendChild(stats);

    return gui;
}