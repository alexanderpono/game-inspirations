import {app} from './app.js';


function onResize(){
    function onResize1() {
        var h = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        let a_canvas = document.getElementById('a_canvas');
        a_canvas.width = document.body.clientWidth-2;
        a_canvas.height = h-3;

        app.onResize();

    }

    onResize1();

    if (isMobileOrTablet()) {
        console.log('isMobileOrTablet onResize()');
        window.setTimeout(function() {
            onResize1();
        }, 200);
    }
}


window.addEventListener('resize', onResize, true);

window.onload = function() {
    app.intro();
};



