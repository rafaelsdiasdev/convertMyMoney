const axios = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoVenda`

const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getToday = () => {
    const today = new Date()
    return `${(today.getMonth()+1)}-${today.getDate()}-${today.getFullYear()}`
    // console.log(today.getDate(), today.getFullYear(), today.getMonth() + 1)
}


const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async () => {
    try {
        const today = getToday()
        const url  = getUrl(today)
        const res = await getCotacaoAPI(url) // '11-29-2019'
        const cotacao = extractCotacao(res)
        return cotacao
    } catch (err) {
        return ''
    }
}
module.exports = {
    getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao}),
    extractCotacao,
    getCotacaoAPI,
    getToday,
    getUrl,
    pure: {
        getCotacao
    }
}