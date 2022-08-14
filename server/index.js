const express = require("express")
const app = express()

const router = express.Router()

router.get("/simple/get", (req, res) => {
  res.json({
    msg: "hello world"
  })
})

app.use(express.static(__dirname))

app.use(router)

const port = 8081
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
