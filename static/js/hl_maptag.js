getJsonArray_map();

function getJsonArray_map(){
  $.ajax({
      url: '/index.json',
      type: 'GET',
      success: maptags
  })
}

function clean_map(array) {
  for (var key in array) {
    if (array[key] === null || array[key] === undefined) {
      delete array[key];
    }
  }
  return array
}

var allNames_map = [];
var allLinks_map = [];
var allTitles_map = [];

function maptags(data){
  json = data; //fetch my json
  for (var key in json) { //for each key in the json…
    if (json.hasOwnProperty(key)) { //unless that key is not used…
      var dirtyArray = json[key]; //create an array of those results…
      var result = clean_map(dirtyArray); //and clean it.
      if (result.hasOwnProperty("maptags")) { //and if the key "personags" exists…
        for (let i = 0; i < result.maptags.length; i++) { //for each result in "maptags"…

          var SurnameName = result.maptags[i];
          
          //exceptions in the name (unusable characters)
          if (SurnameName.includes('ç')){
            SurnameName = SurnameName.replace('ç', 'c');
          }

          allNames_map.push(SurnameName);
          allLinks_map.push(result.permalink);
          allTitles_map.push(result.title);
        }
      }
    }
  }

  const sortedNames = allNames_map.map((key, ind) => ({ 'name': key, 'link': [allLinks_map[ind]], 'title': [allTitles_map[ind]]}));
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

  populateWithResults_map(sortedNames);
  makeItInteractive_map();
  return false;
}



function populateWithResults_map(myResults){
  var templateDefinition = $('#maptag-result').html();

  for (var i = 0; i < myResults.length; i++) {

    const persona = document.createElement("span");
    const quinome = document.createElement("span");
    const spaceAfter = document.createElement("span");

    persona.id = myResults[i].name.replaceAll(" ", "%20");

    persona.setAttribute("style", "margin-top: 10px; line-height: 0.6em; cursor: pointer; display: inline-block;");
    quinome.id = "quinome";
    quinome.setAttribute("style", "font-size: 20px; color: black; margin-bottom: 0px; margin-top: 20px;");

    quinome.innerHTML = myResults[i].name+" ";
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

    $('#maptags-search-results').append(persona);

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
    $('#indexboxspace_map').append(indexBox);
  }

  //Delay and scroll down to selected ID
  var url = window.location.href;
  if(url.includes('#')) {
    var url = url.split('#');
    if (document.getElementById(url[1])){
      document.getElementById(url[1]).scrollIntoView({ behavior: 'smooth'});
      document.getElementById(url[1]).children[0].style.color = "#B44BEB";
    }
  }
};

function makeItInteractive_map(){
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
        var thisIndexBox = this.textContent.slice(0, -1).replaceAll(" ", "-");
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
