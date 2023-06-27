
exports.isEmpty=(value)=>{
    if(value===undefined || value===null||value?.length===0){
        return true
    }
    else{
        return false
    }
    }


exports.generateRandom=(len)=>{

    var text = "";
    
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    
    return text;
  }


  exports.getrating=(feedinfo)=>{
    var stars = [...feedinfo],
    count = 0,
    sum = 0;

stars.forEach(function(value, index){
    console.log(value?.rating)
    let tempvalue= value?.rating===undefined||value?.rating===NaN ||value?.rating===null?0:value?.rating
  count += tempvalue;
  sum += tempvalue * (index + 1);
});
return parseFloat(sum / count).toFixed(2)

  }