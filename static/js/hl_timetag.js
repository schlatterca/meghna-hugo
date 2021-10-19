getJsonArray();

function getJsonArray(){
  $.ajax({
      url: '/index.json',
      type: 'GET',
      success: timelinetags
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

function timelinetags(data){
  json = data; //fetch my json
  for (var key in json) { //for each key in the json…
    if (json.hasOwnProperty(key)) { //unless that key is not used…
      var dirtyArray = json[key]; //create an array of those results…
      var result = clean(dirtyArray); //and clean it.
      if (result.hasOwnProperty("timelinetags")) { //and if the key "personags" exists…
        for (let i = 0; i < result.timelinetags.length; i++) { //for each result in "timelinetags"…

          var SurnameName = result.timelinetags[i];
          
          //exceptions in the name (unusable characters)
          if (SurnameName.includes('ç')){
            SurnameName = SurnameName.replace('ç', 'c');
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
  makeItInteractive();
  return false;
}



