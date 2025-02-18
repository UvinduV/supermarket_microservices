const express = require('express')
const {eureka, Eureka} = require("eureka-js-client")

//next js -- graph ql
const app =express();
const port =3000;

const router =express.Router()

router.get('/inventory',(req,res,next)=>{
    res.json({
        items: ['Milk','Eggs','Bread'],
        message:'welcome to the inventory service'
    })
})

const eurekaClient =new Eureka({
    instance:{
        instanceId: "Inventory-service",
        app: "INVENTORY-SERVICE",
        hostName: "location",
        ipAddr: "127.0.0.1",
        port:{
            $: port,
            "@enabled":true
        },
        dataCenterInfo
    }

})

app.use('/Inventory-service',router)

app.listen(port,()=>{
    console.log('Inventory service running at port : ${port}')
})