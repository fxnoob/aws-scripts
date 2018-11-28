const lib = require("../");


lib.getRegionRecommendation("bankofindia.co.in").then(function(res){
    console.log(res);
}).catch(function(err){
    console.log(err);
});
