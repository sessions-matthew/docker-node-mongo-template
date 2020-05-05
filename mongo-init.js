db.createUser(
  {
    user: "user",
    pwd: "password",
    roles: [
      {
        role: "readWrite",
        db: "testingdb"
      }
    ]
  }
);
db.createCollection("basicCollection", 
  { 
    "capped": true, 
    "size": 100000, 
    "max": 5000
  }
);
