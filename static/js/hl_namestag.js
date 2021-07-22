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
    } 
  }
  return false;
}

function populateResults(result){
  $.each(result,function(key,value){
    var contents= value.item.contents;
    var snippet = "";
    var snippetHighlights=[];
    var tags =[];
    if( fuseOptions.tokenize ){
      snippetHighlights.push(searchQuery);
    }else{
      $.each(value.matches,function(matchKey,mvalue){
        if(mvalue.key == "tags"){
          snippetHighlights.push(mvalue.value);
        }else if(mvalue.key == "contents"){
          start = mvalue.indices[0][0]-summaryInclude>0?mvalue.indices[0][0]-summaryInclude:0;
          end = mvalue.indices[0][1]+summaryInclude<contents.length?mvalue.indices[0][1]+summaryInclude:contents.length;
          snippet += contents.substring(start,end);
          snippetHighlights.push(mvalue.value.substring(mvalue.indices[0][0],mvalue.indices[0][1]-mvalue.indices[0][0]+1));
        }
      });
    }

    if(snippet.length<1){
      snippet += contents.substring(0,summaryInclude*2);
    }
    //pull template from hugo templarte definition
    var templateDefinition = $('#persontags-result').html();
    //replace values
    var output = render(templateDefinition,{key:key,title:value.item.title,link:value.item.permalink,tags:value.item.tags,categories:value.item.categories,snippet:snippet});
    $('#persontags-search-results').append(output);
    
  });
}

getJsonArray();
