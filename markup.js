function getTagValuePosition(str) {
    var tagOpen = "", tagClose = "", tagValue = "", valuePos, openTagStatus, closingTagStatus = "fuck";
    for (var i=0; i<str.length; i++) {
        if (openTagStatus === "close" && closingTagStatus === "fuck" && str[i] !== "<") {
            tagValue += str[i];
        }
        if (str[i] === ">") {
            if (openTagStatus === "open") openTagStatus = "close";
            if (closingTagStatus === "open") closingTagStatus = "close";
        }
        if (openTagStatus === "open") tagOpen += str[i];
        if (closingTagStatus === "open") tagClose += str[i];
        if (str[i] === "<" && str[i+1] === "/") {
            closingTagStatus = "open";
        }
        if (str[i] === "<" && str[i+1] !== "/") {
            openTagStatus = "open";
        }
    }
    valuePos = str.replace(new RegExp("<[^>]*>", "g"), "").indexOf(tagValue);
    return { "tagOpen" : tagOpen, "tagClose" : tagClose, "value" : tagValue, "position": valuePos  };
}

function markupDifference(str2change, str2compare, tag) {
    var
        res = "",
        text2compare = str2compare.replace(new RegExp("<[^>]*>", "g"), "");

    for (var i=0; i<str2change.length; i++) {
        if (i > text2compare.length-1) {
            res += "<" + tag + ">" + str2change[i] + "</" + tag + ">";
        } else {
            if (str2change[i] !== text2compare[i]) {
                res += "<" + tag + ">" + str2change[i] + "</" + tag + ">";
            } else {
                res += str2change[i];
            }
        }
    }
    return res.replace(new RegExp("</"+tag+"><"+tag+">", "g"), "");
}

function markup(str2change, str2compare, tag) {
    var tagObj = getTagValuePosition(str2compare), res = "", index = 0, isTag = false,
        str = markupDifference(str2change, str2compare, tag);
    for (var i=0; i<str.length; i++) {
        if (str[i] === "<") {
            isTag = true;
        }
        if (!isTag) {
            //console.log(str[i] + " " + index);
            if (str[i] == tagObj.value[index-tagObj.position]) {
                //console.log("BINGO!");
                res += "<" + tagObj.tagOpen + ">" + str[i] + "<" + tagObj.tagClose + ">";
            } else {
                res += str[i];
            }
            index++;
        } else {
            res += str[i];
        }
        if (str[i] === ">") {
            isTag = false;
        }
    }
    return res;
}
