const randomId = require("../utils/random-id")

module.exports.homeController = (req,res,next)=>{
    let name = randomId()
    res.render("index",{name})
}