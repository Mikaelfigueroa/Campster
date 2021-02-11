let functions = {}

functions.mongooseFormat = function(v){
  if(typeof v ==="object"){
    if(v.name == "UserExistsError"){
      return v.message
    }
    if(v.code==11000){
      return "Email is already associated with a account"
    }
    var a = Object.keys(v.errors)[0]
    return v.errors[a].message
  }
  else{
      return v
  }
}

functions.calculateAverage = function(reviews) {
    if (reviews.length === 0) {
        return 0;
    }
    var sum = 0;
    reviews.forEach(function (element) {
        sum += element.rating;
    });
    return Math.round(sum / reviews.length);
}

functions.capitalize = function(v){
    return v.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}

functions.errCheck = function(v){
    if(typeof v ==="object"){
      if(v.name == "UserExistsError"){
        return v.message
      }
      if(v.code==11000){
        return "Email is already associated with a account"
      }
      var a = Object.keys(v.errors)[0]
      return v.errors[a].message
    }
    else{        
        return v
    }
}
functions.colorer = function(n){
  var starcolor = ""
  switch (n){
    case 1:
      starcolor = "star1"
      break;
    case 2:
      starcolor = "star2"
      break;
    case 3:
      starcolor = "star3"
      break;
    case 4:
      starcolor = "star4"
      break;
    case 5:
      starcolor = "star5"
      break;
    }
    return starcolor
}

module.exports = functions;
