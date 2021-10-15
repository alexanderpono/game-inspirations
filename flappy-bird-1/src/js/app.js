import {UIBirdXY} from "./UI/UIBirdXY";
import {UIBricks} from "./UI/UIBricks";
import {SIMCollide} from "./SIM/SIMCollide";
import {UIBird} from "./UI/UIBird";
import {UIViewPort} from "./UI/UIViewPort";
import {SIMTime} from "./SIM/SIMTime";
import {UIBirdY} from "./UI/UIBirdY";
import {UITimer} from "./UI/UITimer";
import {UIKeyBoard} from "./UI/UIKeyBoard";
import {UIMessage} from "./UI/UIMessage";
import {SIM, INTRO, PLAY, GAME_OVER} from "./SIM/SIM";
import {SIMBricks} from "./SIM/SIMBricks";
import {UI} from "./UI/UI";
import {SIMBird} from "./SIM/SIMBird";

export var app = {
    state : INTRO,

    onResize() {
        this.build();
        this.init();

        switch (this.state) {
            case INTRO:
                this.intro();
                break;

            case PLAY:
                this.intro();
                break;

            case GAME_OVER:
                this.intro();
                break;

        }
    },

    intro() {
        this.build();
        this.init();
        this.state = INTRO;

        SIM.go(INTRO);
    },

    build() {
        SIM.SIMTime = SIMTime;
        SIM.SIMBird = SIMBird;
        SIM.SIMCollide = SIMCollide;
        SIM.SIMBricks = SIMBricks;

        SIM.UI = UI;
        UI.UITimer    = UITimer;
        UI.UIBirdY    = UIBirdY;
        UI.UIBird     = UIBird;
        UI.UIBirdXY   = UIBirdXY;
        UI.UIKB       = UIKeyBoard;
        UI.UIViewPort   = UIViewPort;
        UI.UIBricks   = UIBricks;
        UI.UIMessage   = UIMessage;
        UI.UIBird.UIViewPort     = UI.UIViewPort;
        UI.UIBricks.UIViewPort     = UI.UIViewPort;
        UI.UIMessage.UIViewPort     = UI.UIViewPort;
        SIM.SIMBird.UIViewPort     = UI.UIViewPort;
        SIM.SIMBird.UIKB     = UI.UIKB;
        SIM.SIMCollide.UIViewPort     = UI.UIViewPort;
        UI.UIBirdXY.UIBird = UI.UIBird;
        SIM.SIMBricks.UIViewPort     = UI.UIViewPort;
        SIM.SIMBricks.UIBricks     = UI.UIBricks;
        UI.UITimer.SIMTime = SIM.SIMTime;
        SIM.SIMCollide.SIMBird = SIM.SIMBird;
        UI.UIBirdY.SIMBird = SIM.SIMBird;
        UI.UIBird.SIMBird = SIM.SIMBird;
        UI.UIViewPort.SIMBird = SIM.SIMBird;
        UI.UIBricks.SIMBird = SIM.SIMBird;
        SIM.SIMBricks.SIMBird     = SIM.SIMBird;
    },

    init() {
        SIM.init();
        UI.init(a_canvas.width, a_canvas.height);
    }
}

