import {SIM} from '../SIM/SIM.js';


export var UIKeyBoard = {
    m_instanceName : 'UI.UIKeyBoard',
    m_esc : false,
    m_keyPressed : false,

    init : function() {
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            if (keyName === ' ') {
                event.preventDefault();
            }
            if (keyName === 'Escape') {
                this.m_esc = true;
            }
            else {
                this.m_keyPressed = true;
            }
            if (SIM.gameIsOver() || SIM.isIntro()) {
                SIM.restartGame();
            }
        });

        document.addEventListener('keyup', (event) => {
            this.m_keyPressed = false;
        });

        let a_canvas = document.getElementById('a_canvas');

        a_canvas.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.m_keyPressed = true;

            if (SIM.gameIsOver() || SIM.isIntro()) {
                SIM.restartGame();
            }
        });

        a_canvas.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.m_keyPressed = false;
        });
    },

    getKeyPressed : function()
    {
        return this.m_keyPressed;
    }

};

