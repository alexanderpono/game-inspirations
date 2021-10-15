export var UITimer = {
    m_instanceName : 'UI.UITimer',
    SIMTime: null,

    init : function() {
    },

    draw : function()
    {
        var modelTime = this.SIMTime.getModelTime();
        var timeSec = Math.round(modelTime / 1000);
    }

};


