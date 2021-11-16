const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/movie-lab');

const celebrities = [
    {
        name: "Gal Gadot",
        ocupation: "Actress",
        catchPhrase: "Diana"
    },
    {
        name: "James Bond",
        ocupation: "Field agent MI6",
        catchPhrase: "Mathilde"
    },
    {
        name: "Dr. Medaleine Swan",
        ocupation: "Psychiatrist",
        catchPhrase: "Spectre"
    }
];

Celebrity.insertMany(celebrities)
        .then(celebrities => {
            console.log(`Celebrities added successfully. ${celebrities.length} were added!`);
            mongoose.connection.close;
        })
        .catch(err => console.log(err))