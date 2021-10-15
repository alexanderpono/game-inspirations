import {SIM} from '../SIM/SIM.js';
import {INTRO, GAME_OVER} from "../SIM/SIM";

export var UI = {
    UITimer : null,
    UIBirdY : null,
    UIBird : null,
    UIBirdXY : null,
    UIKB : null,
    UIBricks : null,
    UIViewPort : null,
    UIMessage : null,

    initiable: [
        'UITimer', 'UIBirdY','UIBirdXY','UIKB','UIViewPort','UIBricks','UIBird'
    ],
    drawable: [
        'UIViewPort', 'UITimer', 'UIBirdY','UIBird','UIBirdXY','UIBricks','UIMessage'
    ],

    init : function(newW, newH)
    {
        let me = this;
        this.initiable.forEach(function(item, i, arr) {
            me[item].init(newW, newH);
        });

    },

    draw : function()
    {
        let me = this;
        switch (SIM.getState()) {
            case INTRO:
                this.UIViewPort.draw();
                this.UIMessage.draw(INTRO);
                break;

            case GAME_OVER:
                this.drawable.forEach(function(item, i, arr) {
                    me[item].draw(GAME_OVER);
                });
                break;

            default:
                this.drawable.forEach(function(item, i, arr) {
                    if (item !== 'UIMessage') {
                        me[item].draw();
                    };
                });

        }
    }
};




