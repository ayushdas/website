function getFoodByCusine()
{
const app = document.getElementById('root');
// const logo = document.createElement('img');
// logo.src = 'logo.png';
const container = document.createElement('div');
container.setAttribute('class', 'container');
// app.appendChild(logo);
app.appendChild(container);
var request = new XMLHttpRequest();
URI = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?cuisine=Italian&diet=vegetarian&excludeIngredients=coconut&intolerances=egg%2C+gluten&number=10&offset=0&type=main+course&query=rice+and+butter";
request.open('GET',URI,true,"ayush.das007@gmail.com");
request.setRequestHeader("X-RapidAPI-Key", "208e6edba5mshc9fbd7dbf8b607cp113952jsn136cfb2f1d7b");
request.onload = function () {
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    // array_of_ids = []
    data.results.forEach(item => {
      // console.log(item.id);
      // console.log(item.image);
      // console.log(item.title)
      logo_src = data.baseUri+item.image;
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      const h1 = document.createElement('h1');
      h1.textContent = item.title;
      // const p = document.createElement('p');
      const img = document.createElement('img');
      img.addEventListener("click",function(){
        func(item.id, item.title)
      }, false);
      // deleteUnitButton.addEventListener('click', function() {
      //   deleteUnit(rowIndex)
      // }, false);
      // array_of_ids.push(item.id);
      // movie.description = movie.description.substring(0, 300);
      img.src = logo_src;
      container.appendChild(card);
      card.appendChild(h1);
      // card.appendChild(p);
      card.appendChild(img);
    });
    // console.log(array_of_ids);
  } else {
    console.log('error');
  }
}
request.send();
}

function func(id,title) {
  // alert (id);
  var request = new XMLHttpRequest();
  URI = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+id+"/information";
  request.open('GET',URI,true,"ayush.das007@gmail.com");
  request.setRequestHeader("X-RapidAPI-Key", "208e6edba5mshc9fbd7dbf8b607cp113952jsn136cfb2f1d7b");
  var modal = $('#myModal');
  title = 'Recipe for '+title;
  modal.find('.modal-header h4').html(title);
  console.log('Outside onload');
  request.onload = function () {
    console.log("In Onload function");
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      recipeAndProc = "<strong>Ingredients</strong></br>";
      ingredients = "";
      data.extendedIngredients.forEach(item => {
        ingredients += item.name + ": " + parseFloat(item.amount).toFixed(2).toString() + " " + item.unit + "</br>" ;
      });
      recipeAndProc += ingredients + "</br>";      
        if (data.instructions == null){
          recipeAndProc += "<strong>Procedure</strong></br>"+"Yet to be provided by chefs!!";
          modal.find('.modal-body p').html(recipeAndProc);
        }
        else{
          recipeAndProc += "<strong>Procedure</strong></br>"+data.instructions
          modal.find('.modal-body p').html(recipeAndProc);
        }
        console.log(data.instructions);      
  } else {
      console.log('error');
    }
  }
  // modal.find('.modal-footer a.btn').text('Remove');
  $('#myModal').modal('show');
  request.send();
}

