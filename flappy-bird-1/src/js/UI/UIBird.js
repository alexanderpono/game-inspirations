var cycle = 30;
export var UIBird = {
    m_instanceName : 'UI.UIBird',
    m_imgW : 20,
    m_imgH : 20,
    m_x : 0,
    m_y : 0,
    m_imgCenterDX : 0,
    m_imgCenterDY : 0,
    m_simW: 0,
    UIViewPort: null,
    SIMBird: null,

    init () {
        this.m_kAr  = this.UIViewPort.getK();
        const kX      = this.m_kAr[0];
        const kY      = this.m_kAr[1];
        this.m_simW = 2 * this.SIMBird.getSimR();
        this.m_imgW = this.m_simW * kX;
        this.m_imgH = this.m_simW * kY;

        this.m_imgCenterDX = -this.m_imgW / 2;
        this.m_imgCenterDY = -this.m_imgH / 2;
    },

    draw() {
        const modelX = this.SIMBird.getX();
        const modelY = this.SIMBird.getY();

        let oldX = this.m_x;
        let oldY = this.m_y;
        this.m_x = this.UIViewPort.modelXToScreenX(modelX);
        this.m_y = this.UIViewPort.modelYToScreenY(modelY);

        let {ctx, canvas} = this.UIViewPort.getRenderContext();

        if (cycle >= 0) {
            ctx.strokeStyle = "rgb(255,0,0)";

            ctx.beginPath();
            ctx.arc(this.m_x, this.m_y, this.m_imgW/2, 0, 2*Math.PI, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    },

    getXY() {
        return [this.m_x, this.m_y];
    }

};

