const axios = require("axios");
const converter = require('json-2-csv');
const fs = require('fs');
const environment = require('../config/' + process.env.NODE_ENV + '.env.js');

const json2csvCallback = (err, csv) => {
  if (err) {
    throw err
  };
  fs.writeFile('teste.csv', csv, 'utf8', function (err) {
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else {
      console.log('It\'s saved!');
    }
  });
};

module.exports = {
  async getChampionship(req, res) {
    try {
      const config = {
        headers: { Authorization: environment.api_futebol.token }
      }

      const result = await axios.get('https://api.api-futebol.com.br/v1/campeonatos', config);

      converter.json2csv(result.data, json2csvCallback, {
        prependHeader: true      // removes the generated header of "value1,value2,value3,value4" (in case you don't want it)
      })

      res.json(result.data);
    } catch (err) {
      console.log(err);

      res.send({ status: 500, message: err });
    }
  },

  async getTeams(req, res) {
    try {
      const config = {
        headers: { Authorization: environment.api_futebol.token }
      }

      const result = await axios.get(`https://api.api-futebol.com.br/v1/times/${req.params.id}`, config);

      converter.json2csv(result.data, json2csvCallback, {
        prependHeader: true      // removes the generated header of "value1,value2,value3,value4" (in case you don't want it)
      })

      res.json(result.data);

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: err });
    }
  },

  async getOnePlayer (req, res) {
    try {
      const config = {
        headers: { Authorization: environment.api_futebol.token }
      }

      const result = await axios.get(`https://api.api-futebol.com.br/v1/atletas/${req.params.id}`, config);

      converter.json2csv(result.data, json2csvCallback, {
        prependHeader: true      // removes the generated header of "value1,value2,value3,value4" (in case you don't want it)
      })

      res.status(201).json(result.data);

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: err });
    }

  },

  async getPhase(req, res) { },

  async getMatchs(req, res) {
    try {
      const config = {
        headers: { Authorization: environment.api_futebol.token }
      }

      console.log(req.params.id);

      const result = await axios.get(`https://api.api-futebol.com.br/v1/campeonatos/${req.params.id}/partidas`, config);

      /*   converter.json2csv(result.data, json2csvCallback, {
             prependHeader: true      // removes the generated header of "value1,value2,value3,value4" (in case you don't want it)
         })*/

      res.json(result.data);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getOneMatch(req, res) {
    try {
      const config = {
        headers: { Authorization: environment.api_futebol.token }
      }

      console.log(req.params.id);

      const result = await axios.get(`https://api.api-futebol.com.br/v1/partidas/${req.params.id}`, config);

      /*   converter.json2csv(result.data, json2csvCallback, {
              prependHeader: true      // removes the generated header of "value1,value2,value3,value4" (in case you don't want it)
          })*/

      res.json(result.data);
    } catch (err) {
      res.status(500).json(err);
    }

  }
}