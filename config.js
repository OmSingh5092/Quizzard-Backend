const config = {
    app:{
        local:{
            port: 4000,
        }
    },
    session:{
        // It holds the secret key for session 
        secret: 'Your_Secret_Key',
        // Forces the session to be saved 
        // back to the session store 
        resave: true, 
        // Forces a session that is "uninitialized" 
        // to be saved to the store 
        saveUninitialized: true
    },
    jwt:{
        TOKEN_SECRET:"Quizzard"
    },
    database:{
        local:{
            uri:"mongodb://localhost:27017/Quizzard"
        },
        prod:{
            uri:"mongodb+srv://omsingh:omsingh@cluster0.67wvl.mongodb.net/Quizaard?retryWrites=true&w=majority"
        }
    },
    gcp:{
        clientId: "509388667130-kfpb8fkjpqovht81b7s56mmgl8gk24ci.apps.googleusercontent.com",
    },
}

module.exports = config;