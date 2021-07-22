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

function persontags(data){
  void json = data;
  for (var key in json) {
      if (json.hasOwnProperty(key)) {
      var item = json[key];

      //console.log(item);
      //console.log(item.title);
      //console.log("items: ", item.persontags);
      //console.log(document.getElementById("this_article_title").innerHTML);
      populateWithResults(item);
    }
  }
  return false;
}

function populateWithResults(result){
  var templateDefinition = $('#persontags-result').html();
  console.log(result);

  if(result == null){
    console.log("null");
  } else {
    console.log(result.persontags);
  }

  /*for (let i = 0; i < result.length; i++){
    $('#persontags-search-results').append(result[i], " ", "<br>"); 
  }*/
  /*result.forEach(function(element, index) {
    console.log(element);
  });*/
  
};

getJsonArray();
