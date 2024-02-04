const express = require('express')
const app = express()
const PORT = process.env.PORT || "3000"
const facts = require("./facts.json")

app.use(express.static('public'))

app.set("view engine", "ejs")


app.listen(PORT, ()=> {
    console.log(`App is running on http://localhost:${PORT}...`)
})

app.get("/", (req, res) => {
    res.send("Options: /greet, /math, /pandorasbox")
})

//http://localhost:3000/greet?name=sean&dob=2002
app.get("/greet", (req, res) => {
    const year = Number(req.query.year)
    const age1 = 2024 - year - 1
    const age2 = 2024 - year
    console.log(req.query)
    res.render('greet', {title: "Greet", name: req.query.name, age1: age1, age2: age2})
})

app.get("/math/:num1/:op/:num2", (req, res) => {
    console.log(req.params)
    // const num1 = Number(req.params.num1)
    // const num2 = Number(req.params.num2)
    const num1 = parseInt(req.params.num1)
    const num2 = parseInt(req.params.num2)
    const op = req.params.op
    if (op == "times") {
        // res.send(`${num1 * num2}`)
        res.render('math', {title: "Math", sign: "*", num1: num1, num2: num2, answer: num1 * num2})
    }
    else if (op == "dividedby") {
        // res.send(`${num1 / num2}`)
        res.render('math', {title: "Math", sign: "/", num1: num1, num2: num2, answer: num1 / num2})
    }
    else if (op == "plus") {
        // res.send(`${num1 + num2}`)
        res.render('math', {title: "Math", sign: "+", num1: num1, num2: num2, answer: num1 + num2})
    }
    else if (op == "minus") {
        // res.send(`${num1 - num2}`)
        res.render('math', {title: "Math", sign: "-", num1: num1, num2: num2, answer: num1 - num2})
    }
    else if (op == "tothepowerof") {
        // res.send(`${num1 ** num2}`)
        res.render('math', {title: "Math", sign: "^", num1: num1, num2: num2, answer: num1 ** num2})
    }
    else {
        // res.send("Not a valid operation")
        res.render('math', {title: "Math", answer: "Not a valid operation"})
    }
})

app.get("/pandorasbox", (req, res) => {
    const choice = Math.floor(Math.random() * 3)
    if (choice == 1) {
        //dad joke
        fetch("https://icanhazdadjoke.com/", {
            headers: {
                "Accept": "application/json"
            }
            })
            .then(res => res.json())
            .then((data) => {
                res.render('pandorasbox', {title: "Pandora's Box", message: data.joke})
            })
    }
    else if (choice == 2) {
        // fact
        const length = facts.length
        const random = Math.floor(Math.random() * length)
        const fact1 = facts[random].fact
        res.render('pandorasbox', {title: "Pandora's Box", message: fact1})
    }
})