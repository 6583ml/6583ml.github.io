var mainRef = new Firebase("https://6583mll.firebaseio.com/frames/0");
var sayJson = mainRef.child("text");
var level = 0;

displayLevel();
        
sayJson.on('value', function f(s) {
    $('#sayLabel').text(s.val());
});
        
$('#addButton').click(function() {
    dataScan();
    displayLevel();
});
        
$('#textInput').keypress(function (e) {
    if (e.keyCode == 13) {
        dataScan();
        displayLevel();
    }  
});


        
function dataScan(){
    //LEVEL
    if ($('#textInput').val() == "ml.adm") {
        level=1;
        $('#textInput').val('');
    }
    //LEVEL CHECK
    if (level==1){
        //CLEAR COMMAND
        if ($('#textInput').val() == "ml.clr") {
            sayJson.set("");
            $('#textInput').val('');
        }
        //IF ADM BUT NO COMMAND
        else {
            sayJson.transaction(function(current_value) {
                return current_value;
            });
            $('#textInput').val('');
        }
    }
    //NORMAL CHAT
    else {
        sayJson.transaction(function(current_value) {
            return current_value;
        });
        $('#textInput').val('');
    }
}

function displayLevel() {
    if (level==1) {
        $('#levelLabel').text("Yes");
    }
    else {
        $('#levelLabel').text("No");
    }
}
    
    
    
    
    
    
