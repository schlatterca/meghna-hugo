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

    {name:"persontags",weight:0.7} //### ???
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

      //console.log(item);
      //console.log(item.title);
      //console.log("items: ", item.persontags);
      //console.log(document.getElementById("this_article_title").innerHTML);

      var result = clean(dirtyArray);

      populateWithResults(result);
    }
  }
  return false;
}

function populateWithResults(myResults){
  var templateDefinition = $('#persontags-result').html();
  //console.log(result);
  //console.log(result.persontags);
  //console.log(Object.keys(result));
};

getJsonArray();
