getJsonArray_tl();

function getJsonArray_tl(){
  $.ajax({
      url: '/index.json',
      type: 'GET',
      success: timelinetags
  })
}

function clean_tl(array) {
  for (var key in array) {
    if (array[key] === null || array[key] === undefined) {
      delete array[key];
    }
  }
  return array
}

var allNames_tl = [];
var allLinks_tl = [];
var allTitles_tl = [];

function timelinetags(data){
  json_tl = data; //fetch my json
  for (var key in json_tl) { //for each key in the json…
    if (json_tl.hasOwnProperty(key)) { //unless that key is not used…
      var dirtyArray = json_tl[key]; //create an array of those results…
      var result = clean_tl(dirtyArray); //and clean it.
      if (result.hasOwnProperty("timelinetags")) { //and if the key "persona_tlgs" exists…
        for (let i = 0; i < result.timelinetags.length; i++) { //for each result in "timelinetags"…

          var SurnameName = result.timelinetags[i];
          
          //exceptions in the name (unusable characters)
          if (SurnameName.includes('ç')){
            SurnameName = SurnameName.replace('ç', 'c');
          }

          allNames_tl.push(SurnameName);
          allLinks_tl.push(result.permalink);
          allTitles_tl.push(result.title);
        }
      }
    }
  }

  const sortedNames_tl = allNames_tl.map((key, ind) => ({ 'name': key, 'link': [allLinks_tl[ind]], 'title': [allTitles_tl[ind]]}));
  sortedNames_tl.sort((a, b) => (a.name > b.name) ? 1 : -1);

  //adjust, remove duplicates
  for (var i = 0; i < sortedNames_tl.length; i++) {
    if ((i != 0)&&(sortedNames_tl[i].name == sortedNames_tl[i-1].name)){
      sortedNames_tl[i-1].link.push(sortedNames_tl[i].link[0]);
      sortedNames_tl[i-1].title.push(sortedNames_tl[i].title[0]);
      sortedNames_tl.splice(i, 1);
      i = i-1;
    }
  }

  populateWithResults_tl(sortedNames_tl);
  makeItInteractive_tl();
  return false;
}



function populateWithResults_tl(myResults){
  var templateDefinition = $('#timetag-result').html();

  console.log(myResults);

  for (var i = 0; i < myResults.length; i++) {

    const persona_tl = document.createElement("span");
    const quinome_tl = document.createElement("span");
    const spaceAfter_tl = document.createElement("span");

    persona_tl.id = myResults[i].name;

    persona_tl.setAttribute("style", "margin-top: 10px; line-height: 0.6em; cursor: pointer;");
    quinome_tl.id = "quinome_tl";
    quinome_tl.setAttribute("style", "font-size: 20px; color: black; margin-bottom: 0px; margin-top: 20px;");

    quinome_tl.innerHTML = myResults[i].name+" "; //DELETE
    persona_tl.append(quinome_tl);
    spaceAfter_tl.innerHTML = "&nbsp;";
    persona_tl.append(spaceAfter_tl);

    for (var j = 0; j < myResults[i].link.length; j++) {
      const quilink_tl = document.createElement("a");
      quilink_tl.id = "quilink";
      quilink_tl.setAttribute("href", myResults[i].link[j]);
      quilink_tl.setAttribute("style", "font-size: 16px; color: grey;")
      quilink_tl.innerHTML = myResults[i].title[j]+"<br>";
    }    

    $('#timelinetags-search-results').append(persona_tl);

    //make a box for each result
    const indexBox_tl = document.createElement("div");

    if (myResults[i].name.includes(" ")){
      var nameForID = myResults[i].name.replaceAll(" ", "-");
      indexBox_tl.id = nameForID;
    } else {
      indexBox_tl.id = myResults[i].name;
    }

    indexBox_tl.setAttribute('class', 'index_box');
    const indexBox_tlInside = document.createElement("div");
    indexBox_tlInside.setAttribute('class', 'index_box_inside');
    indexBox_tlInside.style.width = "100%";
    const indexBox_tlName = document.createElement("p");
    indexBox_tlName.setAttribute('class', 'index_box_name');
    const indexBox_tlText = document.createElement("p");
    indexBox_tlText.setAttribute('class', 'index_box_text');
    const closeindexBox_tl = document.createElement("div");
    closeindexBox_tl.setAttribute('class', 'close_index_box');

    indexBox_tlName.innerHTML = myResults[i].name;
    closeindexBox_tl.innerHTML = "+";

    for (var j = 0; j < myResults[i].link.length; j++) {
      const quilink_tl = document.createElement("a");
      quilink_tl.id = "quilink";
      quilink_tl.setAttribute("href", myResults[i].link[j]);
      quilink_tl.innerHTML = myResults[i].title[j]+"<br>";
      indexBox_tlText.append(quilink_tl);
    }
    indexBox_tlInside.append(indexBox_tlName);
    indexBox_tlInside.append(indexBox_tlText);
    indexBox_tl.append(indexBox_tlInside);
    indexBox_tl.append(closeindexBox_tl);
    $('#indexBox_tlspace').append(indexBox_tl);
  }

  //Delay and scroll down to selected ID
  var url = window.location.href;
  if(url.includes('#')) {
    var url = url.split('#');
    document.getElementById(url[1]).scrollIntoView({ behavior: 'smooth'});
    document.getElementById(url[1]).children[0].style.color = "#B44BEB";
  }
};

function makeItInteractive_tl(){
  $('span#quinome_tl').each(
    function() {
      $(this).on("mouseover", function(e) {

        $('span#quinome_tl').each(
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
        var thisindexBox_tl = this.textContent.substring(0, this.textContent.length - 1);
        $("#"+thisindexBox_tl+".index_box").css('display', 'flex');
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
