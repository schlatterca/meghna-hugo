getJsonArray_timeline();

function getJsonArray_timeline(){
  $.ajax({
      url: '/index.json',
      type: 'GET',
      success: timelinetags
  })
}

function clean_timeline(array) {
  for (var key in array) {
    if (array[key] === null || array[key] === undefined) {
      delete array[key];
    }
  }
  return array
}

var allNames_timeline = [];
var allLinks_timeline = [];
var allTitles_timeline = [];

function timelinetags(data){
  json = data; //fetch my json
  for (var key in json) { //for each key in the json…
    if (json.hasOwnProperty(key)) { //unless that key is not used…
      var dirtyArray = json[key]; //create an array of those results…
      var result = clean_timeline(dirtyArray); //and clean it.
      if (result.hasOwnProperty("timelinetags")) { //and if the key "personags" exists…
        for (let i = 0; i < result.timelinetags.length; i++) { //for each result in "timelinetags"…

          var SurnameName = result.timelinetags[i];
          
          //exceptions in the name (unusable characters)
          if (SurnameName.includes('ç')){
            SurnameName = SurnameName.replace('ç', 'c');
          }

          allNames_timeline.push(SurnameName);
          allLinks_timeline.push(result.permalink);
          allTitles_timeline.push(result.title);
        }
      }
    }
  }

  const sortedNames = allNames_timeline.map((key, ind) => ({ 'name': key, 'link': [allLinks_timeline[ind]], 'title': [allTitles_timeline[ind]]}));
  sortedNames.sort((a, b) => (a.name > b.name) ? 1 : -1);

  //adjust, remove duplicates
  for (var i = 0; i < sortedNames.length; i++) {
    if ((i != 0)&&(sortedNames[i].name == sortedNames[i-1].name)){
      sortedNames[i-1].link.push(sortedNames[i].link[0]);
      sortedNames[i-1].title.push(sortedNames[i].title[0]);
      sortedNames.splice(i, 1);
      i = i-1;
    }
  }

  populateWithResults_timeline(sortedNames);
  makeItInteractive_timeline();
  return false;
}



function populateWithResults_timeline(myResults){
  var templateDefinition = $('#timetag-result').html();

  for (var i = 0; i < myResults.length; i++) {

    const persona = document.createElement("span");
    const quinome = document.createElement("span");
    const spaceAfter = document.createElement("span");

    persona.id = myResults[i].name;

    persona.setAttribute("style", "margin-top: 10px; line-height: 0.6em; cursor: pointer;");
    quinome.id = "quinome";
    quinome.setAttribute("style", "font-size: 20px; color: black; margin-bottom: 0px; margin-top: 20px;");

    quinome.innerHTML = myResults[i].name+" "; //DELETE
    persona.append(quinome);
    spaceAfter.innerHTML = "&nbsp;";
    persona.append(spaceAfter);

    for (var j = 0; j < myResults[i].link.length; j++) {
      const quilink = document.createElement("a");
      quilink.id = "quilink";
      quilink.setAttribute("href", myResults[i].link[j]);
      quilink.setAttribute("style", "font-size: 16px; color: grey;")
      quilink.innerHTML = myResults[i].title[j]+"<br>";
    }    

    $('#timelinetags-search-results').append(persona);

    //make a box for each result
    const indexBox = document.createElement("div");

    if (myResults[i].name.includes(" ")){
      var nameForID = myResults[i].name.replaceAll(" ", "-");
      indexBox.id = nameForID;
    } else {
      indexBox.id = myResults[i].name;
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

    indexBoxName.innerHTML = myResults[i].name;
    closeIndexBox.innerHTML = "+";

    for (var j = 0; j < myResults[i].link.length; j++) {
      const quilink = document.createElement("a");
      quilink.id = "quilink";
      quilink.setAttribute("href", myResults[i].link[j]);
      quilink.innerHTML = myResults[i].title[j]+"<br>";
      indexBoxText.append(quilink);
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
    document.getElementById(url[1]).scrollIntoView({ behavior: 'smooth'});
    document.getElementById(url[1]).children[0].style.color = "#B44BEB";
  }
};

function makeItInteractive_timeline(){
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
        var thisIndexBox = this.textContent.slice(0, -1);
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
