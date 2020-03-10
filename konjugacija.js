
var personas = [ "0", "es", "Tu", "viņš", "mēs", "Jūs" ];

var laiki = [
    { name: "pagātne" },
    { name: "tagadne" },
    { name: "nākotne" }
];

var konjugacija = [

    {},

    // grupa 1
    {
        galotnes: {
            "neatgriez":
            {
                "es": [
                    function (){return "u"},
                    function (){return "u"},
                    function (){return "u"}
                ],
                "Tu": [
                    function (){return "i"},
                    function (){return ""},
                    function (){return "i"}
                ],
                "viņš": [
                    function () {return "a"},
                    function () {return ""},
                    function () {return ""}
                ],
                "mēs": [
                    function () {return "ām"},
                    function () {return "am"},
                    function () {return "im"}
                ],
                "Jūs": [
                    function () {return "āt"},
                    function () {return "at"},
                    function () {return "iet"}
                ]
            },
            "atgriez":
            {
                "es": [
                    function () { return "os" },
                    function () { return "os" },
                    function () { return "os" }
                ],
                "Tu": [
                    function () { return "ies" },
                    function () { return "ies" },
                    function () { return "ies" }
                ],
                "viņš": [
                    function () { return "ās" },
                    function () { return "as" },
                    function () { return "ies" }
                ],
                "mēs": [
                    function () { return "āmies" },
                    function () { return "amies" },
                    function () { return "imies" }
                ],
                "Jūs": [
                    function () { return "āties" },
                    function () { return "aties" },
                    function () { return "ieties" }
                ]
            }
        },
        piedekli: {
            "neatgriez" : {
                "es": [
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "š" }
                ],
                "Tu": [
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "s" }
                ],
                "viņš": [
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "s" }
                ],
                "mēs": [
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "s" }
                ],
                "Jūs": [
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "s" }
                ]
            },
            "atgriez" : {
                "es": [
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "š" }
                ],
                "Tu": [
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "s" }
                ],
                "viņš": [
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "s" }
                ],
                "mēs": [
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "s" }
                ],
                "Jūs": [
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "" },
                    function (piedeklis) { return "s" }
                ]
            }
        }
    },

    // grupa 2
    {
        galotnes: {
            "neatgriez":
            {
                "es": [
                    function (){return "u"},
                    function (){return "u"},
                    function (){return "u"}
                ],
                "Tu": [
                    function (){return "i"},
                    function (){return ""},
                    function (){return "i"}
                ],
                "viņš": [
                    function () {return "a"},
                    function () {return ""},
                    function () {return ""}],
                "mēs": [
                    function () {return "ām"},
                    function () {return "am"},
                    function () {return "im"}
                ],
                "Jūs": [
                    function () {return "āt"},
                    function () {return "at"},
                    function () {return "iet"}
                ]
            },
            "atgriez":
            {
                "es": [
                    function () { return "os" },
                    function () { return "os" },
                    function () { return "os" }
                ],
                "Tu": [
                    function () { return "ies" },
                    function () { return "ies" },
                    function () { return "ies" }
                ],
                "viņš": [
                    function () { return "ās" },
                    function () { return "as" },
                    function () { return "ies" }
                ],
                "mēs": [
                    function () { return "āmies" },
                    function () { return "amies" },
                    function () { return "imies" }
                ],
                "Jūs": [
                    function () { return "āties" },
                    function () { return "aties" },
                    function () { return "ieties" }
                ]
            }
        },
        piedekli: {
            "neatgriez": {
                "es": [
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "š"
                    }
                ],
                "Tu": [
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "ā": return "ā";
                            case "o": return "o";
                            case "ē": return "ē";
                            break;
                            default: return "";
                        }
                    },
                    function (piedeklis) {
                        return piedeklis + "s"
                    }
                ],
                "viņš": [
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "ā": return "ā";
                            case "o": return "o";
                            case "ē": return "ē";
                            break;
                            default: return "";
                        }
                    },
                    function (piedeklis) {
                        return piedeklis + "s"
                    }
                ],
                "mēs": [
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "s"
                    }
                ],
                "Jūs": [
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "s"
                    }
                ]
            },
            "atgriez" : {
                "es": [
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "š"
                    }
                ],
                "Tu": [
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "s"
                    }
                ],
                "viņš": [
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "s"
                    }
                ],
                "mēs": [
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "s"
                    }
                ],
                "Jūs": [
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "<span class='formulaPiedeklis'>j</span>"
                    },
                    function (piedeklis) {
                        return piedeklis + "s"
                    }
                ]
            }
        }
    },

    // grupa 3
    {
        galotnes: {
            "neatgriez":
            {
                "es": [
                    function (){return "u"},
                    function (){return "u"},
                    function (){return "u"}
                ],
                "Tu": [
                    function (){return "i"},
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "ī": return "i";
                            case "inā": return "i";
                            case "ē": return "i";
                            case "ā": return "i";
                        }
                    },
                    function (){return "i"}
                ],
                "viņš": [
                    function (){return "a"},
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "ī": return "a";
                            case "inā": return "a";
                            case "ē": return "";
                            case "ā": return "";
                        }
                    },
                    function (){return ""}],
                "mēs": [
                    function () {return "ām"},
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "ī": return "ām";
                            case "inā": return "ām";
                            case "ē": return "am";
                            case "ā": return "am";
                        }
                    },
                    function () {return "im"}
                ],
                "Jūs": [
                    function () {return "āt"},
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "ī": return "āt";
                            case "inā": return "āt";
                            case "ē": return "at";
                            case "ā": return "at";
                        }
                    },
                    function () {return "iet"}
                ]
            },
            "atgriez":
            {
                "es": [
                    function () { return "os" },
                    function () { return "os" },
                    function () { return "os" }
                ],
                "Tu": [
                    function () { return "ies" },
                    function () { return "ies" },
                    function () { return "ies" }
                ],
                "viņš": [
                    function () { return "ās" },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "ī": return "ās";
                            case "inā": return "ās";
                            case "ē": return "as";
                            case "ā": return "as";
                        }
                    },
                    function () { return "ies" }
                ],
                "mēs": [
                    function () { return "āmies" },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "ī": return "āmies";
                            case "inā": return "āmies";
                            case "ē": return "amies";
                            case "ā": return "amies";
                        }
                    },
                    function () { return "imies" }
                ],
                "Jūs": [
                    function () { return "āties" },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "ī": return "āties";
                            case "inā": return "āties";
                            case "ē": return "aties";
                            case "ā": return "aties";
                        }
                    },
                    function () { return "ieties" }
                ]
            }
        },
        piedekli: {
            "neatgriez" : {
                "es": [
                    function (piedeklis) { return piedeklis + "<span class='formulaPiedeklis'>j</span>" },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "inā": return "in";
                            default: return "";
                        }
                    },
                    function (piedeklis) { return piedeklis + "š" }
                ],
                "Tu": [
                    function (piedeklis) { return piedeklis + "<span class='formulaPiedeklis'>j</span>" },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "inā": return "in";
                            default: return "";
                        }
                    },
                    function (piedeklis) { return piedeklis + "s" }
                ],
                "viņš": [
                    function (piedeklis) { return piedeklis + "<span class='formulaPiedeklis'>j</span>" },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "inā": return "in";
                            default: return "";
                        }
                    },
                    function (piedeklis) { return piedeklis + "s" }
                ],
                "mēs": [
                    function (piedeklis) { return piedeklis + "<span class='formulaPiedeklis'>j</span>" },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "inā": return "in";
                            default: return "";
                        }
                    },
                    function (piedeklis) { return piedeklis + "s" }
                ],
                "Jūs": [
                    function (piedeklis) { return piedeklis + "<span class='formulaPiedeklis'>j</span>" },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "inā": return "in";
                            default: return "";
                        }
                    },
                    function (piedeklis) { return piedeklis + "s" }
                ]
            },
            "atgriez" : {
                "es": [
                    function (piedeklis) { return piedeklis + "<span class='formulaPiedeklis'>j</span>" },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "inā": return "in";
                            default: return "";
                        }
                    },
                    function (piedeklis) { return piedeklis + "š" }
                ],
                "Tu": [
                    function (piedeklis) { return piedeklis + "<span class='formulaPiedeklis'>j</span>" },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "inā": return "in";
                            default: return "";
                        }
                    },
                    function (piedeklis) { return piedeklis + "s" }
                ],
                "viņš": [
                    function (piedeklis) { return piedeklis + "<span class='formulaPiedeklis'>j</span>" },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "inā": return "in";
                            default: return "";
                        }
                    },
                    function (piedeklis) { return piedeklis + "s" }
                ],
                "mēs": [
                    function (piedeklis) { return piedeklis + "<span class='formulaPiedeklis'>j</span>" },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "inā": return "in";
                            default: return "";
                        }
                    },
                    function (piedeklis) { return piedeklis + "s" }
                ],
                "Jūs": [
                    function (piedeklis) { return piedeklis + "<span class='formulaPiedeklis'>j</span>" },
                    function (piedeklis) {
                        switch (piedeklis) {
                            case "inā": return "in";
                            default: return "";
                        }
                    },
                    function (piedeklis) { return piedeklis + "s" }
                ]
            }
        }
    }
];

function konjugat(verb) {

    var laiks, p, tabula = [];

    var galotne, laikaPiedeklis, priedeklis, sakne, iznemums;

    if (verb.grupa == 1) {

        /* I GRUPA */

        var formula = getFormulaByNumber(verb.formula);

        //console.log("IS FORMULA FALSE: " + (formula === false));

        var flex, flexToSearch, flexToReplaceWith, x, s;

        priedeklis = verb.priedeklis;

        for (p = 1; p < personas.length; p++) {

            tabula[p] = [];

            for (laiks = 0; laiks <= 2; laiks++) {

                sakne = ""; laikaPiedeklis = ""; galotne = "";

                if (formula === false) {

                    sakne = verb.sakne;

                } else {

                    flexToSearch = ignoreSym(formula.flexes[3], "*");
                    flexToReplaceWith = formula.flexes[laiks];
                    if (flexToReplaceWith.indexOf("*") < 0) flexToReplaceWith = "*" + flexToReplaceWith + "*";

                    sakne = htmlHighlight(verb.sakne.replaceLast(flexToSearch, flexToReplaceWith), "*", "<span class='formulaSakne'>", "</span>");
                    
                    if (sakne.indexOf("<span class='formulaSakne'></span>") > -1) {
                        sakne = sakne.replace("<span class='formulaSakne'></span>", "");
                    }
                }

                laikaPiedeklis = konjugacija[verb.grupa].piedekli[atgriez(verb.galotne)][personas[p]][laiks]();

                galotne = konjugacija[verb.grupa].galotnes[atgriez(verb.galotne)][personas[p]][laiks]();

                iznemums = iznemumi(verb, atgriez(verb.galotne), {"sakne":sakne, "galotne":galotne, "laiks":laiks, "persona":p});

                tabula[p].push(priedeklis + iznemums.sakne + laikaPiedeklis + iznemums.galotne);

            }

        }

    } else {

        /* II UN III GRUPA */

        priedeklis = verb.priedeklis;

        for (p = 1; p < personas.length; p++) {

            tabula[p] = [];

            for (laiks = 0; laiks <= 2; laiks++) {
                sakne = verb.sakne;

                laikaPiedeklis = konjugacija[verb.grupa].piedekli[atgriez(verb.galotne)][personas[p]][laiks](verb.piedeklis);

                galotne = konjugacija[verb.grupa].galotnes[atgriez(verb.galotne)][personas[p]][laiks](verb.piedeklis);

                iznemums = iznemumi(verb, atgriez(verb.galotne), {"sakne":sakne, "galotne":galotne, "laiks":laiks, "persona":p});

                tabula[p].push(priedeklis + iznemums.sakne + laikaPiedeklis + iznemums.galotne);

            }
        }
    }

    return tabula;

}

function htmlHighlight(str, symbol, tagOpen, tagClose) {
    return str.replace(symbol, tagOpen).replace(symbol, tagClose);
}

function atgriez(galotne) {
    if (galotne === "ties") return "atgriez";
    return "neatgriez";
}

function ignoreSym(str, symbol) {
    //var res = str;
    //return str.replace(new RegExp(symbol, "g"), "");
    return str.replaceAll(symbol, "");
    //while (res.indexOf(symbol) > -1) res = res.replace(symbol, "");
    //return res;
}
