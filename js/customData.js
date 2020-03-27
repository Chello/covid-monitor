var createPoints = function(topic, field, increment = false) {
    var toRet = $.map(topic, function(val) {
        return val[this.field];
    }.bind({field: field}));
    if (!increment) return toRet;
    else return createIncrement(toRet);
}

var createIncrement = function(arr) {
    var toRet = [0];
    for (var i = 1; i < arr.length; i++) {
        toRet[i] = arr[i] - arr[i-1];
    }
    return toRet;
}