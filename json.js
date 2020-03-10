function readJson(file, func) {
    var jqxhr = $.getJSON(file, function(data) {
        func(data);
        console.log( "success" );
    }).done(function() {
        console.log( "second success" );
    }).fail(function() {
        console.log( "error" );
    }).always(function() {
        console.log( "complete" );
    });
}
