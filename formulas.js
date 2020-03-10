
// console.log("running formulas.js");

var formulas = [

    { number: 0, flexes: ["gāj", "ej", "ie", "ie"], name: "gāj–ej–ie" },
    { number: 1, flexes: ["dev", "dod", "do", "do"], name: "dev–dod–do" },

    { number: 2, flexes: ["teic", "sak", "teik", "teik"], name: "teic–sak–teik" },
    { number: 3, flexes: ["i", "ē", "i", "i"], name: "i–ē–i" },
    
    { number: 4, flexes: ["*i*rt", "*ē*rt", "*i*rtī", "*i*rs"], name: "i–ē–i" },
    { number: 45, flexes: ["i", "e", "i", "i"], name: "i–e–i", hideInFirstVersion: false },
    
    { number: 5, flexes: ["i", "ie", "i", "i"], name: "i–ie–i" },

    { number: 6, flexes: ["*i*t", "*ie*t", "*i*tī", "*i*s"], name: "i–ie–i" },

    { number: 60, flexes: ["*i*d", "*ie*d", "*i*dī", "*i*s"], name: "i–ie–i" },

    { number: 7, flexes: ["a", "o", "a", "a"], name: "a–o–a" },
    { number: 8, flexes: ["*a*t", "*o*t", "*a*tī", "*a*s"], name: "a–o–a", altName: "t–t–tī" },
    { number: 9, flexes: ["*a*d", "*o*d", "*a*dī", "*a*s"], name: "a–o–a", altName: "d–d–dī" },

    { number: 10, flexes: ["ēj", "ien", "ie", "ie"], name: "ēj–ien–ie" },

    { number: 11, flexes: ["i", "ī", "i", "i"], name: "i–ī–i" },
    { number: 12, flexes: ["*i*t", "*ī*t", "*i*tī", "*i*s"], name: "i–ī–i", altName: "t–t–tī" },
    { number: 49, flexes: ["ī", "i", "i", "i"], name: "ī–i–i" },

    { number: 32, flexes: ["ē", "e", "e", "e"], name: "ē–e–e" },
    { number: 37, flexes: ["ē", "e", "ē", "ē"], name: "ē–e–ē" },

    { number: 13, flexes: ["āj", "āj", "ā", "ā"], name: "āj–āj–ā" },
    { number: 14, flexes: ["ēj", "ēj", "ē", "ē"], name: "ēj–ēj–ē" },

    { number: 15, flexes: ["āv", "auj", "au", "au"], name: "āv–auj–au" },

    { number: 16, flexes: ["uv", "uj", "ū", "ū"], name: "uv–uj–ū"},

    { number: 35, flexes: ["uv", "ūst", "ū", "ū"], name: "uv–ūst–ū"},

    { number: 17, flexes: ["p", "pj", "p", "p"], name: "p–pj–p"},

    { number: 18, flexes: ["b", "bj", "b", "b"], name: "b–bj–b"},
    { number: 66, flexes: ["ē*b*", "e*bj*", "ē*b*", "ē*b*"], name: "b–bj–b"},
    
    { number: 19, flexes: ["ū*m*", "u*mj*", "u*m*", "u*m*"], name: "m–mj–m" },
    { number: 48, flexes: ["ē*m*", "e*mj*", "e*m*", "e*m*"], name: "m–mj–m" },

    { number: 20, flexes: ["c", "c", "k", "k"], name: "c–c–k" },
    { number: 21, flexes: ["ē*c*", "e*c*", "e*k*", "ē*k*"], name: "c–c–k" },

    { number: 22, flexes: ["c", "k", "k", "k"], name: "c–k–k" },

    { number: 23, flexes: ["dz", "dz", "g", "g"], name: "dz–dz–g" },

    { number: 24, flexes: ["d", "ž", "dī", "s"], name: "d–ž–dī" },

    { number: 25, flexes: ["z", "ž", "zī", "z"], name: "z–ž–zī" },

    { number: 26, flexes: ["s", "š", "sī", "s"], name: "s–š–sī" },

    { number: 27, flexes: ["t", "š", "tī", "s"], name: "t–š–tī" },

    { number: 28, flexes: ["ē*l*", "e*ļ*", "e*l*", "e*l*"], name: "l–ļ–l" },
    { number: 29, flexes: ["l", "ļ", "l", "l"], name: "l–ļ–l" },
    { number: 30, flexes: ["ū*l*", "u*ļ*", "u*l*", "u*l*"], name: "l–ļ–l" },
    { number: 31, flexes: ["ī*l*", "i*ļ*", "i*l*", "i*l*"], name: "l–ļ–l" },

    { number: 33, flexes: ["", "st", "", ""], name: "––st––" },

    { number: 64, flexes: ["us", "ūst", "usī", "us"], name: "––st––", hideInFirstVersion: true },

    { number: 65, flexes: ["z", "st", "zī", "z"], name: "z–st–zī" },

    { number: 34, flexes: ["ij**", "ī*st*", "ī**", "ī**"], name: "––st––" },

    { number: 36, flexes: ["d", "st", "dī", "s"], name: "d–st–dī" },

    { number: 38, flexes: ["d", "d", "dī", "s"], name: "d–d–dī" },

    { number: 39, flexes: ["in", "īst", "ī", "ī"], name: "in–īst–ī" },

    { number: 40, flexes: ["t", "st", "tī", "s"], name: "t–st–tī" },

    { number: 41, flexes: ["s", "st", "sī", "s"], name: "s–st–sī" },

    { number: 67, flexes: ["i*s*", "ie*st*", "i*sī*", "i*s*"], name: "s–st–sī" },

    { number: 42, flexes: ["t", "t", "tī", "s"], name: "t–t–tī" },
    { number: 43, flexes: ["i*t*", "ī*t*", "i*tī*", "i*s*"], name: "t–t–tī" },
    { number: 44, flexes: ["bij", "es", "bū", "bū"], name: "bij–es–bū", hideInFirstVersion: true },
    { number: 46, flexes: ["s", "s", "sī", "s"], name: "s–s–sī" },
    { number: 47, flexes: ["ā", "a", "ā", "ā"], name: "ā–a–ā" },
    { number: 62, flexes: ["ā", "a", "a", "ā"], name: "ā–a–a" },
    { number: 63, flexes: ["ā", "a", "a", "a"], name: "ā–a–a" },
    { number: 50, flexes: ["u", "ū", "u", "u"], name: "u–ū–u" },
    { number: 57, flexes: ["ū", "u", "u", "u"], name: "ū–u–u" },
    { number: 51, flexes: ["ij", "ij", "ī", "ī"], name: "ij–ij–ī" },
    { number: 52, flexes: ["in", "in", "ī", "ī"], name: "in–in–ī" },
    { number: 53, flexes: ["īd", "ien", "īdī", "īs"], name: "ī–ien–ī" },
    { number: 61, flexes: ["id", "ien", "idī", "is"], name: "i–ien–i" },

    { number: 54, flexes: ["u*d*", "ū*d*", "u*dī*", "u*s*"], name: "d–d–dī" },

    { number: 55, flexes: ["in", "en", "ī", "ī"], name: "in–en–ī" },

    { number: 68, flexes: ["in", "in", "ī", "ī"], name: "in–in–ī" },

    { number: 56, flexes: ["ēj", "ej", "ie", "ie"], name: "ēj–ej–ie" },

    { number: 58, flexes: ["*u*t", "*ū*t", "*u*tī", "*u*s"], name: "u–ū–u", altName: "t–t–tī" },

    { number: 59, flexes: ["ij", "īst", "ī", "ī"], name: "ij–īst–ī", hideInFirstVersion: true }

];

// 67

function getFormulaByNumber(number) {
    for (var i=0; i<formulas.length; i++) if (formulas[i].number === number) return formulas[i];
    return false;
}
