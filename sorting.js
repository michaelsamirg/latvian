
String.prototype.replaceAll = function(str1, str2, ignore)
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};

String.prototype.replaceLast = function(find, replace) {
    var index = this.lastIndexOf(find);

    if (index >= 0) {
        return this.substring(0, index) + replace + this.substring(index + find.length);
    }

    return this.toString();
};

Array.prototype.keySort = function(keys) {

    keys = keys || {};

// via
// https://stackoverflow.com/questions/5223/length-of-javascript-object-ie-associative-array
    var obLen = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key))
                size++;
        }
        return size;
    };

// avoiding using Object.keys because I guess did it have IE8 issues?
// else var obIx = function(obj, ix){ return Object.keys(obj)[ix]; } or
// whatever
    var obIx = function(obj, ix) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (size == ix)
                    return key;
                size++;
            }
        }
        return false;
    };

    var keySort = function(a, b, d) {
        d = d !== null ? d : 1;
        // a = a.toLowerCase(); // this breaks numbers
        // b = b.toLowerCase();

        if (a == undefined) a = (typeof b == "number") ? 0 : "";
        if (b == undefined) b = (typeof a == "number") ? 0 : "";

        return (typeof a == "string") ? a.localeCompare(b, "lv") * d : (a == b) ? 0 : (a > b) ? 1 * d : -1 * d;

        /*if (a == b)
            return 0;
        return a > b ? 1 * d : -1 * d;*/
    };

    var KL = obLen(keys);

    if (!KL)
        return this.sort(keySort);

    for ( var k in keys) {
        // asc unless desc or skip
        keys[k] =
            keys[k] == 'desc' || keys[k] == -1  ? -1
                : (keys[k] == 'skip' || keys[k] === 0 ? 0
                : 1);
    }

    this.sort(function(a, b) {
        var sorted = 0, ix = 0;

        while (sorted === 0 && ix < KL) {
            var k = obIx(keys, ix);
            if (k) {
                var dir = keys[k];
                sorted = keySort(a[k], b[k], dir);
                ix++;
            }
        }
        return sorted;
    });
    return this;
};

function replaceAB(str, matches) {
    var res = str, find = "a", replace = "b", i;
    for (i=0; i<matches.b.length; i++) {
        if (str.indexOf(matches.b[i]) > -1) {
            find = "b"; replace = "a";
            break;
        }
    }
    for (i=0; i<matches.a.length; i++) {
        res = res.replace(new RegExp(matches[find][i], "g"), matches[replace][i]);
    }
    return res;
}

function lvConvertToASCII(str) {
    var pairs = ["aā", "cč", "eē", "gģ", "iī", "kķ", "lļ", "nņ", "sš", "uū", "zž"], res = str;
    for (var i=0; i<pairs.length; i++) {
        res = res.replace(new RegExp(pairs[i][1], "g"), pairs[i][0]);
    }
    return res;
}

function dynamicSort0(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function dynamicSort(property, dir, caseSensitive) {

    var alphabet = "0123456789AĀBCČDEĒFGĢHIĪJKĶLĻMNŅOPQRSŠTUŪVWXYZŽaābcčdeēfgģhiījkķlļmnņopqrsštuūvwxyzž";

    return function(a, b){

        /*var valA = (typeof a[property] === "function") ? a[property]().toString() : a[property].toString();
        var valB = (typeof b[property] === "function") ? b[property]().toString() : b[property].toString();*/

        var valA = (typeof a[property] === "function") ? a[property]().toString() : (a[property]+"").replace("undefined", "");
        var valB = (typeof b[property] === "function") ? b[property]().toString() : (b[property]+"").replace("undefined", "");

        var pos = 0,
            min = Math.min(valA.length, valB.length);
        dir = dir || 1;
        caseSensitive = caseSensitive || false;

        if(!caseSensitive){
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
        }
        while(valA.charAt(pos) === valB.charAt(pos) && pos < min){ pos++; }
        return alphabet.indexOf(valA.charAt(pos)) > alphabet.indexOf(valB.charAt(pos)) ? dir : -dir;
    };
}


function dynamicSortMultiple() {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

var firstBy = (function() {

    function identity(v){return v;}

    function ignoreCase(v){return typeof(v)==="string" ? v.toLowerCase() : v;}

    function makeCompareFunction(f, opt){

        var alphabet = "0123456789AĀBCČDEĒFGĢHIĪJKĶLĻMNŅOPQRSŠTUŪVWXYZŽaābcčdeēfgģhiījkķlļmnņopqrsštuūvwxyzž";

        opt = typeof(opt)==="number" ? {direction:opt} : opt||{};
        if(typeof(f)!="function"){
            var prop = f;
            // make unary function
            f = function(v1){return !!v1[prop] ? v1[prop] : "";}
        }
        if(f.length === 1) {
            // f is a unary function mapping a single item to its sort score
            var uf = f;
            var preprocess = opt.ignoreCase?ignoreCase:identity;
            f = function(v1,v2) {

                //console.log("preprocess(uf(v1)): " + preprocess(uf(v1)));
                //console.log("preprocess(uf(v2)): " + preprocess(uf(v2)));

                var a = preprocess(uf(v1));
                var b = preprocess(uf(v2));

                //console.log("a < b ? " + (preprocess(uf(v1)) < preprocess(uf(v2))));
                //console.log("localeCompare a to b : " + a.localeCompare(b));

                return a.localeCompare(b, "lv");

                //return preprocess(uf(v1)) < preprocess(uf(v2)) ? -1 : preprocess(uf(v1)) > preprocess(uf(v2)) ? 1 : 0;
            }
        }
        if(opt.direction === -1) return function(v1,v2){return -f(v1,v2)};
        return f;
    }

    /* adds a secondary compare function to the target function (`this` context)
     which is applied in case the first one returns 0 (equal)
     returns a new compare function, which has a `thenBy` method as well */
    function tb(func, opt) {
        var x = typeof(this) == "function" ? this : false;
        var y = makeCompareFunction(func, opt);
        var f = x ? function(a, b) {
            return x(a,b) || y(a,b);
        }
            : y;
        f.thenBy = tb;
        return f;
    }
    return tb;
})();

