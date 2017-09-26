const name = process.argv[2];

const settings = require("./settings"); // settings.json
var knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'development',
        password: 'development'

    }
});

//findPerson function
findPerson(name);

function findPerson(lastname) {
    console.log('Searching......');
    knex.select('*').from('famous_people').where('last_name', lastname).asCallback(function(err, result) {
        returnPerson(result);

    });

}

// print search result to console
function returnPerson(result) {
    result.forEach(function(element) {
        console.log('Found ' + result.length + " person(s)" + ': ' + element.first_name + ' ' +
            element.last_name + ', ' + 'born' + " '" + element.birthdate.toISOString().substr(0, 10) + "'");

    });
}