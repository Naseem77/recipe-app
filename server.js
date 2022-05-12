const { response } = require('express')
const express = require('express')
const app = express()
const path = require('path')
const urllib = require('urllib')


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


let ingredients = [];

function getDataFromApi(ingredient) {
    urllib.request("https://recipes-goodness.herokuapp.com/recipes/" + ingredient, function (err, data, res) {
        ingredients = JSON.parse(data.toString());
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
