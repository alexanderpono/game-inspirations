import {UI_echo} from '../API.js';

let canvas = null;
let ctx = null;
export var UIViewPort = {
    m_instanceName : 'UI.UIViewPort',
    m_viewPortH : 300,
    m_viewPortW : 500,
    m_viewPortModelH : 20,
    m_viewPortModelW : 0,
    m_kX : 0,
    m_kY : 0,
    m_scrollViewPort : true,
    SIMBird: null,

    init : function(newW, newH) {
        this.resize(newW, newH);
    },

    draw : function()  {
        let {ctx, canvas} = this.getRenderContext();
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    },

    modelYToScreenY : function(modelY)
    {
        var screenY = this.m_viewPortH - Math.round(this.m_kY * modelY);
        return screenY;
    },

    modelXToScreenX : function(modelX)
    {
        var distance = this.SIMBird.getDistance();
        if (!this.m_scrollViewPort)
        {
            distance = 0;
        };
        var screenX = Math.round(this.m_kX * (modelX - distance));
        return screenX;
    },

    getK : function ()
    {
        return new Array(this.m_kX, this.m_kY);
    },

    getVPModelW : function ()
    {
        return this.m_viewPortModelW;
    },

    getVPModelH : function ()
    {
        return this.m_viewPortModelH;
    },

    resize(newW, newH) {
        this.m_viewPortW = newW;
        this.m_viewPortH = newH;

        this.m_viewPortModelW = this.m_viewPortModelH / this.m_viewPortH * this.m_viewPortW;

        this.m_kX = this.m_viewPortW / this.m_viewPortModelW;

        this.m_kY = this.m_viewPortH / this.m_viewPortModelH;
    },

    getRenderContext() {
        if (ctx === null) {
            canvas = document.getElementById('a_canvas');
            ctx = canvas.getContext("2d");
        };
        return {ctx, canvas};
    }

};

