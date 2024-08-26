var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { error } = require('console');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


login_infos = [
    {
        "id": "0826A24",
        "first_name":"Mark",
        "last_name":"Olive",
        "username":"ncmoliver",
        "password":"NotToday!",
        "email":"Maolive@gmail.com"
    },
    {
        "id": "0826B24",
        "first_name":"Sharo",
        "last_name":"Olive",
        "username":"ncsoliver",
        "password":"NotToday!",
        "email":"Sholive@gmail.com"
    },
    {
        "id": "0826C24",
        "first_name":"Bowuuu",
        "last_name":"Olive",
        "username":"ncboliver",
        "password":"NotToday!",
        "email":"Boolive@gmail.com"
    },
    {
        "id": "0826D24",
        "first_name":"Bran",
        "last_name":"Olive",
        "username":"ncbroliver",
        "password":"NotToday!",
        "email":"Brolive@gmail.com"
    }
];


app.get('/login', function(request, response) {
    response.send(login_infos);
});

app.post('/login', function(request, response) {
    var login_info = request.body;
    if(!login_info || login_info.text === "") {
        response.status(500).send({error: "Your login info must have text"});
    } else {
        login_infos.push(login_info);
        response.status(200).send(login_infos);
    }
});

app.put('/login/:id', function(request, response) {
    
    var loginId = request.params.id;
    var new_username = request.body.username;

    if (!new_username || new_username    === "") {
        response.status(500).send({error:"You must provide all login info."})
    } else {
        let found = false;
        for (var x = 0; x < login_infos.length; x++) {
            var user = login_infos[x];

            if (user.id === loginId) {
                login_infos[x].username = new_username;
                found = true;
                break;
            }
        }
        if (found) {
            response.send(login_infos);
        } else {
            response.status(400).send({error:"User not found."});
        }
    }  
});

app.listen(3000, function() {
    console.log("First API running on port 3000!");
});