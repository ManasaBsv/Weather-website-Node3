const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()

const pd=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
console.log(__dirname)
console.log(__filename)



app.use(express.static(pd))
app.set('view engine','hbs')
app.set('views',viewPath)

hbs.registerPartials(partialsPath)

app.get('',(req,res)=>
{
    res.render('index',{
        title:'Weather',
        name:'Manasa',
        age:19
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',{
        title:'Help',
        name: 'manasa',
        age:10,
        helptext:'Here you get the help'
    })
}) 

app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'About me',
        name: 'manasa',
        age:10
    })
}) 

app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        res.send({
            error: 'You must mention the address'
        })
        return
    }
     
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            res.send({
                error:error
            })
        }
       
        else
        {
          forecast(latitude,longitude,(error,response)=>
          {
              if(error)
              {
                  res.send({
                      error:error
                  })
              }
              else
              {
                   res.send({
                       forecast:response,
                       location,
                       address:req.query.address
                   }) 
              }
          })   
        }


    })
})
app.get('/products',(req,res)=>
{   if(!req.query.search)
    {
        res.send({
            error:'you have to mention the search term'
        })
        return
    }

    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>
{   res.render('error',{
        errormsg:'Help page not found',
        title:'Error 404'
    })

})


app.get('*',(req,res)=>
{
    res.render('error',{
        errormsg:'Page Not Found',
        title:'Error 404'
    })
})

app.listen(3000,()=>
{
    console.log('Server running on port 3000')
})