/*summaryInclude=100;
var fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  threshold: 0.0,
  tokenize:true,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 3,
  keys: [
    {name:"title",weight:0.8},
    {name:"contents",weight:0.5},
    {name:"tags",weight:0.3},
    {name:"persontags",weight:0.7}
  ]
};*/

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

let sortedNames = []; //prepare an array for sorted names.

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

          var SurnameName = data[1] + ' ' + data[0];
          sortedNames.push(SurnameName); //and append it to the sortedNames array.
        }
      }
    }
  }
  sortedNames.sort(); //sort sortedNames alphabetically.
  populateWithResults(sortedNames);
  return false;
}

function populateWithResults(myResults){
  var templateDefinition = $('#persontags-result').html();
  //var output = render(templateDefinition, result);
  for (let i = 0; i < sortedNames.length; i++) {
    $('#persontags-search-results').append(sortedNames[i], "<br>");
  }

  //console.log(sortedNames.length);
  //console.log(myResults.persontags);
  //console.log(Object.keys(myResults));
  //console.log(document.getElementById("this_article_title").innerHTML);
  //console.log(myResults.persontags.sort((a, b) => b.split(' ')[1].localeCompare(a.split(' ')[1])));
  //console.log(myResults.persontags.sort(x => myResults.persontags.map(y => y.split(' ')[1]) ).reverse());
};

getJsonArray();
