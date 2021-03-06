const express =  require('express')
const app = express()
const path = require('path')

const convert = require('./lib/convert')
const apiBCB = require('./lib/api-bcb')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req, res) => {
    const cotacao = await apiBCB.getCotacao()
    console.log('cotacao', cotacao)
    res.render('home', {
        cotacao
    })
})

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query
    if(cotacao && quantidade) {
    const conversao =  convert.convert(cotacao, quantidade)
    res.render('cotacao', {
        error: false,
        cotacao: convert.toMoney(cotacao),
        conversao: convert.toMoney(conversao),
        quantidade: convert.toMoney(quantidade)
    })
} else {
    res.render('cotacao', {
        error: 'Valores invalidos'
    })
}
})

app.listen(port, err => {
    err ? console.log('nao foi possivel iniciar ') : console.log('convertMyMoney esta online')
})

