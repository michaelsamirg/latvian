var ds, tmp;
var shiftPressed = false;
var shiftPressedTwice = false;
var onScreenPressed = false;
var onScreenReleased = false;

function cl(s) {
    console.log(s);
}

function resetShift() {
    ds = document.querySelectorAll("[data-shift]");
    tmp = new Array(ds.length);
}

function handleOnscreenShift (pressed) {

    var i;

    var ctrl = document.getElementById("ctrl");

    if (pressed) {
        ds = document.querySelectorAll("[data-shift]");
        tmp = new Array(ds.length);
        for (i=0; i<ds.length; i++) {
            tmp[i] = ds[i].innerHTML;
            ds[i].innerHTML = ds[i].getAttribute("data-shift");
        }
        if (window.location.pathname == rootPath) {
            document.getElementById("dayNumAudio").style.visibility = "hidden";
        }
        ctrl.style.backgroundColor = "#c64a97";
        ctrl.style.color = "white";
    } else {
        for (i=0; i<ds.length; i++) {
            ds[i].innerHTML = tmp[i];
        }
        if (window.location.pathname == rootPath) {
            document.getElementById("dayNumAudio").style.visibility = "visible";
            tmpNow = new Date();
            textTime(tmpNow.getHours(), tmpNow.getMinutes());
        }
        ctrl.style.backgroundColor = "#eeeeee";
        ctrl.style.color = "black";
    }

}

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


function handleShift() {
    ds = document.querySelectorAll("[data-shift]");

    tmp = new Array(ds.length);

    var i;

//    console.log(ds[0].getAttribute("data-shift"));

    window.addEventListener("keydown", function (event) {

        var x = event.keyCode;
        var ctrl = document.getElementById("ctrl");

        //console.log("DOWN:", x);

        //console.log(ds[0].getAttribute("data-shift"));

        if ((x == 17) && (!shiftPressed)) {
            for (i=0; i<ds.length; i++) {
                tmp[i] = ds[i].innerHTML;
                ds[i].innerHTML = ds[i].getAttribute("data-shift");
            }
            shiftPressed = true;
            document.onclick = "return false";
            if (window.location.pathname == rootPath) {
                document.getElementById("dayNumAudio").style.visibility = "hidden";
            }
            if(ctrl) { ctrl.style.backgroundColor = "#c64a97"; ctrl.style.color = "white"; }

        } else {
            if ((x == 17) && (shiftPressed)) { shiftPressedTwice = true; }
        }
    }, true);

    window.addEventListener("keyup", function (event) {

        if (!shiftPressed) return;

        var x = event.keyCode;
        var tmpNow;
        var ctrl = document.getElementById("ctrl");
        //console.log("UP:", x);

        if ((!shiftPressedTwice) && (x == 17)) {
            for (i=0; i<ds.length; i++) {
                ds[i].innerHTML = tmp[i];
            }
            shiftPressed = false;
            document.onclick = clickHandler;
            if (window.location.pathname == rootPath) {
                document.getElementById("dayNumAudio").style.visibility = "visible";
                tmpNow = new Date();
                textTime(tmpNow.getHours(), tmpNow.getMinutes());
            }
            if(ctrl) { ctrl.style.backgroundColor = "#eeeeee"; ctrl.style.color = "black"; }
        }

        if ((shiftPressedTwice) && (x == 17)) {
            for (i=0; i<ds.length; i++) {
                ds[i].innerHTML = tmp[i];
            }
            shiftPressed = false;
            shiftPressedTwice = false;
            document.onclick = clickHandler;
            if (window.location.pathname == rootPath) {
                document.getElementById("dayNumAudio").style.visibility = "visible";
                tmpNow = new Date();
                textTime(tmpNow.getHours(), tmpNow.getMinutes());
            }
            if(ctrl) { ctrl.style.backgroundColor = "#eeeeee"; ctrl.style.color = "black"; }
        }

    }, true);
}

function getBoldEnding(word, ending) {
    var endingIndex = word.lastIndexOf(ending);
    if (endingIndex > -1) {
        return word.substring(0, endingIndex) + "<b>" + word.substring(endingIndex, endingIndex+ending.length) + "</b>"
    } else {
        return word;
    }
}

function createHTMLElement(elementName) {
    var element = document.createElement(elementName);
    for (var i=1; i<arguments.length; i+=2) element.setAttribute(arguments[i], arguments[i+1]);
    return element;
}

function getNextSibling(n)
{
    y=n.nextSibling;
    while (y.nodeType!=1)
    {
        y=y.nextSibling;
    }
    return y;
}

function getFromXML(fileName, tagName, func) {
    var xmlhttp, xml;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        //console.log(xmlhttp.readyState);
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            xml = xmlhttp.responseXML.documentElement.getElementsByTagName(tagName);
            func(xml);
            //pasaka(xml);
            //document.getElementById("myDiv").innerHTML = x[0].firstChild.nodeValue;
            //return x;
        }
    };
    xmlhttp.open("GET",fileName,true);
    xmlhttp.send();
}

function getXML(fileName, func) {
    var xmlhttp, xml;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            xml = xmlhttp.responseXML.documentElement;
            func(xml);
        }
    };
    xmlhttp.open("GET",fileName,true);
    xmlhttp.send();
}

function removeTextNodes(node) {
    var child, next, reBlank = /^\s*$/;
    switch (node.nodeType) {
        case 3: // Text node
            if (reBlank.test(node.nodeValue)) {
                node.parentNode.removeChild(node);
            }
            break;
        case 1: // Element node
        case 9: // Document node
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                removeTextNodes(child);
                child = next;
            }
            break;
    }
}


function getParameterByName(name, loc) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(loc.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function findElementByClassName(element, className) {
    var foundElement = null, found;
    function recurse(element, className, found) {
        for (var i = 0; i < element.childNodes.length && !found; i++) {
            var el = element.childNodes[i];
            var classes = el.className != undefined? el.className.split(" ") : [];
            for (var j = 0, jl = classes.length; j < jl; j++) {
                if (classes[j] == className) {
                    found = true;
                    foundElement = element.childNodes[i];
                    break;
                }
            }
            if(found)
                break;
            recurse(element.childNodes[i], className, found);
        }
    }
    recurse(element, className, false);
    return foundElement;
}

var backgrounds = [];

/*backgrounds[0] = "/bg-riga-02-blurred.jpg";
backgrounds[1] = "/bg-riga-03-blurred.jpg";
backgrounds[2] = "/bg-riga-04-blurred.jpg";
backgrounds[3] = "/bg-riga-05-blurred.jpg";*/

// rudens
/*backgrounds[0] = "/nature-autumn-yellow-leaves-3.jpg";
backgrounds[1] = "/bg-jurmala-01.jpg";
backgrounds[2] = "/bg-kirbji.jpg";*/

//ziema
/*backgrounds[0] = "/bg-ziema-mp-01.jpg";
backgrounds[1] = "/bg-ziema-mp-14.jpg";
backgrounds[2] = "/bg-ziema-mp-08.jpg";
backgrounds[3] = "/bg-ziema-mp-10.jpg";
backgrounds[4] = "/bg-ziema-mp-05.jpg";
backgrounds[5] = "/bg-ziema-mp-13.jpg";
backgrounds[6] = "/bg-ziema-mp-15.jpg";
backgrounds[7] = "/bg-ziema-mp-03.jpg";
backgrounds[8] = "/bg-ziema-mp-09.jpg";
backgrounds[9] = "/bg-ziema-mp-04.jpg";
backgrounds[10] = "/bg-ziema-mp-11.jpg";
backgrounds[11] = "/bg-ziema-mp-12.jpg";
backgrounds[12] = "/bg-ziema-mp-06.jpg";
backgrounds[13] = "/bg-ziema-mp-02.jpg";
backgrounds[14] = "/bg-ziema-mp-07.jpg";*/

//pavasaris
/*backgrounds[0] = "/pavasaris/01s.jpg";
backgrounds[1] = "/pavasaris/02s.jpg";
backgrounds[2] = "/pavasaris/03s.jpg";*/

//maijs
//backgrounds[0] = "/pavasaris/maijs/01.jpg";
//backgrounds[1] = "/pavasaris/maijs/02.jpg";
//backgrounds[2] = "/pavasaris/maijs/03.jpg";
//backgrounds[3] = "/pavasaris/maijs/04.jpg";
//backgrounds[2] = "/pavasaris/maijs/05.jpg";
//backgrounds[3] = "/pavasaris/maijs/06.jpg";
//backgrounds[4] = "/pavasaris/maijs/07.jpg";

//oktobris
/*backgrounds[0] = "/rudens/bg-kemeri-01.jpg";
backgrounds[1] = "/rudens/bg-kemeri-02.jpg";
backgrounds[2] = "/rudens/bg-kemeri-03.jpg";
backgrounds[3] = "/rudens/bg-kemeri-04.jpg";
backgrounds[4] = "/rudens/bg-kemeri-05.jpg";
backgrounds[5] = "/rudens/bg-kemeri-06.jpg";*/

/*
backgrounds[4] = "/ziema/bg-mezapark-01.jpg";
backgrounds[5] = "/ziema/bg-mezapark-02.jpg";
backgrounds[6] = "/ziema/bg-mezapark-03.jpg";
backgrounds[7] = "/ziema/bg-mezapark-04.jpg";
backgrounds[8] = "/ziema/bg-mezapark-05.jpg";
backgrounds[9] = "/ziema/bg-mezapark-06.jpg";
backgrounds[10] = "/ziema/bg-mezapark-07.jpg";
*/

//pavasara gleznas
/*backgrounds[0] = "/pavasaris/gleznas/marc-hanson.jpg";
backgrounds[1] = { src: "/pavasaris/gleznas/monet-orchard.jpg", opacity: 0.6 };
backgrounds[2] = { src: "/pavasaris/gleznas/monet-trees.jpg", opacity: 0.6 };
backgrounds[3] = "/pavasaris/gleznas/van-gogh-flowering.jpg";*/

// botaniskais dārzs
backgrounds[0] = {
    src: "/pavasaris/bd/bruni-pumpuri.jpg",
    opacity: 1.0,
    logo: "rgba(255,255,255,0.6)"
};
backgrounds[1] = {
    src: "/pavasaris/bd/sarkani-zari.jpg",
    hint: "rgba(255,255,255,0.85)"
};
backgrounds[2] = "/pavasaris/bd/balts.jpg";
backgrounds[3] = "/pavasaris/bd/zals.jpg";
backgrounds[4] = {
    src: "/pavasaris/bd/dzeltens.jpg",
    hint: "rgba(255,255,255,0.85)"
};
backgrounds[5] = "/pavasaris/bd/zalas-sniegs.jpg";

backgrounds[6] = {
    src: "/pavasaris/bd/dzeltens2.jpg",
    logo: "rgba(255,255,255,0.77)",
    hint: "rgba(255,255,255,0.8)"
};

backgrounds[7] = {
    src: "/pavasaris/bd/ainava.jpg",
    logo: "rgba(255,255,255,0.77)"
};

backgrounds[8] = "/pavasaris/bd/sarkans-zals.jpg";

var navColorDefaults = {
    logo: "rgba(255,255,255,0.6)",
    menu: "rgba(0,0,0,0.4)",
    hint: "rgba(255,255,255,0.6)",
    feedback: "rgba(155,28,30,0.8)"
};

// backgrounds[4] = "/lv/bg-riga-06-large-blurred.jpg";

function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function setNavDefaultColors() {
    document.getElementById("navLogo").style.backgroundColor = navColorDefaults.logo;
    document.getElementById("navMenu").style.backgroundColor = navColorDefaults.menu;
    document.getElementById("hint").style.backgroundColor = navColorDefaults.hint;
    document.getElementById("feedback").style.backgroundColor = navColorDefaults.feedback;
}

function setComplexBackground(background) {

    var logo, menu, feedback, hint;

    logo = document.getElementById("navLogo");
    menu = document.getElementById("navMenu");
    hint = document.getElementById("hint");
    feedback = document.getElementById("feedback");

    document.body.style.backgroundImage = "url('" + background.src + "')";

    (background.hasOwnProperty("logo")) ? logo.style.backgroundColor = background.logo : logo.style.backgroundColor = navColorDefaults.logo;
    (background.hasOwnProperty("menu")) ? menu.style.backgroundColor = background.menu : menu.style.backgroundColor = navColorDefaults.menu;
    (background.hasOwnProperty("hint")) ? hint.style.backgroundColor = background.hint : hint.style.backgroundColor = navColorDefaults.hint;
    (background.hasOwnProperty("feedback")) ? feedback.style.backgroundColor = background.feedback : feedback.style.backgroundColor = navColorDefaults.feedback;

}

function setSimpleBackground(background) {
    document.body.style.backgroundImage = "url('" + background + "')";
    setNavDefaultColors();
}

function findBackgroundNextIndex() {
    var index;
    var currentBackground = document.body.style.backgroundImage;
    var i;
    var backgroundReference = "backgrounds[i]";
    console.log(currentBackground);

    for(i = 0; i < backgrounds.length; i++) {

        if (typeof backgrounds[i] === "object") {
            backgroundReference = "backgrounds[i].src";
        }
        if (typeof backgrounds[i] === "string") {
            backgroundReference = "backgrounds[i]";
        }

        if (currentBackground.indexOf(eval(backgroundReference)) > 0) break;

    }

    (i < backgrounds.length-1) ? index = i+1 : index = 0;

    return index;
}

function setHomePageBackground(which) {

    var min, max, r, index;

    switch (which) {
        case 1:
            // set next image
            index = findBackgroundNextIndex();

            if (typeof backgrounds[index] === "object" ) {
                setComplexBackground(backgrounds[index]);
            }
            if (typeof backgrounds[index] === "string" ) {
                setSimpleBackground(backgrounds[index]);
            }

            break;
        case 0:
            // set random image
            min = 0;
            max = backgrounds.length-1;
            r = Math.floor(Math.random() * (max - min + 1)) + min;

            if (typeof backgrounds[r] === "object" ) {
                setComplexBackground(backgrounds[r]);
            }
            if (typeof backgrounds[r] === "string" ) {
                setSimpleBackground(backgrounds[r]);
            }
            
            break;
        default:
            break;
    }
}

function setRandomBackground() {
    min = 0;
    max = backgrounds.length-1;
    r = Math.floor(Math.random() * (max - min + 1)) + min;

    console.log(!!document.getElementById("cover"));

    if ((!!document.getElementById("cover")) && (backgrounds[r].hasOwnProperty("src"))) {

        //console.log("nado menyat");
        document.body.style.backgroundImage = "url('" + backgrounds[r].src + "')";

        if (backgrounds[r].hasOwnProperty("opacity")) {
            document.getElementById("cover").style.opacity = 1 - backgrounds[r].opacity;
        }

    } else {
        document.body.style.backgroundImage = "url('" + backgrounds[r] + "')";
    }
}

function setNextBackground() {
    var s = document.body.style.backgroundImage;

    for (i = 0; i < backgrounds.length; i++) {
        if (backgrounds[i].hasOwnProperty("src")) {
            if (s.indexOf(backgrounds[i].src) > 0) break;
        }
        if (s.indexOf(backgrounds[i]) > 0) break;
    }

    (i < backgrounds.length-1) ? i++ : i = 0;

    if ((!!document.getElementById("cover")) && (backgrounds[i].hasOwnProperty("opacity"))) {
        console.log("nado menyat");
        document.body.style.backgroundImage = "url('" + backgrounds[i].src + "')";
        document.getElementById("cover").style.opacity = 1-backgrounds[i].opacity;
    } else {
        if (!!document.getElementById("cover")) {
            document.getElementById("cover").style.opacity = 0;
        }
        document.body.style.backgroundImage = "url('" + backgrounds[i] + "')";
    }

}

function goHome() {
    window.location.href = rootPath;
}
