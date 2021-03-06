const axios = require("axios");
const converter = require('json-2-csv');
const fs = require('fs');
const environment = require('./config/' + process.env.NODE_ENV + '.env.js');

const json2csvCallback = (err, csv) => {
    if (err) throw err;
    fs.writeFile('teste.csv', csv, 'utf8', function(err) {
      if (err) {
        console.log('Some error occured - file either not saved or corrupted file saved.');
      } else {
        console.log('It\'s saved!');
      }
    });
};

module.exports = {
    async getChampionship (request, response) {
        try {
            const config = {
                headers:{Authorization: environment.api_futebol.token}
            }
    
            const res = await axios.get('https://api.api-futebol.com.br/v1/campeonatos', config);
            
            converter.json2csv(res.data, json2csvCallback, {
                prependHeader: true      // removes the generated header of "value1,value2,value3,value4" (in case you don't want it)
            })
    
            response.json(res.data);
        } catch (err) {
            console.log(err);
        }
  }
  
  async get
}