var listen = (function(context) {
    return function (varName, varValue, func) {
        //console.log(context);
        var value = varValue;
        Object.defineProperty(context, varName, {
            get: function () {
                return value;
            },
            set: function (v) {
                value = v;
                //console.log("value of " + varName + " changed to " + value);
                //console.log(varName);
                //console.log(context);
                func(eval(varName));
            }
        });
    };
})(window);
