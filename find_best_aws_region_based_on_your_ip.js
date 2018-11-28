const hostToIp = require('host-to-ip');
const sortByDistance = require('sort-by-distance');
var geoip = require('geoip-lite');
var geoPoints =[
    {
        "url": "rds.us-east-2.amazonaws.com",
        "country": "US",
        "timezone": "America-New_York",
        "city": "Columbus",
        "lat": 39.9653,
        "long": -83.0235,
        "regiontag": "us-east-2"
    },
    {
        "url": "rds.us-east-1.amazonaws.com",
        "country": "US",
        "timezone": "America-New_York",
        "city": "Ashburn",
        "lat": 39.0481,
        "long": -77.4728,
        "regiontag": "us-east-1"
    },
    {
        "url": "rds.us-west-1.amazonaws.com",
        "country": "US",
        "timezone": "America-Los_Angeles",
        "city": "San Jose",
        "lat": 37.3388,
        "long": -121.8914,
        "regiontag": "us-west-1"
    },
    {
        "url": "rds.us-west-2.amazonaws.com",
        "country": "US",
        "timezone": "America-Los_Angeles",
        "city": "Boardman",
        "lat": 45.8491,
        "long": -119.7143,
        "regiontag": "us-west-2"
    },
    {
        "url": "rds.ap-south-1.amazonaws.com",
        "country": "IN",
        "timezone": "Asia-Kolkata",
        "city": "Mumbai",
        "lat": 18.975,
        "long": 72.8258,
        "regiontag": "ap-south-1"
    },
    {
        "url": "rds.ap-northeast-3.amazonaws.com",
        "country": "JP",
        "timezone": "Asia-Tokyo",
        "city": "Osaka",
        "lat": 34.6864,
        "long": 135.52,
        "regiontag": "ap-northeast-3"
    },
    {
        "url": "rds.ap-northeast-2.amazonaws.com",
        "country": "KR",
        "timezone": "Asia-Seoul",
        "city": "Incheon",
        "lat": 37.4536,
        "long": 126.7317,
        "regiontag": "ap-northeast-2"
    },
    {
        "url": "rds.ap-southeast-1.amazonaws.com",
        "country": "SG",
        "timezone": "Asia-Singapore",
        "city": "Singapore",
        "lat": 1.2931,
        "long": 103.8558,
        "regiontag": "ap-southeast-1"
    },
    {
        "url": "rds.ap-southeast-2.amazonaws.com",
        "country": "AU",
        "timezone": "Australia-Sydney",
        "city": "Sydney",
        "lat": -33.8612,
        "long": 151.1982,
        "regiontag": "ap-southeast-2"
    },
    {
        "url": "rds.ap-northeast-1.amazonaws.com",
        "country": "JP",
        "timezone": "Asia-Tokyo",
        "city": "Tokyo",
        "lat": 35.685,
        "long": 139.7514,
        "regiontag": "ap-northeast-1"
    },
    {
        "url": "rds.ca-central-1.amazonaws.com",
        "country": "CA",
        "timezone": "America-Toronto",
        "city": "Montreal",
        "lat": 45.5,
        "long": -73.5833,
        "regiontag": "ca-central-1"
    },
    {
        "url": "rds.cn-north-1.amazonaws.com.cn",
        "country": "CN",
        "timezone": "Asia-Shanghai",
        "city": "Beijing",
        "lat": 39.9288,
        "long": 116.3889,
        "regiontag": "cn-north-1"
    },
    {
        "url": "rds.cn-northwest-1.amazonaws.com.cn",
        "country": "CN",
        "timezone": "Asia-Shanghai",
        "city": "",
        "lat": 38.4681,
        "long": 106.2731,
        "regiontag": "cn-northwest-1"
    },
    {
        "url": "rds.eu-central-1.amazonaws.com",
        "country": "DE",
        "timezone": "Europe-Berlin",
        "city": "Frankfurt am Main",
        "lat": 50.1153,
        "long": 8.6823,
        "regiontag": "eu-central-1"
    },
    {
        "url": "rds.eu-west-1.amazonaws.com",
        "country": "IE",
        "timezone": "Europe-Dublin",
        "city": "Dublin",
        "lat": 53.3331,
        "long": -6.2489,
        "regiontag": "eu-west-1"
    },
    {
        "url": "rds.eu-west-2.amazonaws.com",
        "country": "GB",
        "timezone": "Europe-London",
        "city": "London",
        "lat": 51.5161,
        "long": -0.0949,
        "regiontag": "eu-west-2"
    },
    {
        "url": "rds.eu-west-3.amazonaws.com",
        "country": "FR",
        "timezone": "Europe-Paris",
        "city": "Paris",
        "lat": 48.8628,
        "long": 2.3292,
        "regiontag": "eu-west-3"
    },
    {
        "url": "rds.sa-east-1.amazonaws.com",
        "country": "BR",
        "timezone": "America-Sao_Paulo",
        "city": "São Paulo",
        "lat": -23.5733,
        "long": -46.6417,
        "regiontag": "sa-east-1"
    },
    {
        "url": "rds.us-gov-east-1.amazonaws.com",
        "country": "US",
        "timezone": "America-New_York",
        "city": "Columbus",
        "lat": 39.9653,
        "long": -83.0235,
        "regiontag": "us-gov-east-1"
    },
    {
        "url": "rds.us-gov-west-1.amazonaws.com",
        "country": "US",
        "timezone": "America-Los_Angeles",
        "city": "Boardman",
        "lat": 45.8491,
        "long": -119.7143,
        "regiontag": "us-gov-west-1"
    }
];

function getRegionRecommendation(rdsEndpoint){
    return new Promise(function(resolve,reject){
        hostToIp(rdsEndpoint).then(function(ip){
            var geo = geoip.lookup(ip);
            const opts = {
                yName: 'lat',
                xName: 'long'
            };
            const origin = { lat: geo.ll[0], long: geo.ll[1]};
            resolve(sortByDistance(origin, geoPoints, opts)[0].regiontag);
        }).catch(function(err){
           reject(err);
        });
    });
}
getRegionRecommendation("bankofindia.co.in").then(function(regionTag){
   console.log(regionTag);
}).catch(function(err){
   console.log(err);
});