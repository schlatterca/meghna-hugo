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
  json = data;
  for (var key in json) {
      if (json.hasOwnProperty(key)) {
      var item = json[key];

      console.log(item);
      //console.log(item.title);
      console.log("items: ", item.persontags);
      //console.log(document.getElementById("this_article_title").innerHTML);
      populateWithResults(item.persontags);
    }
  }
  return false;
}

function populateWithResults(result){
  var templateDefinition = $('#persontags-result').html();
  //var output = render(templateDefinition, result);
  $('#persontags-search-results').append(result);
  
};

getJsonArray();



function render(templateString, data) {
  var conditionalMatches,conditionalPattern,copy;
  conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
  //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
  copy = templateString;
  while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
    if(data[conditionalMatches[1]]){
      //valid key, remove conditionals, leave contents.
      copy = copy.replace(conditionalMatches[0],conditionalMatches[2]);
    }else{
      //not valid, remove entire section
      copy = copy.replace(conditionalMatches[0],'');
    }
  }
  templateString = copy;
  //now any conditionals removed we can do simple substitution
  var key, find, re;
  for (key in data) {
    find = '\\$\\{\\s*' + key + '\\s*\\}';
    re = new RegExp(find, 'g');
    templateString = templateString.replace(re, data[key]);
  }
  return templateString;
}
