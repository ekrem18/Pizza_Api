"use strict";
//Order controller
const Order = require("../models/order");
const Pizza = require("../models/pizza")

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "List Orders"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    const data = await res.getModelList(Order);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Order),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Create Order"
        */
    //Calculations
    req.body.quantity = req.body?.quantity || 1                       //-->default quantity 1 oldu

    if(!req.body?.price){                                             //--> req.body ile gelen herahngi bir fiyat bilgisi yoksa;
        const dataPizza= await Pizza.findOne({_id: req.body.pizzaId}) //--> body'den pizzaId'ye ulaşarak bilgileri dataPizzaya ata
        req.body.price= dataPizza.price                               //--> bu datayı da body'e price olarak gönder
    }

    req.body.totalPrice = req.body.quantity * req.body.price;

    const data = await Order.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Get Single Order"
        */
    const data = await Order.findOne({ _id: req.params.id }); //-->userId si URL'den gelen id'ye eşit olan user'ı getir data'ya ata
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
        #swagger.tags = ["Orders"]
        #swagger.summary = "Update Order"
    */

    // Calculatings:
    req.body.quantity = req.body?.quantity || 1 // default: 1
    if (!req.body?.price) {
        const dataOrder = await Order.findOne({ _id: req.params.id }, { _id: 0, price: 1 })
        req.body.price = dataOrder.price
    }
    req.body.totalPrice = req.body.price * req.body.quantity

    const data = await Order.updateOne({ _id: req.params.id }, req.body)

    res.status(202).send({
        error: false,
        data,
        new: await Order.findOne({ _id: req.params.id })
    })

},

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Delete Order"
        */
    const data = await Order.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount, //->hata durumu True false geleceği için erorr karşılığı tam tersi olmalı
      data,
    });
  },
};
