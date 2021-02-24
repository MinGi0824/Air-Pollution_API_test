const request = require('request')
const serviceKey=require('../keys/key')

const stationdata = (callback)=>{
    const url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getUnityAirEnvrnIdexSnstiveAboveMsrstnList?'
    var ServiceKey=serviceKey.publicPortalKey

    var Params = encodeURIComponent('ServiceKey') + '=' + ServiceKey
    Params += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
    Params += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    Params += '&' + encodeURIComponent('_returnType') + '=' + encodeURIComponent('json')

    const fullurl = url+Params;

    request(fullurl,(error,{body})=>{

        const station=JSON.parse(body)

        //console.log(station)받아온 json 데이터 확인용

        callback(undefined,{
            station
        })
    })
}

module.exports=stationdata