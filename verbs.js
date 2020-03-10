
var verbs = [], allVerbs = [];

var alphabet = {
    "lv": "AĀBCČDEĒFGĢHIĪJKĶLĻMNŅOPQRSŠTUŪVWXYZŽaābcčdeēfgģhiījkķlļmnņopqrsštuūvwxyzž",
    "ru": "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя"
};

function iznemumi(verb, atgriez, form) {
    var sakne = form.sakne, galotne = form.galotne;
    if (verb.hasOwnProperty("iznemumi2")) {

        var obj = matchObj(verb.iznemumi2, "laiks", form.laiks);

        //console.log("object with .laiks = " + form.laiks);
        //console.log(obj);

        if (obj) {
            obj = matchObj(obj, "persona", form.persona);

            if (obj) {
                //console.log("object with .persona = " + form.persona);
                //console.log(obj);

                if (obj.hasOwnProperty("sakne")) {
                    //console.log(obj["sakne"]);
                    //console.log("it has .sakne");
                    sakne = markup(obj.sakne.replace(/\*/g, ""), form.sakne, "b");
                }
                if (obj.hasOwnProperty("galotne")) {
                    if (obj.galotne[atgriez]) galotne = markup(obj.galotne[atgriez], form.galotne, "b");
                }
            }
        }
    }
    return { "sakne": sakne, "galotne": galotne };
}

function tulkojumsToString(tulkojums, short) {
    var res = "";
    if (Object.prototype.toString.call(tulkojums) === "[object Array]") {
        for (var i=0; i<tulkojums.length; i++) {
            if (Object.prototype.toString.call(tulkojums[i]) === "[object Object]") {
                if (tulkojums[i].hasOwnProperty("piemers") && tulkojums[i].hasOwnProperty("nozime") && !short) {
                    if (i>0) res += ", ";
                    res += tulkojums[i].piemers + " — " + tulkojums[i].nozime;
                }
            }
            if (Object.prototype.toString.call(tulkojums[i]) === "[object String]") {
                if (i>0) res += ", ";
                res += tulkojums[i];
            }
            //if (i<tulkojums.length-1) res += ", ";
        }
        return res;
    }
    return tulkojums;
}

function loadAllVerbs(func, filterExpression) {
    //readJson("http://www.govorite.lv/grammar/verbs/verbs.json", function (data) {
        allVerbs = verbsData;
        //verbs = filterVerbs(filterAllVerbs(), filterExpression);
        verbs = filterAllVerbs();
        //verbs = filterVerbs(filterAllVerbs(), {"priedeklis":"at", "galotne":"ties"});
        //verbs = filterVerbs(filterAllVerbs(), {"priedeklis":"at", "grupa":1});
        //verbs.sort(dynamicSort("grupa"));
        //verbs.sort(dynamicSort("shortlist"));
        //verbs.sort(dynamicSort("infinitivs"));
        func(verbs);
   // });
}

function filterVerbs(verbs, expression) {
    var filteredVerbs = [], i, e, prop, matches;

    e = typeof expression;

    switch (e) {
        case "string":
            for (i=0; i<verbs.length; i++) {
                if (verbs[i].hasOwnProperty(expression)) filteredVerbs.push(verbs[i]);
            }
            break;
        case "object":
            for (i=0; i<verbs.length; i++) {
                matches = true;
                for (prop in expression) {
                    //console.log("checking property " + prop);
                    if (verbs[i].hasOwnProperty(prop)) {
                        if (expression[prop] !== verbs[i][prop]) { matches = false; }
                    } else {
                        matches = false;
                    }
                }
                if (matches) {
                    //console.log("All properties match!");
                    filteredVerbs.push(verbs[i]);
                }
            }
            break;

        default:
            break;
    }
    //console.log("filtered verbs:");
    //console.log(filteredVerbs);
    return filteredVerbs;
}

function filterAllVerbs() {
    var verb;
    var filteredVerbs = [];
    var prop;
    for (var i=0; i<allVerbs.length; i++) {
        for (var f=0; f<allVerbs[i].forms.length; f++) {
            verb = {};
            // make flat list
            for (prop in allVerbs[i]) {
                //console.log(prop);
                if (prop !== "forms") {
                    //console.log("verb[" + prop + "] = ");
                    verb[prop] = allVerbs[i][prop];
                }
            }
            for (prop in allVerbs[i].forms[f]) {
                //console.log(prop);
                verb[prop] = allVerbs[i].forms[f][prop];
            }
            verb["infinitivs"] = verb.priedeklis + verb.sakne + (verb.piedeklis+"").replace("undefined", "") + verb.galotne;
            filteredVerbs.push(verb);
            //console.log(filteredVerbs[filteredVerbs.length-1]);
        }
    }
    //console.log(filteredVerbs);
    if (window.count !== undefined) window.count = filteredVerbs.length;
    //console.log(count);
    return filteredVerbs;
}

