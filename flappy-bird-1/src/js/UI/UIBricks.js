import {SIM} from '../SIM/SIM.js';

export var UIBricks = {
    m_instanceName : "UI.UIBricks",
    m_screenW : 20,
    m_simW : 0,
    m_kAr : "",
    UIViewPort: null,
    SIMBird: null,

    init : function()
    {
        this.m_kAr  = this.UIViewPort.getK();
        var kX      = this.m_kAr[0];
        this.m_simW = 1;
    },

    draw : function()
    {
        var dataAr     = SIM.SIMBricks.getData();
        var kY         = this.m_kAr[1];
        let kX          = this.m_kAr[0];
        var distance   = this.SIMBird.getDistance();
        var VPModelW   = this.UIViewPort.getVPModelW();

        var i;
        let {ctx} = this.UIViewPort.getRenderContext();
        ctx.strokeStyle = "rgb(255,255,255)";
        for (i=0; i<dataAr.length; i++)
        {
            var brickAr = dataAr[i];
            var simX = brickAr[0];
            var simY = brickAr[1];
            var simH = brickAr[2];

            if ((simX + this.m_simW) < distance) {
                continue;
            };

            if (simX > (distance + VPModelW))
            {
                continue;
            };

            var screenX = this.UIViewPort.modelXToScreenX(simX);
            var screenY = this.UIViewPort.modelYToScreenY(simY);
            var screenH = simH * kY;

            var screenY2 = screenY - screenH;
            var screenW = this.m_simW * kX;
            var screenW2 = screenW / 2;

            ctx.strokeRect(screenX, screenY2, screenW, screenH);

        };

    },

    getBrickSimW : function()
    {
        return this.m_simW;
    }

};
