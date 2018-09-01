//I want to be able to add favorite subjects, and then it’ll give you a list of random articles based on the subjects you’ve chosen.

$(document).ready(function() {

//$("#testing123").text("test") //doesn't work on iphone for some unknown reason...

  
  $("#random").click(function() {
    //https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1&rnnamespace=0&callback=?

    window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
    
  });

  var bookmarks = [] 

  $("#input").keyup( function(e) {
    $.getJSON(
      "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" +
        $("#input").val() +
        "&utf8=&callback=?",
      function(json) {


function runThis() {
      if (!json.query) $("#results").html("");
      else {
        var output = "";
        for (value in json.query.search) {
          let title = json.query.search[value].title
          let snippet = json.query.search[value].snippet
          var star = 'fa-star-o'
          if (bookmarks.indexOf(title) !== -1) star = 'fa-star'
          output +='<div class="panel">';
          output +='<a href="https://en.wikipedia.org/wiki/'+title+'" target="_blank">';
          output +='<div class="panel-heading" value="'+title+'">'+title+'</div>';
          output +='</a>';
          output +='<div class="panel-body" value="'+snippet+'">'+snippet+'<button class="star btn"><i class="fa '+star+'"></i></button></div></div>';
        }
        $("#results").html(output);
       }
}
  if (e.which == 13) runThis()
   else runThis()


        $(".star").on("click", function() {
          $(this).children().toggleClass('fa-star-o fa-star');
          var selected = $(this).children().hasClass('fa-star');
          var nameOfLink = $(this).parent().parent().children("a").children().attr("value");
          if (selected) bookmarks = bookmarks.concat([nameOfLink]);
          else bookmarks.splice(bookmarks.indexOf(nameOfLink),1);

$("#bookmarkList").html("");
        var bookmarkList = "";
          for (value in bookmarks) {
            bookmarkList += '<li class="list-group-item">';
            bookmarkList += '<a href="https://en.wikipedia.org/wiki/'+bookmarks[value]+'" target="_blank">';
            bookmarkList += bookmarks[value]+'</a></li>';
          }
          $("#bookmarkList").html(bookmarkList);
        });


      }
    );
  });

});