export var SIMTime = {
    m_instanceName : 'SIM.SIMTime',
    m_startTime : 0,
    m_modelTime : 0,
    m_TICK_STEP : 1000,

    init : function(dtSeconds)
    {
        if (typeof (dtSeconds) != "undefined")
        {
            this.m_TICK_STEP = dtSeconds * 1000;
        };
    },

    getSystemTime : function()
    {
        var time = new Date;
        return time.getTime();
    },

    start : function()
    {
        this.m_startTime = this.getSystemTime();
        this.m_modelTime = 0;
    },

    getSleepTime : function()
    {
        var nextTickTime = this.m_startTime + (this.m_modelTime + this.m_TICK_STEP);
        var curTime = this.getSystemTime();
        var sleepTime = nextTickTime - curTime;
        return sleepTime;
    },

    getModelTime : function()
    {
        return this.m_modelTime;
    },

    newTick : function()
    {
        this.m_modelTime = this.m_modelTime + this.m_TICK_STEP;
    }

};

