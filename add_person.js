const settings = require("./settings"); // settings.json
var knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'development',
        password: 'development'

    }
});


//creates new table with parameters, error if parameters null
function create_table() {
    if (!process.argv[2] || !process.argv[3] || !process.argv[4]) {
        console.log("Please input values to insert in the form of: first_name, last_name, birthdate (YYYY-MM-DD).");
        knex.destroy();
    } else {
        let insert1 = {
            first_name: process.argv[2],
            last_name: process.argv[3],
            birthdate: process.argv[4]
        }

        knex.insert(insert1).into('famous_people').then(function(id) {
            get_table();
            knex.destroy();

        });
    }
}
create_table();

//Selects the created table, and returns contents
function get_table() {
    knex.select('*').from('famous_people')
        .asCallback(function(err, rows) {
            if (err) return console.error(err);
            console.log(rows);
        });
}