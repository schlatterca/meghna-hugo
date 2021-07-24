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

//var unsortedNames = [];
//var sortedNames = []; //prepare an array for sorted names.
var allNames = [];
var allLinks= [];

function persontags(data){
  json = data; //fetch my json
  for (var key in json) { //for each key in the json…
    if (json.hasOwnProperty(key)) { //unless that key is not used…
      var dirtyArray = json[key]; //create an array of those results…
      var result = clean(dirtyArray); //and clean it.

      if (result.hasOwnProperty("persontags")) { //and if the key "personags" exists…
        for (let i = 0; i < result.persontags.length; i++) { //for each result in "persontags"…




          /*var element = {};
          element.name = result.persontags[i];
          element.link = result.permalink;
          unsortedNames.push({element: element});


          console.log(unsortedNames);*/




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


          /*var element = {};
          element.name = SurnameName;
          element.link = result.permalink;
          sortedNames.push({element: element});*/


          allNames.push(SurnameName);
          allLinks.push(result.permalink);


          //sortedNames.push(SurnameName); //and append it to the sortedNames array.
        }
      }
    }
  }

  const sortedNames = allNames.map((key, ind) => ({ 'name': key, 'link': allLinks[ind]}));

  sortedNames.sort((a, b) => (a.name > b.name) ? 1 : -1);
  //ultimate.sort((a, b) => parseFloat(a.name) - parseFloat(b.name));
  
  console.log(sortedNames);

  //let uniqueSortedNames = [...new Set(sortedNames)]; //erase duplicates and get final array.






  //checkCorrespondance(unsortedNames);
  //populateWithResults(uniqueSortedNames);
  populateWithResults(sortedNames);
  return false;
}


/*
function checkCorrespondance(myResults){
  for (let i = 0; i < myResults.length; i++) {
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        var result = clean(json[key]);

        //if (result.hasOwnProperty("persontags")){
          console.log("a", result);
          console.log("a", myResults[i]);
          if (result.persontags.includes(myResults[i])){
            console.log("b", result.title);
          }
        }

        if ((result.hasOwnProperty("persontags"))&&(result.persontags.includes(myResults[i]))) {
          console.log(myResults[i], result.title);
        }
      }
    }
  }

}*/



function populateWithResults(myResults){
  var templateDefinition = $('#persontags-result').html();
  //var output = render(templateDefinition, result);
  for (let i = 0; i < myResults.length; i++) {
    $('#persontags-search-results').append(myResults[i], "<br>");
  }
  //console.log(sortedNames.length);
  //console.log(myResults.persontags);
  //console.log(Object.keys(myResults));
  //console.log(document.getElementById("this_article_title").innerHTML);
  //console.log(myResults.persontags.sort((a, b) => b.split(' ')[1].localeCompare(a.split(' ')[1])));
  //console.log(myResults.persontags.sort(x => myResults.persontags.map(y => y.split(' ')[1]) ).reverse());
};
