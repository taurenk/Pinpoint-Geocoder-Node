
const knex = require('knex');
class Database {

  constructor() {
    this.db = null;
  }

  getDb() {
    return this.db;
  }
  
  connect(config) {
    console.log(`Establishing DB connection to ${config.host}`);
    this.db = require('knex')({
      client: 'pg',
      connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
      }
    });
  }

  async findFeatureStrict(streetName, zipcode) {
    let whereParams = [streetName, zipcode, zipcode];
    let whereClause = 'fullname = ? AND ( zipl = ? OR  zipr = ?)';
    /*
    if (targetHouseNumber) {
      whereClause += ' AND ( (lfromhn >= ? AND ltohn <= ?) OR (rfromhn >= ? AND rtohn <= ?) )';
      whereParams.push(targetHouseNumber);
      whereParams.push(targetHouseNumber);
      whereParams.push(targetHouseNumber);
      whereParams.push(targetHouseNumber);
    }
    */
    return await this.db.select('tlid', 'fullname', 
        'lfromhn', 'ltohn', 'rfromhn', 
        'rtohn', 'zipl', 'zipr', knex.raw('ST_asText(geom)'))
      .from('addrfeat')
      .whereRaw(whereClause, whereParams);
  }

  async retrieveAddrFeat(tlid) {}

}
  
module.exports = new Database();