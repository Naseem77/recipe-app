const { response } = require('express')
const express = require('express')
const app = express()
const path = require('path')
const urllib = require('urllib')


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))



let ingredients = []
function getDataFromApi(ingredient) {
    let temp = []
    urllib.request("https://recipes-goodness.herokuapp.com/recipes/" + ingredient, function (err, data, res) {

        temp = JSON.parse(data.toString()).results;
        ingredients = temp.map((i) => {
          return {
            idMeal: i.idMeal,
            ingredients: i.ingredients,
            title: i.title,
            thumbnail: i.thumbnail,
            href: i.href,
          }
        })
    }
  );
}

app.get("/recipes/:ingredient", function (req, res) {
  const ingredientInput = req.params.ingredient;
  getDataFromApi(ingredientInput);
  res.send(ingredients);
});


const port = 8080
app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})
