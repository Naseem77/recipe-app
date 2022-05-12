$(".container").on('click','#btn',function(){
    $('#res').empty()
   let value = $("#inputRecipe").val();
    $.get(`recipes/${value}`, function(recipe){
        render(recipe);
    })
   
})

const render = function(recipe) {
  $(".data").empty();
  const source = $("#recipes-template").html();
  const template = Handlebars.compile(source);
  const newHTML = template(recipe);
  $(".data").append(newHTML);
};

$(document).on('click', '.image', function () {
  let imgClick = $(this).closest(".ingredients-container").find("li")[0].innerHTML;
  alert(imgClick);
});
