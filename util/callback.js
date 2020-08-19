const validator = require("runtheons-validate");

module.exports = (req, res, api) => {
  data = [];

  //metto in data i dati ricevuti nella query string
  Object.keys(req.params).forEach(function(key){
	let value = req.params[key];	
	if(""+parseInt(value) == value){
		data[key] = parseInt(value);
	}else{
		data[key] = parseInt(value);
	}
  });
  
  //metto in data i dati ricevuti nel request body
  Object.keys(req.body).forEach(function(key){
    data[key] = req.body[key];
  });
  
  //metto in data i dati ricevuti come files
  if(req.files){
    Object.keys(req.files).forEach(function(key){
      data[key] = req.files[key];
    });
  }
  
  try{
	var valid = validator.validate(api.schema, data);
    if(valid.result)
      api.api(data, res);
    else
      res.status(500).jsonp(valid.errors);
  }catch(e){
	  console.log(e);
    res.status(500).jsonp(e.path + ': ' + e.message);
  }
};