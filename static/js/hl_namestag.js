getJsonArray();

function getJsonArray(){
  $.ajax({
      url: '/index.json',
      type: 'GET',
      success: persontags
  })
}

function clean(array) {
  for (var key in array) {
    if (array[key] === null || array[key] === undefined) {
      delete array[key];
    }
  }
  return array
}

var allNames = [];
var allLinks= [];
var allTitles= [];
var allSubjects = [];
var allLinks_subject= [];
var allTitles_subject= [];

function persontags(data){
  json = data; //fetch my json
  for (var key in json) { //for each key in the json…
    if (json.hasOwnProperty(key)) { //unless that key is not used…
      var dirtyArray = json[key]; //create an array of those results…
      var result = clean(dirtyArray); //and clean it.

      //for the persons
      if (result.hasOwnProperty("persontags")) { //and if the key "personags" exists…
        for (let i = 0; i < result.persontags.length; i++) { //for each result in "persontags"…

          if (result.persontags[i].includes(" ")){

            var data = result.persontags[i]; //split it and change name with surname…
            data = data.split(' ');

            for (var j = 0; j < data.length; j++) { //capitalize first letter
              data[j] = data[j].charAt(0).toUpperCase() + data[j].slice(1);
            }

            if (data.length == 4) { //rearrange
              var SurnameName = data[3] + ' ' + data[0] + ' ' + data[1] + ' ' + data[2];
            } if (data.length == 3) {
              var SurnameName = data[2] + ' ' + data[0] + ' ' + data[1];
            } if (data.length == 2) {
              var SurnameName = data[1] + ' ' + data[0];
            }

          } else {
            var SurnameName = result.persontags[i];
          }
          //exceptions in the name (unusable characters)
          if (SurnameName.includes('ç')){
            SurnameName = SurnameName.replace('ç', 'c');
          }

          allNames.push(SurnameName);
          allLinks.push(result.permalink);
          allTitles.push(result.title);
        }
      }

      //now for the subjects
      if (result.hasOwnProperty("subjectstags")) { //and if the key "personags" exists…
        for (let i = 0; i < result.subjectstags.length; i++) { //for each result in "persontags"…

          var SubjectName = result.subjectstags[i];
          
          //exceptions in the name (unusable characters)
          if (SubjectName.includes('ç')){
            SubjectName = SubjectName.replace('ç', 'c');
          }

          allSubjects.push(SubjectName);
          allLinks_subject.push(result.permalink);
          allTitles_subject.push(result.title);
        }
      }
    }
  }

  const sortedNames = allNames.map((key, ind) => ({ 'name': key, 'link': [allLinks[ind]], 'title': [allTitles[ind]]}));
  sortedNames.sort((a, b) => (a.name > b.name) ? 1 : -1);

  const sortedSubjects = allSubjects.map((key, ind) => ({ 'subject': key, 'link_subject': [allLinks_subject[ind]], 'title_subject': [allTitles_subject[ind]]}));
  sortedSubjects.sort((a, b) => (a.subject > b.subject) ? 1 : -1);

  //adjust, remove duplicates
  for (var i = 0; i < sortedNames.length; i++) {
    if ((i != 0)&&(sortedNames[i].name == sortedNames[i-1].name)){
      sortedNames[i-1].link.push(sortedNames[i].link[0]);
      sortedNames[i-1].title.push(sortedNames[i].title[0]);
      sortedNames.splice(i, 1);
      i = i-1;
    }
  }

  for (var i = 0; i < sortedSubjects.length; i++) {
    if ((i != 0)&&(sortedSubjects[i].subject == sortedSubjects[i-1].subject)){
      sortedSubjects[i-1].link_subject.push(sortedSubjects[i].link_subject[0]);
      sortedSubjects[i-1].title_subject.push(sortedSubjects[i].title_subject[0]);
      sortedSubjects.splice(i, 1);
      i = i-1;
    }
  }

  populateWithResults(sortedNames);
  populateWithResults(sortedSubjects);
  makeItInteractive();
  return false;
}



function populateWithResults(myResults){
  var templateDefinition = $('#persontags-result').html();

  for (var i = 0; i < myResults.length; i++) {

    const persona = document.createElement("span");
    const quinome = document.createElement("span");
    const spaceAfter = document.createElement("span");

    if (myResults[0].hasOwnProperty("name")) {
      if (myResults[i].name.includes(" ")){
        var nameForID = myResults[i].name.replaceAll(" ", "%20");
        persona.id = nameForID;
      } else {
        persona.id = myResults[i].name;
      }
    }

    if (myResults[0].hasOwnProperty("subject")) {
      if (myResults[i].subject.includes(" ")){
        var nameForID = myResults[i].subject.replaceAll(" ", "%20");
        persona.id = nameForID;
      } else {
        persona.id = myResults[i].subject;
      }
    }


    persona.setAttribute("style", "margin-top: 10px; line-height: 0.6em; cursor: pointer; display: inline-block;");
    quinome.id = "quinome";
    quinome.setAttribute("style", "font-size: 20px; color: black; margin-bottom: 0px; margin-top: 20px;");

    if (myResults[0].hasOwnProperty("name")) {
      quinome.innerHTML = myResults[i].name;
    }
    if (myResults[0].hasOwnProperty("subject")) {
      quinome.innerHTML = myResults[i].subject;
    }
    persona.append(quinome);
    spaceAfter.innerHTML = "&nbsp;";
    persona.append(spaceAfter);

    if (myResults[0].hasOwnProperty("name")) {
      for (var j = 0; j < myResults[i].link.length; j++) {
        const quilink = document.createElement("a");
        quilink.id = "quilink";
        quilink.setAttribute("href", myResults[i].link[j]);
        quilink.setAttribute("style", "font-size: 16px; color: grey;")
        quilink.innerHTML = myResults[i].title[j]+"<br>";
      }
    }
    if (myResults[0].hasOwnProperty("subject")) {
      for (var j = 0; j < myResults[i].link_subject.length; j++) {
        const quilink = document.createElement("a");
        quilink.id = "quilink";
        quilink.setAttribute("href", myResults[i].link_subject[j]);
        quilink.setAttribute("style", "font-size: 16px; color: grey;")
        quilink.innerHTML = myResults[i].title_subject[j]+"<br>";
      }
    }

    if (myResults[0].hasOwnProperty("name")) {
      $('#persontags-search-results').append(persona);
    }
    if (myResults[0].hasOwnProperty("subject")) {
      $('#subjecttags-search-results').append(persona);
    }
    

    //make a box for each result
    const indexBox = document.createElement("div");

    if (myResults[0].hasOwnProperty("name")) {
      if (myResults[i].name.includes(" ")){
        var nameForID = myResults[i].name.replaceAll(" ", "-");
        indexBox.id = nameForID;
      } else {
        indexBox.id = myResults[i].name;
      }
    }
    if (myResults[0].hasOwnProperty("subject")) {
      if (myResults[i].subject.includes(" ")){
        var nameForID = myResults[i].subject.replaceAll(" ", "-");
        indexBox.id = nameForID;
      } else {
        indexBox.id = myResults[i].subject;
      }
    }

    indexBox.setAttribute('class', 'index_box');
    const indexBoxInside = document.createElement("div");
    indexBoxInside.setAttribute('class', 'index_box_inside');
    indexBoxInside.style.width = "100%";
    const indexBoxName = document.createElement("p");
    indexBoxName.setAttribute('class', 'index_box_name');
    const indexBoxText = document.createElement("p");
    indexBoxText.setAttribute('class', 'index_box_text');
    const closeIndexBox = document.createElement("div");
    closeIndexBox.setAttribute('class', 'close_index_box');

    if (myResults[0].hasOwnProperty("name")) {
      indexBoxName.innerHTML = myResults[i].name;
    }
    if (myResults[0].hasOwnProperty("subject")) {
      indexBoxName.innerHTML = myResults[i].subject;
    }
    closeIndexBox.innerHTML = "+";

    if (myResults[0].hasOwnProperty("name")) {
      for (var j = 0; j < myResults[i].link.length; j++) {
        const quilink = document.createElement("a");
        quilink.id = "quilink";
        quilink.setAttribute("href", myResults[i].link[j]);
        quilink.innerHTML = myResults[i].title[j]+"<br>";
        indexBoxText.append(quilink);
      }
    }
    if (myResults[0].hasOwnProperty("subject")) {
      for (var j = 0; j < myResults[i].link_subject.length; j++) {
        const quilink = document.createElement("a");
        quilink.id = "quilink";
        quilink.setAttribute("href", myResults[i].link_subject[j]);
        quilink.innerHTML = myResults[i].title_subject[j]+"<br>";
        indexBoxText.append(quilink);
      }
    }

    

    indexBoxInside.append(indexBoxName);
    indexBoxInside.append(indexBoxText);
    indexBox.append(indexBoxInside);
    indexBox.append(closeIndexBox);
    $('#indexboxspace').append(indexBox);

  }

  //Delay and scroll down to selected ID
  var url = window.location.href;
  if(url.includes('#')) {
    var url = url.split('#');
    if (document.getElementById(url[1])){
      if (document.getElementById(url[1]).parentElement.id == "subjecttags-search-results"){
        document.getElementsByClassName('personsButton')[0].classList.remove('index_sel_box_active');
        document.getElementsByClassName('subjectButton')[0].classList.add('index_sel_box_active');
        document.getElementById("persontags-search-results").classList.remove('index_sel_active');
        document.getElementById("persontags-search-results").classList.add('index_sel_inactive');
        document.getElementById("subjecttags-search-results").classList.remove('index_sel_inactive');
        document.getElementById("subjecttags-search-results").classList.add('index_sel_active');
      }
      document.getElementById(url[1]).scrollIntoView({ behavior: 'smooth'});
      document.getElementById(url[1]).children[0].style.color = "#B44BEB";
    }
  }
};

function makeItInteractive(){
  $('span#quinome').each(
    function() {
      $(this).on("mouseover", function(e) {

        $('span#quinome').each(
          function() {
            $(this).css('color', 'black');
          }
        );

        $(this).css('color', '#B44BEB');
      });
      $(this).on("mouseout", function(e) {
        $(this).css('color', 'black');
      });

      $(this).on("click", function(e) {
        indexBackground.style.display = "block";
        var thisIndexBox = this.textContent.replaceAll(" ", "-");
        $("#"+thisIndexBox+".index_box").css('display', 'flex');
      });
    }
  );

  $(".close_index_box").on("click", function(e) {
    document.getElementById("indexBackground").style.display="none";
    $('.index_box').each(
      function() {
        $(this).css('display', 'none');
      }
    );
  });
}
