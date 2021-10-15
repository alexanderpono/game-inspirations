import {SIM, INTRO, GAME_OVER} from '../SIM/SIM.js';
import {UI_echo} from '../API.js';


const atomW = 3;
const atomH = 3;
const LETTER_WIDTH = atomW*3;
const LINE_HEIGHT = atomW*5;

const PRIMITIVES_AR = [
    [0.0,0.0, 0.0,0.0],     //
    [0.0,4*atomH, atomW,4*atomH],    //P_1
    [atomW,4*atomH, 2*atomW,4*atomH],//P_2

    [0.0,3*atomH, atomW,3*atomH],    //P_3
    [atomW,3*atomH, 2*atomW,3*atomH],//P_4

    [0.0,2*atomH, atomW,2*atomH],    //P_5
    [atomW,2*atomH, 2*atomW,2*atomH],//P_6

    [0.0,atomH, atomW,atomH],        //P_7
    [atomW,atomH, 2*atomW,atomH],    //P_8

    [0.0,0.0, atomW,0.0],            //P_9
    [atomW,0.0, 2*atomW,0.0],        //P_10

    [0.0,3*atomH, 0.0,4*atomH],        //P_11
    [atomW,3*atomH, atomW,4*atomH],    //P_12
    [2*atomW,3*atomH, 2*atomW,4*atomH], //P_13

    [0.0,2*atomH, 0.0,3*atomH],        //P_14
    [atomW,2*atomH, atomW,3*atomH],    //P_15
    [2*atomW,2*atomH, 2*atomW,3*atomH],//P_16

    [0.0,atomH, 0.0,2*atomH],        //P_17
    [atomW,atomH, atomW,2*atomH],    //P_18
    [2*atomW,atomH, 2*atomW,2*atomH],//P_19

    [0.0,0.0, 0.0,atomH],            //P_20
    [atomW,0.0, atomW,atomH],        //P_21
    [2*atomW,0.0, 2*atomW,atomH],    //P_22

    [0.0,0.0, 0.0,0.0],     //23
    [0.0,0.0, 0.0,0.0],     //24
    [0.0,0.0, 0.0,0.0],     //25
    [0.0,0.0, 0.0,0.0],     //26
    [0.0,0.0, 0.0,0.0],     //27
    [0.0,0.0, 0.0,0.0],     //28
    [0.0,0.0, 0.0,0.0],     //29
    [0.0,0.0, 0.0,0.0],     //30

    [0.0,4*atomH, atomW,2*atomH],       //P_31
    [atomW,2*atomH, 2*atomW,4*atomH],   //P_32
    [0.0,0.0, atomW,2*atomH],           //P_33
    [ atomW,2*atomH, 2*atomW,0.0],      //P_34
    [0.0,4*atomH, atomW,0.0],           //P_35
    [atomW,0.0, 2*atomW,4*atomH],       //P_36
    [0.0,3*atomH, atomW,4*atomH],       //P_37
    [atomW,4*atomH, 2*atomW,3*atomH],   //P_38
    [2*atomW,atomH, atomW,0.0],         //P_39
    [0.0,atomH, atomW,0.0],             //P_40
    [0.0,0.0, atomW,4*atomH],           //P_41
    [atomW,4*atomH, 2*atomW,0.0],       //P_42
    [2*atomW,3*atomH, atomW,2*atomH],   //P_43
    [atomW,2*atomH, 2*atomW,atomH]      //P_44
];

const LETTERS_AR = [
    [13, 2, 1, 11, 14, 17, 20, 9, 10, 22, 19, 6], //G
    [20, 17, 14, 11, 1, 2, 13, 16, 19, 22, 5, 6], //A
    [11, 14, 17, 20, 13, 16, 19, 22, 31, 32, 0, 0], //M
    [2, 1, 11, 14, 17, 20, 9, 10, 5, 6, 0, 0], //E
    [1, 2, 13, 16, 19, 22, 9, 10, 20, 17, 14, 11], //O
    [35, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //V
    [1, 2, 13, 16, 6, 5, 14, 11, 17, 20, 34, 0], //R
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //SPACE
    [1, 2, 12, 15, 18, 21, 0, 0, 0, 0, 0, 0], //T
    [1, 38, 16, 19, 39, 9, 20, 17, 14, 11, 0, 0], //D
    [1, 2, 12, 15, 18, 21, 9, 10, 0, 0, 0, 0], //I
    [2, 1, 11, 14, 17, 20, 23, 24, 9, 10, 0, 0], //C
    [1, 2, 13, 16, 6, 5, 14, 11, 17, 20, 0, 0], //P
    [11, 14, 17, 20, 9, 10, 0, 0, 0, 0, 0, 0],  //L
    [31, 32, 18, 21, 0, 0, 0, 0, 0, 0, 0, 0],  //Y
    [2, 1, 11, 14, 5, 6, 19, 22, 9, 10, 0, 0],  //S
    [20, 17, 14, 11, 31, 34, 22, 19, 16, 13, 0, 0],  //N
    [2, 1, 11, 14, 17, 20, 5, 6],  //F
    [11, 14, 17, 20, 9, 10, 22, 19, 16, 13, 0, 0],  //F
    [11, 14, 17, 20, 1, 38, 43, 44, 39, 9, 5, 0]  //B
];

const L_G = 0, L_A=1, L_M=2, L_E=3, L_O=4, L_V=5, L_R=6, L_SPACE=7, L_T=8, L_D=9, L_I=10,
    L_C=11, L_P=12, L_L=13, L_Y=14, L_S=15, L_N=16, L_F=17, L_U=18, L_B=19;
const letterToCode = {
    'G' : 0,
    'A' : 1,
    'M' : 2,
    'E' : 3,
    'O' : 4,
    'V' : 5,
    'R' : 6,
    ' ' : 7,
    'T' : 8,
    'D' : 9,
    'I' : 10,
    'C' : 11,
    'P' : 12,
    'L' : 13,
    'Y' : 14,
    'S' : 15,
    'N' : 16,
    'F' : 17,
    'U' : 18,
    'B' : 19
};

export var UIMessage = {
    GAME_OVER: 1,
    GAME_ABOUT: 2,
    UIViewPort: null,
    color: "rgb(255,255,0)",
    bgColor: "rgb(0,0,0)",
    init(msgType) {
        if (msgType === GAME_OVER) {

        }
    },

    draw(state) {
        let message = '';
        let isMobileOrTablet = window.isMobileOrTablet();
        let task = 'PRESS A BUTTON';
        if (isMobileOrTablet) {
            task = 'TAP SCREEN';
        };
        switch (state) {
            case INTRO:
                message = `FLYING BALL\n${task}\nTO PLAY`;

                break;
            case GAME_OVER:
                message = `GAME OVER\n${task}\nTO PLAY`;
                break;
            default:
                message = '';
        }

        this.renderText(message);
    },

    renderText(text) {
        let lettersAr = text.split('');
        let [lettersNumber, linesNumber] = this.getMaxLettersNumberInLine(lettersAr);

        let viewPortW = this.UIViewPort.m_viewPortW;
        let viewPortH = this.UIViewPort.m_viewPortH;
        let kX = this.getKX(lettersNumber, linesNumber);

        let messageSize = {
            x: lettersNumber * LETTER_WIDTH * kX,
            y: linesNumber * LINE_HEIGHT * kX};
        let messagePos = {
            x: (viewPortW - messageSize.x) / 2.0,
            y: (viewPortH - messageSize.y) / 2.0
        };

        this.renderBox(messagePos, messageSize);
        this.zoomSocial(kX);

        const lettersDX = 2*kX;
        const lettersDY = -2*kX;

        let lineNo = 0;
        let letterNo = 0;
        for (let i=0; i<lettersAr.length; i++) {
            let letter = lettersAr[i];
            if (letter === '\n') {
                letterNo = 0;
                lineNo++;
                continue;
            };
            let letterPos = {
                x: messagePos.x + lettersDX + (LETTER_WIDTH * letterNo * kX),
                y: messagePos.y + lettersDY + lineNo * LINE_HEIGHT * kX
            }

            this.renderLetter(letterPos, letter, kX);
            letterNo++;
        }
    },

    zoomSocial(kX) {
        let newSize = 10 * kX;
        let newSizeS = '' + newSize + 'px';

        let sh = document.getElementsByClassName('sh')[0];
        sh.style.width = newSizeS;
        sh.style.height = newSizeS;

        let fb = document.getElementsByClassName('fb')[0];
        fb.style.width = newSizeS;
        fb.style.height = newSizeS;

        let ig = document.getElementsByClassName('ig')[0];
        ig.style.width = newSizeS;
        ig.style.height = newSizeS;

    },

    getKX(lettersNumber, linesNumber) {
        let viewPortW = this.UIViewPort.m_viewPortW;
        let viewPortH = this.UIViewPort.m_viewPortH;
        let kX = Math.floor(viewPortW / lettersNumber / LETTER_WIDTH);
        if (kX < 0.1) {
            kX = viewPortW / lettersNumber / LETTER_WIDTH;
        }
        let kY = Math.floor(viewPortH / linesNumber / LINE_HEIGHT);
        if (kY < 0.1) {
            kY = viewPortH / linesNumber / LINE_HEIGHT;
        }
        if (kY < kX) {
            kX = kY;
        };
        const maxKX = 6;
        if (kX > maxKX) {
            kX = maxKX;
        };
        return kX;
    },

    getMaxLettersNumberInLine(lettersAr) {
        let linesLettersCount = [];
        let lineNo = 0;
        let letterNo = 0;
        for (let i=0; i<lettersAr.length; i++) {
            let letter = lettersAr[i];
            if (letter === '\n') {
                letterNo = 0;
                lineNo++;
                continue;
            };
            letterNo++;
            linesLettersCount[lineNo] = letterNo;
        };

        let maxLength = -1;
        linesLettersCount.forEach((count) => {
            if (count > maxLength) {
                maxLength = count;
            };
        });
        return [maxLength, linesLettersCount.length];
    },

    renderLetter(letterPos, letter, kX) {
        let letterCode = letterToCode[letter];
        let letterPrimitivesAr = LETTERS_AR[letterCode];

        for (let j=0; j<letterPrimitivesAr.length; j++) {
            let primitiveCode = letterPrimitivesAr[j];
            if (primitiveCode === 0) {
                continue;
            };

            let primitiveAr = PRIMITIVES_AR[primitiveCode];

            this.renderPrimitive (primitiveAr, kX, letterPos);
        }

    },

    renderPrimitive (primitiveAr, kX, letterPos) {
        let primitiveX0 = primitiveAr[0];
        let primitiveY0 = primitiveAr[1];
        let primitiveX1 = primitiveAr[2];
        let primitiveY1 = primitiveAr[3];
        let viewPortH = this.UIViewPort.m_viewPortH;


        let x0 = Math.floor(letterPos.x + primitiveX0 * kX);
        let y0 = Math.floor(letterPos.y + (LINE_HEIGHT - primitiveY0) * kX);
        if (y0 > viewPortH) {
            y0 = viewPortH - 1;
        };

        let x1 = Math.floor(letterPos.x + primitiveX1 * kX);
        let y1 = Math.floor(letterPos.y + (LINE_HEIGHT - primitiveY1) * kX);
        if (y1 > viewPortH) {
            y1 = viewPortH - 1;
        };

        let {ctx} = this.UIViewPort.getRenderContext();
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.lineTo(x1,y1);
        ctx.stroke();

    },

    renderBox(messagePos, messageSize) {
        let {ctx} = this.UIViewPort.getRenderContext();
        ctx.fillStyle = this.bgColor;
        ctx.fillRect(messagePos.x, messagePos.y, messageSize.x, messageSize.y);
    }
};

