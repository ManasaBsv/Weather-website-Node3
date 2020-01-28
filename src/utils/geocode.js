const request=require('request')

const geocode=(address,callback)=>
{
    const url1='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFuYXNhLWJzdiIsImEiOiJjazVldTljNnoyMmU5M2tyZjk1MjRrcTFhIn0.cl8FQD-XoEWPZtOrPD0k_Q&limit=1'
    request({url:url1, json:true},(error,response)=>
    {
        if(error)
        {
            callback('Unable to connect',undefined)
        }
        else if(response.body.features.length==0)
        {
            callback('Unable to find location',undefined)
        }
        else{ const {body}=response
            callback(undefined,{ latitude:body.features[0].center[1],
                                  longitude:body.features[0].center[0],
                                  location: body.features[0].place_name 
                                })
        }
    })
}
module.exports=geocode