"use strict"

const User = require('../models/user')

module.exports={
    list: async(req,res)=>{
         /*
            #swagger.tags = ["Toppings"]
            #swagger.summary = "List Toppings"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
       const data = await res.getModelList(Topping)
       res.status(200).send({
        error: false,
        details:await res.getModelListDetails(Topping),
        data
    })
    },
    
    create: async(req,res)=>{
        /*
            #swagger.tags = ["Toppings"]
            #swagger.summary = "Create Topping"
        */
       const data =await Topping.create(req.body)
       res.status(201).send({
        error:false,
        data
       })
    },
   

    read: async(req,res)=>{
        /*
            #swagger.tags = ["Toppings"]
            #swagger.summary = "Get Single Topping"
        */
       const data =await Topping.findOne({_id : req.params.id})  //-->userId si URL'den gelen id'ye eşit olan user'ı getir data'ya ata
       res.status(200).send({
        error:false,
        data
       })
    },
    

    update: async(req,res)=>{
        /*
            #swagger.tags = ["Toppings"]
            #swagger.summary = "Update Topping"
        */
       const data = await Topping.updateOne({_id: req.params.id}, req.body)
       res.status(202).send({
        error:false,
        data,
        new: await Topping.findOne({_id : req.params.id})
       })
    },
   

    delete: async(req,res)=>{
          /*
            #swagger.tags = ["Toppings"]
            #swagger.summary = "Delete Topping"
        */
       const data= await Topping.deleteOne({_id: req.params.id})
       res.status(data.deletedCount ? 204 : 404).send({
        error: !data.deletedCount,     //->hata durumu True false geleceği için erorr karşılığı tam tersi olmalı
        data
       })
    },
   
}