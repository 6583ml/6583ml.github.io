var mainRef = new Firebase("https://6583ml.firebaseio.com/");

var schoolsRef = mainRef.child("schools");

function clearSchools() {
  schoolsRef.remove();
}

function enter() {
  var name = $('#nameInput').val();
  var location = $('#locationInput').val();
  schoolsRef.push({name: name, location: location});
  $('#locationInput').val('');
  $('#nameInput').val('');
}

$('#locationInput').keypress(function (e) {
  if (e.keyCode == 13) {
    var name = $('#nameInput').val();
    var location = $('#locationInput').val();
    schoolsRef.push({name: name, location: location});
    $('#locationInput').val('');
    $('#nameInput').val('');
    window.location = 'http://4tran.ga/process'
  }
});

schoolsRef.on('child_added', function(snapshot) {
  var schoolDisplay = snapshot.val();
  displaySchoolArray(schoolDisplay.name, schoolDisplay.location);
});

function displaySchoolArray(name, location) {
  $('<a class="list-group-item">').text(name+' - '+location).prepend($('</a>').text(name+': ')).appendTo($('#schoolsDiv'));
  $('#schoolsDiv')[0].scrollTop = $('#schoolsDiv')[0].scrollHeight;
};
