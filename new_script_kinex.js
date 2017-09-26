const settings = require("./settings"); // settings.json
const name = process.argv[2];

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});

// //connect to database
// client.connect((err) => {
//     console.log('node lookup_people.js Lincoln');
//     if (err) {
//         return console.error("Connection Error", err);
//     }
//     find_person();
// });

// // find person
// function find_person(person) {

//     console.log('Searching...');
//     client.query('SELECT * FROM famous_people WHERE last_name = $1::text', name, (err, result) => {
//         if (err) {
//             return console.error("error running query", err);
//         }
//         print_result(result);
//         client.end();
//     });
// }

// //print output

// function print_result(result) {

//     result.rows.forEach(function(element) {
//         console.log('Found ' + result.rows.length + " person(s)" + ': ' + element.first_name + ' ' +
//             element.last_name + ', ' + 'born' + " '" + element.birthdate.toISOString().substr(0, 10) + "'");

//     });
// }

//call find_person function
find_person(name);

//findPerson function
findPerson(name);

function findPerson(lastname) {
    console.log('Searching......');
    knex.select('*').from('famous_people').where('last_name', lastname).asCallback(function(err, result) {
        returnPerson(result);

    });

}

function returnPerson(result) {
    result.forEach(function(element) {
        console.log('Found ' + result.length + " person(s)" + ': ' + element.first_name + ' ' +
            element.last_name + ', ' + 'born' + " '" + element.birthdate.toISOString().substr(0, 10) + "'");

    });