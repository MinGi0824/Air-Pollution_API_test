const express=require('express')
const path = require('path')
const hbs = require('hbs')

const bodyParser = require('body-parser')
const airdata = require('./utils/airdata')
const stationdata = require('./utils/stationdata')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))

const publicDir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('/station',(req,res)=>{
    res.render('index',{
        제목:'대기오염 정보',
        이름:'Kim Min Gi',
        이메일:'ersd145@naver.com',
        결과:""
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        제목:'대기오염 정보',
        이름:'Kim Min Gi',
        이메일:'ersd145@naver.com',
        메시지1:{pm10 : '미세먼지', pm25 : '초미세먼지'},
        메시지2:{1:'좋음(0~50)', 2:'보통(51~100)', 3:'나쁨(101~250)', 4:'매우나쁨(251~)'}
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        제목:'대기오염 정보',
        이름:'Kim Min Gi',
        이메일:'ersd145@naver.com',
        메시지:'Nodejs - express와 특정 API 연동 연습 사이트입니다.',
        API:"( 사용 API : 공공데이터포털 - 한국환경공단_대기오염정보 )"
    })
})

app.post('/air',(req,res)=>{
    airdata(req.body.location,(error,{air}={})=>{
        if(error)   return res.send({error})
        if(air['list'][0]==null){
           return res.render('index',{
                제목:'대기오염 정보',
                이름:'KimMinGi',
                이메일:'ersd145@naver.com',
                결과:"측정장소를 다시 입력해주세요"
            })
        }
        return res.render('air',{
            제목:'대기오염 정보',
            이름:'KimMinGi',
            이메일:'ersd145@naver.com',
            location:air['parm']['stationName'],
            측정망정보:air['list'][0]['mangName'],
            time:air['list'][0]['dataTime'],
            pm10:air['list'][0]['pm10Value'],
            pm25:air['list'][0]['pm25Value'],
            통합대기환경수치:air['list'][0]['khaiValue'],
            통합대기환경지수:air['list'][0]['khaiGrade']
        })
    })
})

app.get('/notice',(req,res)=>{
    stationdata((error,{station}={})=>{
        if(error)   return res.send({error})

        return res.render('station',{
            제목:'대기오염 정보',
            이름:'KimMinGi',
            이메일:'ersd145@naver.com',
            메시지:'통합대기환경지수 나쁨(3) 이상 측정소',
            측정장소:station['list'],
            주소:station['list']
        })
    })
})

app.get('/',(req,res)=>{
    res.render('home',{
        제목:'대기오염 정보',
        이름:'Kim Min Gi',
        이메일:'ersd145@naver.com',
    })
})
app.listen(3000,()=>{
    console.log('Server is running at port 3000')
})