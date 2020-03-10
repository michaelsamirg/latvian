
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
}

function matchObj(test, name, value) {
    if (Object.prototype.toString.call(test) === "[object Array]") {
        var res = [], obj;
        for (var i=0; i<test.length; i++) {
            obj = (matchObj(test[i], name, value));
            if (obj) res.push(obj);
        }
        return (res.length > 1) ? res : res[0];
    }
    if (Object.prototype.toString.call(test) === "[object Object]") {
        if (test.hasOwnProperty(name)) {
            if (Object.prototype.toString.call(test[name]) === "[object Array]") {
                for (var j=0; j<test[name].length; j++) {
                    if (test[name][j] === value) return test;
                }
            }
            if (test[name] === value) return test;
        }
    }
    return false;
}

function getDeepFieldValue(obj, field, nextlevel) {

    if (Object.prototype.toString.call(obj) === "[object Array]") {
        for (var i=0; i<obj.length; i++) {
            if (getMultilevelValue(obj[i], field)) {
                return getMultilevelValue(obj[i], field);
            } else {
                if (obj[i].hasOwnProperty(nextlevel)) {
                    return getDeepFieldValue(obj[i][nextlevel], field, nextlevel);
                } else {
                    continue;
                }
            }
        }
        //return "undefined";
    } else {
        if (getMultilevelValue(obj, field)) {
            return getMultilevelValue(obj, field);
        } else {
            if (obj.hasOwnProperty(nextlevel)) {
                return getDeepFieldValue(obj[nextlevel], field, nextlevel);
            } else {
                //return false;
            }
        }
    }

}

function doWithObjectOrArray(obj, func) {
    if (Object.prototype.toString.call(obj) === "[object Array]") {
        for (var i=0; i<obj.length; i++) func(obj[i]);
        return;
    }
    if (Object.prototype.toString.call(obj) === "[object Object]") func(obj);
}

function doWithElementOrArray(elem, func) {
    if (Object.prototype.toString.call(elem) === "[object Array]") {
        for (var i=0; i<elem.length; i++) doWithElementOrArray(elem[i], func); //func(elem[i]);
    } else {
        func(elem);
    }
}

function stringFromArray(arr, separator) {
    if (!arr) return "";
    if (Object.prototype.toString.call(arr) === "[object Array]") {
        return arr.join(separator);
    } else {
        return arr.toString();
    }
}

function makeFlatArray(objectsArray, keyField, additionalOperationsFunc) {
    var obj, flatArray = [], field, i, j;
    for (i=0; i<objectsArray.length; i++) {
        for(j=0; j<objectsArray[i][keyField].length; j++) {
            obj = {};
            // copy first level fields
            for (field in objectsArray[i]) {
                if (field !== keyField) obj[field] = objectsArray[i][field];
            }
            // copy keyfield array fields
            for (field in objectsArray[i][keyField][j]) {
                obj[field] = objectsArray[i][keyField][j][field];
            }
            if (additionalOperationsFunc !== undefined) additionalOperationsFunc(obj);
            flatArray.push(obj);
        }
    }
    return flatArray;
}

function getMultilevelValue(obj, propString) {

    if (Object.prototype.toString.call(obj) === "[object Array]") {
        
    }
    
    var prop = propString.split("."), res = obj;
    for (var i=0; i<prop.length; i++) {
        res = res[prop[i]];
        if (res == undefined) break;
    }
    return res;
    
    
}
