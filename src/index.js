const express=require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('/',(req,res)=>{
    res.render('index',{
        제목:'대기오염 정보',
        이름:'KimMinGi',
        이메일:'ersd145@naver.com'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        제목:'대기오염 정보',
        이름:'KimMinGi',
        이메일:'ersd145@naver.com',
        메시지:'대기오염 정보를 알고 싶은 지역을 입력하세요'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        제목:'대기오염 정보',
        이름:'KimMinGi',
        이메일:'ersd145@naver.com',
        메시지:'Nodejs express와 특정 API 연동 연습 사이트입니다.'
    })
})

app.post('/air',(req,res)=>{
    res.render('air',{
        제목:'대기오염 정보',
        이름:'KimMinGi',
        이메일:'ersd145@naver.com',
        메시지:'대기오염 정보를 알고 싶은 지역을 입력하세요'
    })
})

app.listen(3000,()=>{
    console.log('Server is running at port 3000')
})