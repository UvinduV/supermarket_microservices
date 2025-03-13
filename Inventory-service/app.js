const express = require('express')
const {eureka, Eureka} = require("eureka-js-client")

//next js -- graph ql
const app =express();
const port =3002;

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
        vipAddress: "inventory-service",
        dataCenterInfo:{
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            name: "MyOwn"
        }

    },
    eureka: {
        host: "localhost",
        port: 8761,
        servicePath: "/eureka/apps",  // Corrected service path
    },

})

app.use('/Inventory-service',router)

app.listen(port,()=>{
    console.log(`Inventory service running at port : ${port}`)

    eurekaClient.start((error)=>{
        if(error){
            console.log("fail to register eureka")
        }else {
            console.log('registered successfully')
        }
    })

})