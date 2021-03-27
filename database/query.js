const connection = require('./connect');

/* SQL Query */
class query {

    async execute(sql) {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(result);
            });
        });
    }
}
module.exports = query;