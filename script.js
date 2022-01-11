var promptHtml = "";
var html = "";
var courseHtml = [];
var schools = [];
var tileCounter = 0;
var totalClasses = 0;
var gradeBook = {
  'A+': 4.0, 'A': 4.0, 'A-': 4.0,
  'B+': 3.0, 'B': 3.0, 'B-': 3.0,
  'C+': 2.0, 'C': 2.0, 'C-': 2.0,
  'D+': 1.0, 'D': 1.0, 'D-': 1.0,
  'F': 0.0
};



function weights() {
  cancel();

  html += '<div class="new-class-tile">';
  html += '<div class="sub-header">Grade Weights</div>';
  html += '<div>A+: <input id="A+" type="number" placeholder=' + gradeBook['A+'] + '></input> A: <input id="A" type="number" placeholder=' + gradeBook['A'] + '></input> A-: <input id="A-" type="number" placeholder=' + gradeBook['A-'] + '></input></div>';
  html += '<div>B+: <input id="B+" type="number" placeholder=' + gradeBook['B+'] + '></input> B: <input id="B" type="number" placeholder=' + gradeBook['B'] + '></input> B-: <input id="B-" type="number" placeholder=' + gradeBook['B-'] + '></input></div>';
  html += '<div>C+: <input id="C+" type="number" placeholder=' + gradeBook['C+'] + '></input> C: <input id="C" type="number" placeholder=' + gradeBook['C'] + '></input> C-: <input id="C-" type="number" placeholder=' + gradeBook['C-'] + '></input></div>';
  html += '<div>D+: <input id="D+" type="number" placeholder=' + gradeBook['D+'] + '></input> D: <input id="D" type="number" placeholder=' + gradeBook['D'] + '></input> D-: <input id="D-" type="number" placeholder=' + gradeBook['D-'] + '></input></div>';
  html += '<div>F: <input id="F" type="number" placholder=' + gradeBook['F'] + '></input></div>';
  html += '<br>';
  html += '<div><button class="small-button" onclick="saveWeights()">Save</button><button class="small-button" onclick="cancel()">Cancel</button></div>';
  html += '</div>';


  document.getElementById('weight-prompt').innerHTML = html;
}


function newClass() {
  cancel();

  promptHtml += '<div class="new-class-tile">';
  promptHtml += '<div>Class Name: <input id="class-name" placeholder="Name"></input></div>';
  promptHtml += '<div>Letter Grade: <input id="class-grade" placeholder="A,B,C,D,F"></input></div>';
  promptHtml += '<button class="small-button" onclick="save()">Save</button>';
  promptHtml += '<button class="small-button" onclick="cancel()">Cancel</button>';
  promptHtml += '</div>';

  document.getElementById('prompt-tile').innerHTML += promptHtml;
}

function cancel() {
  html = "";
  promptHtml = "";
  document.getElementById('weight-prompt').innerHTML = promptHtml;
  document.getElementById('prompt-tile').innerHTML = promptHtml;
}


function save() {
  var randomNum = Math.floor(10000 * (Math.random()))
  var course = document.getElementById("class-name");
  var grade = document.getElementById("class-grade");
  var obj = { course: course.value, grade: grade.value, identification: randomNum };
  schools.push(obj);
  console.log(schools);
  console.log("Course: " + schools[tileCounter].course + " / Grade: " + schools[tileCounter].grade);


  var htmlTemp = "";

  htmlTemp += '<div class="old-class-tile" id="renegade' + randomNum + '">';
  htmlTemp += '<div>Class: ' + course.value + '</div>';
  htmlTemp += '<div>Grade: ' + grade.value + '</div>';
  htmlTemp += '<button class="small-button" onclick="erase(' + randomNum + ')">Erase</button>';
  htmlTemp += '</div>';

  courseHtml[tileCounter] = htmlTemp; //undefined error started when array element was added
  document.getElementById('class-tile').innerHTML += courseHtml[tileCounter];

  totalClasses += 1;
  tileCounter += 1;
  cancel();
  calculateGPA();
}


function saveWeights() {
  var nada = '';

  if (document.getElementById('A+').value != nada) {
    gradeBook['A+'] = parseFloat(document.getElementById('A+').value);
  }
  if (document.getElementById('A').value != nada) {
    gradeBook['A'] = parseFloat(document.getElementById('A').value);
  }
  if (document.getElementById('A-').value != nada) {
    gradeBook['A-'] = parseFloat(document.getElementById('A-').value);
  }
  if (document.getElementById('B+').value != nada) {
    gradeBook['B+'] = parseFloat(document.getElementById('B+').value);
  }
  if (document.getElementById('B').value != nada) {
    gradeBook['B'] = parseFloat(document.getElementById('B').value);
  }
  if (document.getElementById('B-').value != nada) {
    gradeBook['B-'] = parseFloat(document.getElementById('B-').value);
  }
  if (document.getElementById('C+').value != nada) {
    gradeBook['C+'] = parseFloat(document.getElementById('C+').value);
  }
  if (document.getElementById('C').value != nada) {
    gradeBook['C'] = parseFloat(document.getElementById('C').value);
  }
  if (document.getElementById('C-').value != nada) {
    gradeBook['C-'] = parseFloat(document.getElementById('C-').value);
  }
  if (document.getElementById('D+').value != nada) {
    gradeBook['D+'] = parseFloat(document.getElementById('D+').value);
  }
  if (document.getElementById('D').value != nada) {
    gradeBook['D'] = parseFloat(document.getElementById('D').value);
  }
  if (document.getElementById('D-').value != nada) {
    gradeBook['D-'] = parseFloat(document.getElementById('D-').value);
  }
  if (document.getElementById('F').value != nada) {
    gradeBook['F'] = parseFloat(document.getElementById('F').value);
  }

  console.log(gradeBook);
  cancel();
  if (schools.length != 0) {
    calculateGPA();
  }
}


function erase(id) {
  for (var i = 0; i < schools.length; i++) {
    if (schools[i].identification === id) {
      var parent = document.getElementById('class-tile');
      var child = document.getElementById('renegade' + id);
      parent.removeChild(child);

      schools.splice((i), 1);
      console.log(schools);
    }
  }

  tileCounter -= 1;// here it is
  totalClasses -= 1;
  calculateGPA();
}


function calculateGPA() {
  var grade = 0;
  var temp = '';
  var rounds = 0;
  var finalGPA = 0;
  var color = '';

  if (schools.length != 0) {
    for (i = 0; i < schools.length; i++) {
      if (schools[i].grade != null) {
        temp = schools[i].grade;
        //console.log(temp);
      }

      if (temp === 'A+') {
        grade = grade + (gradeBook['A+']);
      } else if (temp === 'A') {
        grade = grade + (gradeBook['A']);
      } else if (temp === 'A-') {
        grade = grade + (gradeBook['A-']);
      } else if (temp === 'B+') {
        grade = grade + (gradeBook['B+']);
      } else if (temp === 'B') {
        grade = grade + (gradeBook['B']);
      } else if (temp === 'B-') {
        grade = grade + (gradeBook['B-']);
      } else if (temp === 'C+') {
        grade = grade + (gradeBook['C+']);
      } else if (temp === 'C') {
        grade = grade + (gradeBook['C']);
      } else if (temp === 'C-') {
        grade = grade + (gradeBook['C-']);
      } else if (temp === 'D+') {
        grade = grade + (gradeBook['D+']);
      } else if (temp === 'D') {
        grade = grade + (gradeBook['D']);
      } else if (temp === 'D-') {
        grade = grade + (gradeBook['D-']);
      } else if (temp === 'F') {
        grade = grade + (gradeBook['F']);
      }
      rounds += 1;
      console.log("Grade: " + grade + "   " + "Rounds: " + rounds);
    }


    var finalGPA = (Math.round((grade / rounds) * 1000)) / 1000;

    if (finalGPA >= 4) {
      color = 'green';
    } else if ((finalGPA < 4) && (finalGPA >= 3)) {
      color = 'blue';
    } else if ((finalGPA < 3) && (finalGPA >= 2)) {
      color = 'yellow';
    } else if ((finalGPA < 2) && (finalGPA >= 1)) {
      color = 'orange';
    } else {
      color = 'red';
    }

    var htmlGPA = '';
    htmlGPA += '<div class="announce">'
    htmlGPA += '<div>Current GPA: <div class="buff" id="' + color + '">' + finalGPA + '</div></div>';
    htmlGPA += '</div>'
  } else {
    var finalGPA = 0;

    var htmlGPA = '';
    htmlGPA += '<div class="announce">'
    htmlGPA += '<div>Current GPA: <div class="buff" id="' + color + '">' + finalGPA + '</div></div>';
    htmlGPA += '</div>'
  }

  document.getElementById('gpa').innerHTML = htmlGPA;
}
