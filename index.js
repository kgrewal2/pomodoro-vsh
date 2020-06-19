const express = require('express')
const path = require('path')

const timerApp = express()

timerApp.get('/', (req, res) =>{
    res.render('./index.html') 
})