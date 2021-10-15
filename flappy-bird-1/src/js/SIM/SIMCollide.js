import {SIM} from './SIM.js';
import {UI_echo} from '../API.js';


export var SIMCollide = {
    m_instanceName : "SIM.SIMCollide",
    m_skyY : 20,
    m_groundY : 0,
    UIViewPort: null,
    SIMBird: null,

    init : function(dt) {
    },

    start : function() {
    },

    collisionWithGround : function()  {
        var birdY = this.SIMBird.getY();
        var r = this.SIMBird.getR();
        var code = false;
        if (birdY - r <= this.m_groundY)
        {
            code = true;
        };

        return code;
    },

    collisionWithSky : function() {
        var birdY = this.SIMBird.getY();
        var r = this.SIMBird.getR();
        var code = false;
        if (birdY + r >= this.m_skyY)
        {
            code = true;
        };

        return code;
    },

    getDistance : function(x0, y0, x1, y1) {
        var dx = x1-x0;
        var dy = y1-y0;

        var d = Math.sqrt(dx*dx + dy*dy);
        return d;
    },

    insideBox : function(x, y, minX, minY, maxX, maxY)
    {
        var insideX = false;
        var insideY = false;

        if ((minX <= x) && (x <= maxX))
        {
            insideX = true;
        };

        if ((minY <= y) && (y <= maxY))
        {
            insideY = true;
        };

        var code = false;
        if (insideX && insideY)
        {
            code = true;
        };

        return code;
    },

    collisionWithBrick : function()
    {
        var brickDataAr   = SIM.SIMBricks.getData();
        var kAr           = this.UIViewPort.getK();
        var kX            = kAr[0];
        var simW          = 20 / kX;
        var birdSimX      = this.SIMBird.getX();
        var birdSimY      = this.SIMBird.getY();
        var birdSimR      = this.SIMBird.getR();

        var bird_xR = birdSimX + birdSimR;
        var bird_yR = birdSimY;
        var bird_xU = birdSimX;
        var bird_yU = birdSimY + birdSimR;
        var bird_xL = birdSimX - birdSimR;
        var bird_yL = birdSimY;
        var bird_xD = birdSimX;
        var bird_yD = birdSimY - birdSimR;



        var i;
        var code = false;
        for (i=0; i<brickDataAr.length; i++)
        {
            var brickAr = brickDataAr[i];
            var simX = brickAr[0];
            var simY = brickAr[1];
            var simH = brickAr[2];

            var xLD  = simX;
            var yLD  = simY;
            var xLU  = xLD;
            var yLU  = yLD + simH;
            var xRD  = simX + simW;
            var yRD  = simY;
            var xRU  = xRD;
            var yRU  = yLU;

            var dLD = this.getDistance(birdSimX, birdSimY, xLD, yLD);
            var dLU = this.getDistance(birdSimX, birdSimY, xLU, yLU);
            var dRD = this.getDistance(birdSimX, birdSimY, xRD, yRD);
            var dRU = this.getDistance(birdSimX, birdSimY, xRU, yRU);
            if (
                (dLD < birdSimR) ||
                (dLU < birdSimR) ||
                (dRD < birdSimR) ||
                (dRU < birdSimR)
            )
            {
                code = true;
                break;
            };


            //circle.L, circle.R, circle.U, circle.D are inside box
            var insideL = this.insideBox(bird_xL, bird_yL, xLD, yLD, xRU, yRU);
            var insideR = this.insideBox(bird_xR, bird_yR, xLD, yLD, xRU, yRU);
            var insideU = this.insideBox(bird_xU, bird_yU, xLD, yLD, xRU, yRU);
            var insideD = this.insideBox(bird_xD, bird_yD, xLD, yLD, xRU, yRU);
            if (
                (insideL) ||
                (insideR) ||
                (insideU) ||
                (insideD)
            )
            {
                code = true;
                break;
            };

        };
        return code;
    }

};

