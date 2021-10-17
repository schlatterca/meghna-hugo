summaryInclude=60;
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
    {name:"tags",weight:0.3}
  ]
};


var searchQuery = param("s");
if(searchQuery){
  $("#search-query").val(searchQuery);
  executeSearch(searchQuery);
}else {
  $('#search-results').append("<p>Please enter a word or phrase above</p>");
}



function executeSearch(searchQuery){
  $.getJSON( "/index.json", function( data ) {
    var pages = data;
    var fuse = new Fuse(pages, fuseOptions);
    var result = fuse.search(searchQuery);
    console.log({"matches":result});
    if(result.length > 0){
      populateResults(result);
    }else{
      $('#search-results').append("<p>No matches found</p>");
    }
  });
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
    //pull template from hugo template definition
    var templateDefinition = $('#search-result-template').html();
    //replace values
    var output = render(templateDefinition,{key:key,title:value.item.title,link:value.item.permalink,tags:value.item.tags,categories:value.item.categories,snippet:snippet});
    $('#search-results').append(output);

    /*momentarily comment the highlight part…
    $.each(snippetHighlights,function(snipkey,snipvalue){
      $("#summary-"+key).mark(snipvalue);
    });
    */

    console.log(this);
    console.log(this.item);

    let article = document.createElement('article');
    article.setAttribute('class', 'col-lg-4 col-md-6 col-12 clearfix wow fadeInUp mb-4');
    article.setAttribute('data-wow-duration', '500ms');
    /**/let postBlock = document.createElement('div');
    postBlock.setAttribute('class', 'post-block');
    /****/let mediaWrapper = document.createElement('div');
    mediaWrapper.setAttribute('class', 'media-wrapper');
    /******/let imgFluid = document.createElement('img');
    imgFluid.setAttribute('class', 'img-fluid');
    imgFluid.setAttribute('src', 'https://harfenlabor.netlify.app'+this.item.image);
    /****/let content = document.createElement('div');
    content.setAttribute('class', 'content');
    /******/let title = document.createElement('h3');
    /********/let title_link = document.createElement('a');
    title_link.setAttribute('href', this.item.permalink);
    let title_link_text = document.createTextNode(this.item.title);
    title_link.appendChild(title_link_text);
    title.appendChild(title_link);
    /******/let summary = document.createElement('p');
    let summary_text = document.createTextNode(this.item.contents.replace(/^(.{550}[^\s]*).*/));
    summary.appendChild(summary_text);
    /******/let readMore = document.createElement('a');
    readMore.setAttribute('class', 'btn btn-transparent');
    readMore.setAttribute('href', this.item.permalink);
    let readMore_text = document.createTextNode("Read more");
    readMore.appendChild(readMore_text);

    mediaWrapper.append(imgFluid);
    content.append(title);
    content.append(summary);
    content.append(readMore);
    postBlock.append(mediaWrapper);
    postBlock.append(content);
    article.append(postBlock);
    document.getElementById('toBePopulated').append(article);

    /*<article class="col-lg-4 col-md-6 col-12 clearfix wow fadeInUp mb-4" data-wow-duration="500ms">
      <div class="post-block">
        <div class="media-wrapper">
          <img class="img-fluid" data-src="{{ .Params.Image_webp | absURL }}" src="{{ .Params.image | absURL }}">
        </div>

        <div class="content">
          <h3><a href="{{ .Permalink }}">{{ .Title }}</a></h3>
          <p>{{ .Summary }}</p>
          <a class="btn btn-transparent" href="{{ .Permalink }}">{{ i18n "readMore" }}</a>
        </div>
      </div>
    </article>*/

    
  });
}

function param(name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}

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
