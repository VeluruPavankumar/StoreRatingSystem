const db = require("./db");

const createTables = async () => {
    const sqlQueries = [
        `CREATE TABLE users (
    id VARCHAR(10) PRIMARY KEY,  -- Custom ID like 'nu12', 'sto12'
    name VARCHAR(60) NOT NULL CHECK (CHAR_LENGTH(name) >= 20), 
    email VARCHAR(100) NOT NULL UNIQUE, 
    address VARCHAR(400) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    role ENUM('admin', 'normal', 'store_owner') NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`,
        `CREATE TABLE stores (
    id VARCHAR(20) PRIMARY KEY,  -- Custom ID like 'stid123'
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(100) NOT NULL UNIQUE, 
    address VARCHAR(400) NOT NULL, 
    owner_id VARCHAR(10) NOT NULL,  -- Reference to store owner in users table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);`,
        `CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id VARCHAR(20) NOT NULL,
    ratings JSON NOT NULL,  -- Array of rating objects [{userid, rating, created_at, updated_at}]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
)`
    ];

    try {
        for (const sql of sqlQueries) {
            db.query(sql, (err, result) => {
                if (err) {
                    console.error("❌ Error executing query:", err);
                }
            });
        }
        console.log("✅ Tables created successfully!");
    } catch (error) {
        console.error("❌ Error creating tables:", error);
    }
};

createTables();
