let csv = require('csv-parser')
let fs = require('fs')
module.exports = {
    readcsv(csvRes,postcodeReq,res){
        fs.createReadStream('./data/postalCodes.csv').pipe(csv()).on('data',data=>csvRes.push(data)).on('end',()=>{this.sendcsv(csvRes,postcodeReq,res)})
    },
    sendcsv(csvRes,postcodeReq,res){
        var found = false
        for(let pc in csvRes){
            if(csvRes[pc].POST_CODE == postcodeReq){
                found = true;
                var sunday = csvRes[pc].SUNDAY;
                var monday = csvRes[pc].MONDAY;
                var tuesday = csvRes[pc].TUESDAY;
                var wednesday = csvRes[pc].WEDNESDAY;
                var thursday = csvRes[pc].THURSDAY;
                var friday = csvRes[pc].FRIDAY;
                var saturday = csvRes[pc].SATURDAY;
            }
        }
        if(found)return res.status(200).json({found,sunday,monday,tuesday,wednesday,thursday,friday,saturday});
        else return res.status(200).json({found:false});
    }
}