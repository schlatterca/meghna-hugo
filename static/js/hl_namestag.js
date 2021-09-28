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

function persontags(data){
  json = data; //fetch my json
  for (var key in json) { //for each key in the json…
    if (json.hasOwnProperty(key)) { //unless that key is not used…
      var dirtyArray = json[key]; //create an array of those results…
      var result = clean(dirtyArray); //and clean it.

      if (result.hasOwnProperty("persontags")) { //and if the key "personags" exists…
        for (let i = 0; i < result.persontags.length; i++) { //for each result in "persontags"…

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

          allNames.push(SurnameName);
          allLinks.push(result.permalink);
          allTitles.push(result.title);
        }
      }
    }
  }

  const sortedNames = allNames.map((key, ind) => ({ 'name': key, 'link': [allLinks[ind]], 'title': [allTitles[ind]]}));
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

  populateWithResults(sortedNames);
  return false;
}



function populateWithResults(myResults){
  var templateDefinition = $('#persontags-result').html();

  for (var i = 0; i < myResults.length; i++) {
    //console.log(myResults[i].name, myResults[i].link, myResults[i].title);

    const persona = document.createElement("div");
    const quinome = document.createElement("p");

    persona.id = "persona";
    persona.setAttribute("style", "margin-bottom: 10px");
    //quinome.id = "quinome";
    quinome.id = myResults[i].name;
    quinome.setAttribute("style", "font-size: 20px; color: black; margin-bottom: 0px; margin-top: 20px; line-height: 0px");

    quinome.innerHTML = myResults[i].name;
    persona.append(quinome);

    for (var j = 0; j < myResults[i].link.length; j++) {
      const quilink = document.createElement("a");
      quilink.id = "quilink";
      quilink.setAttribute("href", myResults[i].link[j]);
      quilink.setAttribute("style", "font-size: 16px; color: grey;")
      quilink.innerHTML = myResults[i].title[j]+"<br>";
      persona.append(quilink);
    }    

    $('#main_person_tags').append(persona);

  }

  //console.log(sortedNames.length);
  //console.log(myResults.persontags);
  //console.log(Object.keys(myResults));
  //console.log(document.getElementById("this_article_title").innerHTML);
  //console.log(myResults.persontags.sort((a, b) => b.split(' ')[1].localeCompare(a.split(' ')[1])));
  //console.log(myResults.persontags.sort(x => myResults.persontags.map(y => y.split(' ')[1]) ).reverse());
};
