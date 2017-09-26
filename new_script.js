const pg = require("pg");
const settings = require("./settings"); // settings.json
const name = process.argv.slice(2);

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});

//connect to database
client.connect((err) => {
    console.log('node lookup_people.js Lincoln');
    if (err) {
        return console.error("Connection Error", err);
    }
    find_person();
});

// find person
function find_person(person) {

    console.log('Searching...');
    client.query('SELECT * FROM famous_people WHERE last_name = $1::text', name, (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }
        print_result(result);
        client.end();
    });
}

//print output

function print_result(result) {

    result.rows.forEach(function(element) {
        console.log('Found ' + result.rows.length + " person(s)" + ': ' + element.first_name + ' ' +
            element.last_name + ', ' + 'born' + " '" + element.birthdate.toISOString().substr(0, 10) + "'");

    });
}