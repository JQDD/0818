const express = require("express");
const handlers=require("./db");
const router=express.Router();
router.get("/",(req,res)=>{
    var data={
            name:req.query.name,
            psw:Number(req.query.psw)
        }
    handlers("students","find","data",(result)=>{
        if(result.length>0){
            res.send({"msg":"success"});
        }else{
            res.send({"msg":"error"});
        }
    })
})
module.exports=router;