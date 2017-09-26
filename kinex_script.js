const settings = require("./settings"); // settings.json
var knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'development',
        password: 'development'

    }
});
//Creates a table with given parameters from command line. Returns error if input is empty
function create_table() {
    if (!process.argv[2] || !process.argv[2] || !process.argv[2]) {
        console.log("Please input values to insert in the form of: name, last name, birthdate.");
        knex.destroy();
    } else {
        var insert1 = {
            first_name: process.argv[2],
            last_name: process.argv[3],
            birthdate: process.argv[4]
        }

        knex.insert(insert1).into('famous_people').then(function(id) {
            getTable();
            knex.destroy();

        });
    }
}
create_table();

//Selects the created table, in this case 'famous_people' and returns its contents
function getTable() {
    knex.select('*').from('famous_people')
        .asCallback(function(err, rows) {
            if (err) return console.error(err);
            console.log(rows);
        });
}