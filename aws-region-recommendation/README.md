## Usage

var awsRegionRecommendation = require("aws-region-recommendation")
awsRegionRecommendation("bankofindia.co.in").then(function(res){
    console.log(res);
}).catch(function(err){
    console.log(err);
});