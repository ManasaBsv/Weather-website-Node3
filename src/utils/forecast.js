const request=require('request')

const forecast=(latitude,longitude,callback)=>
{
    const url='https://api.darksky.net/forecast/45c2a9d9a0821959dae364d1bf974a3e/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)

    request({url, json:true},(error,{body})=>
    { if(error)
        {
            callback('Unable to connect',undefined)
        }
        else if(body.error)
        {
            callback('Unable to fecth data',undefined)
        }
        else
        {   const dat=body
            const s='It is currently '+dat.currently.temperature+' degrees out. There is '+dat.currently.precipProbability+'% chance of rain'
            callback(undefined,s)
        }

    })
}

module.exports=forecast