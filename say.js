var mainRef = new Firebase("https://6583ml.firebaseio.com/");
var sayJson = mainRef.child("say");
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
                return current_value + " " + $('#textInput').val();
            });
            $('#textInput').val('');
        }
    }
    //NORMAL CHAT
    else {
        sayJson.transaction(function(current_value) {
            if ($('#textInput').val().indexOf("old") >= 0){$('#textInput').val()="";}
            return current_value + " " + $('#textInput').val();
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
    
    
    
    
    
    
