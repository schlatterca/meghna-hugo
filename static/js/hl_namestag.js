summaryInclude=100;
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
};

function getJsonArray(){
  $.ajax({
      url : '/index.json',
      type: 'GET',
      success : persontags
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

function persontags(data){
  json = data;
  for (var key in json) {
      if (json.hasOwnProperty(key)) {
      var dirtyArray = json[key];
      var result = clean(dirtyArray);
      populateWithResults(result);
    }
  }
  return false;
}

function populateWithResults(myResults){

  var templateDefinition = $('#persontags-result').html();
  //var output = render(templateDefinition, result);

  if (myResults.hasOwnProperty("persontags")) {
    for (let i = 0; i < myResults.persontags.length; i++) {
      console.log(myResults.persontags[i]);


      //console.log(myResults.persontags.sort((a, b) => b.split(' ')[1].localeCompare(a.split(' ')[1])));
      console.log(myResults.persontags.sort(x => myResults.persontags.map(y => y.split(' ')[1]) ).reverse());

      $('#persontags-search-results').append(myResults.persontags[i], "<br>");
    }
  }

  //$('#persontags-search-results').append(myResults.persontags, "<br>");

  //console.log(myResults.persontags);
  //console.log(Object.keys(myResults));
  //console.log(document.getElementById("this_article_title").innerHTML);

};

getJsonArray();
