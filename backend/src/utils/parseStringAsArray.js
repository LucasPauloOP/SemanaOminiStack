module.exports = function parseStringAsString(arrayAsString){
    return arrayAsString.split(",").map(tech => tech.trim());
}