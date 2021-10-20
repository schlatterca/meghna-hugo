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

          if (result.persontags[i].includes(" ")){

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

          } else {
            var SurnameName = result.persontags[i];
          }
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



function populateWithResults(myResults){
  var templateDefinition = $('#persontags-result').html();

  for (var i = 0; i < myResults.length; i++) {
    //console.log(myResults[i].name, myResults[i].link, myResults[i].title);

    const persona = document.createElement("span");
    const quinome = document.createElement("span");
    const spaceAfter = document.createElement("span");

    //persona.id = "persona";

    if (myResults[i].name.includes(" ")){
      var nameForID = myResults[i].name.replaceAll(" ", "%20");
      persona.id = nameForID;
      persona.setAttribute("class", "persona");
    } else {
      persona.id = myResults[i].name;
    }

    persona.setAttribute("style", "margin-top: 10px; line-height: 0.6em; cursor: pointer;");
    quinome.id = "quinome";
    quinome.setAttribute("style", "font-size: 20px; color: black; margin-bottom: 0px; margin-top: 20px;");

    quinome.innerHTML = myResults[i].name;
    persona.append(quinome);
    spaceAfter.innerHTML = "&nbsp;";
    persona.append(spaceAfter);

    for (var j = 0; j < myResults[i].link.length; j++) {
      const quilink = document.createElement("a");
      quilink.id = "quilink";
      quilink.setAttribute("href", myResults[i].link[j]);
      quilink.setAttribute("style", "font-size: 16px; color: grey;")
      quilink.innerHTML = myResults[i].title[j]+"<br>";
      //persona.append(quilink);
    }    

    $('#persontags-search-results').append(persona);

    //make a box for each result
    const indexBox = document.createElement("div");

    if (myResults[i].name.includes(" ")){
      var nameForID = myResults[i].name.replaceAll(" ", "-");
      indexBox.id = nameForID;
    } else {
      indexBox.id = myResults[i].name;
    }

    indexBox.setAttribute('class', 'index_box');
    const indexBoxInside = document.createElement("div");
    indexBoxInside.setAttribute('class', 'index_box_inside');
    indexBoxInside.style.width = "100%";
    const indexBoxName = document.createElement("p");
    indexBoxName.setAttribute('class', 'index_box_name');
    const indexBoxText = document.createElement("p");
    indexBoxText.setAttribute('class', 'index_box_text');
    const closeIndexBox = document.createElement("div");
    closeIndexBox.setAttribute('class', 'close_index_box');

    indexBoxName.innerHTML = myResults[i].name;
    closeIndexBox.innerHTML = "+";

    for (var j = 0; j < myResults[i].link.length; j++) {
      const quilink = document.createElement("a");
      quilink.id = "quilink";
      quilink.setAttribute("href", myResults[i].link[j]);
      //quilink.setAttribute("style", "font-size: 16px; color: grey;");
      quilink.innerHTML = myResults[i].title[j]+"<br>";
      indexBoxText.append(quilink);
    }

    /*<div class="index_box">
        <div class="index_box_inside" style="width: 100%">
          <p class="index_box_name">Name Surname</p>
          <p class="index_box_text">Links</p>
        </div>
        <div class="close_index_box">+</div>
      </div>*/

    indexBoxInside.append(indexBoxName);
    indexBoxInside.append(indexBoxText);
    indexBox.append(indexBoxInside);
    indexBox.append(closeIndexBox);
    $('#indexboxspace').append(indexBox);

  }

  //console.log(sortedNames.length);
  //console.log(myResults.persontags);
  //console.log(Object.keys(myResults));
  //console.log(document.getElementById("this_article_title").innerHTML);
  //console.log(myResults.persontags.sort((a, b) => b.split(' ')[1].localeCompare(a.split(' ')[1])));
  //console.log(myResults.persontags.sort(x => myResults.persontags.map(y => y.split(' ')[1]) ).reverse());

  //Delay and scroll down to selected ID
  var url = window.location.href;
  if(url.includes('#')) {
    var url = url.split('#');
    if (document.getElementById(url[1])){
      document.getElementById(url[1]).scrollIntoView({ behavior: 'smooth'});
      document.getElementById(url[1]).children[0].style.color = "#B44BEB";
    }
  }
};

function makeItInteractive(){
  $('span#quinome').each(
    function() {
      $(this).on("mouseover", function(e) {

        $('span#quinome').each(
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
        var thisIndexBox = this.textContent.replaceAll(" ", "-");
        $("#"+thisIndexBox+".index_box").css('display', 'flex');
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
