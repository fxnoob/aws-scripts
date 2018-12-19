const lib = require("../");

lib('rds.us-east-2.amazonaws.com')
.then((res) =>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});
