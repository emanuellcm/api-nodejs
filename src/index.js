const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3000 


const Film = mongoose.model('Film', {
    
    tittle: String,
    description: String,
    image_url: String,
    trailer_url: String,

});


app.get ('/', async (req, res) => {
    
    const films = await Film.find()
    res.send(films)
    
})

app.delete ('/:id', async (req, res) => {

    const film = await Film.findByIdAndDelete(req.params.id)
    return res.send(film)

})

app.put ('/:id', async (req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id, {
        tittle: req.body.tittle,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
    }, {
        new: true
    })

    return res.send(film)
})

app.post ('/', async (req, res) =>{
    
    const film = new Film({
        tittle: req.body.tittle,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
    })
    
    await film.save()
    res.send(film)

})

app.listen(port, () =>{
    
    mongoose.connect('mongodb+srv://emanuellcm:7177@api-nodejs.cw9b5h2.mongodb.net/?retryWrites=true&w=majority&appName=api-nodejs');
    console.log(`App runing ${port}`)
    
})