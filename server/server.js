const express = require('express')
const compression = require('compression')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(compression())

app.post('/search', (req, res) => {
    const {keyword} = req.body;
    console.log(req.body)
    axios.get(`https://testtechnext1-pearl118.b4a.run/search/api/query/?query=${keyword}`)
    .then(response => {
        res.json(response.data)
        console.log('Got data!')
    })
    .catch(error => {
        res.status(500).json({error: 'An error occured'})
        console.log(error)
    })
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})