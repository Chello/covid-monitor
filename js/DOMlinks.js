$(document).on('click', '#update', function() {

});

var fillCampo = function(arr) {
    //first, get all objects fields
    keys = Object.keys(arr[0]);

    keys.forEach(element => {
        $('<option/>').val(element).html(element).appendTo('#campo');
    });
}