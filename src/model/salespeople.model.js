const pool = require("../db/mysql");

const getsalsepersons = async () => {
  try {
    const [result, felids] = await pool.execute("SELECT * FROM salespeople");
    return result;
  } catch (error) {
    console.log(error);
    throw error
  }
};

const addsalsepersons = async (SNAME,CITY,COMM) => {
  try {

    console.log("rgsre");
    
    const [result] = await pool.query('INSERT INTO salespeople (SNAME, CITY, COMM) VALUES (?, ?, ?)', [SNAME, CITY, COMM]);

    console.log(result);

    return { SNUM: result.insertId, SNAME, CITY, COMM };
  } catch (error) {
    console.log(error);
    throw error;
  }
}


const updatesalsepersons = async (SNUM,SNAME,CITY,COMM) => {
  await pool.query('UPDATE salespeople SET SNAME=?,CITY=?,COMM=? WHERE SNUM=?', [SNAME,CITY,COMM,SNUM])
  
return {SNUM,SNAME,CITY,COMM}
}

const deletesalseperson = async (SNUM) => {
  await pool.query('DELETE FROM `salespeople` WHERE SNUM = ?', [SNUM]);

  
  return { message: 'Salesperson deleted successfully'};
}

module.exports = {
    getsalsepersons,
    addsalsepersons,
    updatesalsepersons,
    deletesalseperson
};
