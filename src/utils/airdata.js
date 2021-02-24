const request = require('request')
const serviceKey=require('../keys/key')

const airdata = (locationName,callback)=>{
    const url ='http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?'
    var ServiceKey=serviceKey.publicPortalKey

    var Params = encodeURIComponent('ServiceKey') + '=' + ServiceKey
    Params += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1');
    Params += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    Params += '&' + encodeURIComponent('dataTerm') + '=' + encodeURIComponent('DAILY');
    Params += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.3');
    Params += '&' + encodeURIComponent('stationName') + '=' + encodeURIComponent(locationName);
    Params += '&' + encodeURIComponent('_returnType') + '=' + encodeURIComponent('json')

    const fullurl = url+Params;
    
    request(fullurl,(error,{body})=>{

        const air = JSON.parse(body)
        //console.log('air',air)  //받아온 json 데이터 확인용

        callback(undefined,{
            air
        })
    })
}

module.exports=airdata;