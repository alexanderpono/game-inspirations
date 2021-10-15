export var SIMBird = {
    m_instanceName : 'SIM.SIMBird',
    m_m : 0.05,
    m_g : 2* 0.98,
    m_aLift : 4*0.98,

    m_dt : 1,

    m_startX : 10.5,
    m_lastX : 0,
    m_vX : 3,
    m_distance : 0,

    m_startY : 10,
    m_lastY : 0,
    m_y : 0,


    m_startVY : 3.0,
    m_lastVY : 3.0,
    m_vY : 0,

    m_a : 0,

    m_r : 0.66,
    UIViewPort: null,
    UIKB: null,

    init : function(dt)
    {
        if (typeof (dt) != "undefined")
        {
            this.m_dt = dt;
        };

    },

    getSimR() {
        return this.m_r;
    },

    start : function()
    {
        this.m_startX = this.UIViewPort.getVPModelW() / 4;

        this.m_x       = this.m_startX;
        this.m_lastX   = this.m_x;

        this.m_y       = this.m_startY;
        this.m_lastY   = this.m_y;
        this.m_vY      = this.m_startVY;
        this.m_lastVY  = this.m_startVY;
    },

    calc : function()
    {
        this.calcX();
        this.calcY();
        this.m_distance = this.m_x - this.m_startX;
    },

    calcX : function()
    {
        this.m_x       = this.m_lastX + (this.m_vX * this.m_dt);

        this.m_lastX   = this.m_x;
    },


    calcY : function()
    {
        var liftEnabled = 0;
        if  (this.UIKB.getKeyPressed())
        {
            liftEnabled = 1.0;
        };

        this.m_a    = -this.m_g + (liftEnabled * this.m_aLift);
        this.m_vY   = this.m_lastVY + (this.m_a * this.m_dt);
        this.m_y    = this.m_lastY + (this.m_vY * this.m_dt);

        this.m_lastVY  = this.m_vY;
        this.m_lastY   = this.m_y;
    },

    getY : function ()
    {
        return this.m_y;
    },

    getX : function ()
    {
        return this.m_x;
    },

    getR : function ()
    {
        return this.m_r;
    },

    getDistance : function ()
    {
        return this.m_distance;
    }

};

