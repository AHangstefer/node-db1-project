const express =require("express");
const db = require("./data/dbConfig")

const router = express.Router()

router.get("/", async (req, res, next)=> {
    try{
        const accounts = await db.select("*")
            .from("accounts")
             res.json(accounts)
    }
    catch(err){
        next(err)
    }
})

router.get("/:id", async (req, res, next)=>{
    try {
        const account = await db
            .select("*")
            .from("accounts")
            .where("id", req.params.id)
            .limit(1)

        res.json(account)
    }
    catch(err){
        next(err)
    }
})

router.post("/", async (req, res, next)=> {
    try{
        
        const newAccount = {
            name: req.body.name,
            budget: req.body.budget
        }
        if(!newAccount.name || !newAccount.budget){
            return res.status(400).json({
                message: "You need a budget"
            })
        }

        const [id] = await db
            .insert(newAccount)
            .into("accounts")
        const account = await db
            .select("*")
            .from("accounts")
            .where("id", id)
        
        res.status(201).json(account)
    }
    catch(err){
        next(err)
    }
    
})

router.put("/:id",async (req, res, next)=> {
    try{

        const changeToMake = {
            name: req.body.name,
            budget: req.body.budget
        }
        if(!changeToMake.name || !changeToMake.budget){
            return res.status(404).json({
                message: "Need a title and content"
            })
        }

        await db("accounts")
            .where("id", req.params.id)
            .update(changeToMake)

        const changedAccount = await db
            .select("*")
            .from("accounts")
            .where("id", req.params.id)

            res.json(changedAccount)



    }
    catch (err){
        next(err)
    }

})

router.delete("/:id", async (req, res, next)=>{
    try{
        await db("accounts")
            .where("id", req.params.id)
            .del()
        res.status(204).end()
    }
    catch(err){
        next(err)
    }
})



module.exports = router;