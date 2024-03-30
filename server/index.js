const snowflake = require('snowflake-sdk');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3002;

const connectionOptions = {
    account: 'XBA65735',
  username: 'Soniya_S',
  password: 'hasrjas@Gen3',
  role: 'GENAAI',
  warehouse: 'GENAI_POC',
  database: 'BET_POC',
  schema: 'WMG'
};

// Create the Snowflake connection
const connection = snowflake.createConnection(connectionOptions);

// Connect to Snowflake
connection.connect((err, conn) => {
    if (err) {
        console.error('Error connecting to Snowflake:', err.message);
        return;
    }
    console.log('Connected to Snowflake!');
});

// Validate Singer  API
app.get('/singer', (request, response) => {
    const sqlQuery = "select  album,singer,predicted_singer,singer_status from bet_poc.wmg.music_result where singer_Status = 'False'";
    connection.execute({
        sqlText: sqlQuery,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing SQL query:', err.message);
                response.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Query executed successfully');
            const rowsWithIds = rows.map((row, index) => ({ id: index + 1, ...row }));
            response.json(rowsWithIds);
        }
    });
});

// Validate Region API
app.get('/region', (request, response) => {
    const sqlQuery = "select album,singer,region, predicted_region,region_status from bet_poc.wmg.music_result where region_status = 'False'";
    connection.execute({
        sqlText: sqlQuery,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing SQL query:', err.message);
                response.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Query executed successfully');
            const rowsWithIds = rows.map((row, index) => ({ id: index + 1, ...row }));
            response.json(rowsWithIds);
        }
    });
});

// Validate Region API
app.get('/language', (request, response) => {
    
    const sqlQuery = "select album,singer,language, predicted_language,language_status from bet_poc.wmg.music_result where language_status = 'False'";
    
    connection.execute({
        sqlText: sqlQuery,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing SQL query:', err.message);
                response.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Query executed successfully');
            const rowsWithIds = rows.map((row, index) => ({ id: index + 1, ...row }));
            response.json(rowsWithIds);
        }
    });
});

//Base singer API
app.get('/singerBase', (request, response) => {
    const sqlQuery = "select album, singer from bet_poc.wmg.music";
    connection.execute({
        sqlText: sqlQuery,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing SQL query:', err.message);
                response.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Query executed successfully');
            const rowsWithIds = rows.map((row, index) => ({ id: index + 1, ...row }));
            response.json(rowsWithIds);
        }
    });
});

// Base Region API
app.get('/regionBase', (request, response) => {
    const sqlQuery = "select album, region from bet_poc.wmg.music";
    connection.execute({
        sqlText: sqlQuery,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing SQL query:', err.message);
                response.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Query executed successfully');
            const rowsWithIds = rows.map((row, index) => ({ id: index + 1, ...row }));
            response.json(rowsWithIds);
        }
    });
});

//Base Language API
app.get('/languageBase', (request, response) => {
    
    const sqlQuery = "select album, language from bet_poc.wmg.music";
    
    connection.execute({
        sqlText: sqlQuery,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing SQL query:', err.message);
                response.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Query executed successfully');
            const rowsWithIds = rows.map((row, index) => ({ id: index + 1, ...row }));
            response.json(rowsWithIds);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});


app.put('/singer/update', (request, response) => {

    const {selectedAlbums} = request.body
    // Check if albumsToUpdate is provided and is an array
    if (!Array.isArray(selectedAlbums)) {
        response.status(400).json({ error: 'Invalid request body format' });
        return;
    }

    // Construct the SQL query dynamically
    const sqlQuery = `
        UPDATE bet_poc.wmg.music_predicted a
        SET singer = b.Predicted_singer
        FROM bet_poc.wmg.music_result b
        WHERE b.singer_status ='False' AND a.album = b.album AND
        a.album IN (${selectedAlbums.map(album => `'${album}'`).join(',')});
    `;
    
    // Execute the SQL query
    connection.execute({
        sqlText: sqlQuery,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing SQL query:', err.message);
                response.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Update query executed successfully');
            response.json({ message: 'Albums updated successfully' });
        }
    });
});


app.put('/region/update', (request, response) => {

    const {selectedAlbums} = request.body
    // Check if albumsToUpdate is provided and is an array
    if (!Array.isArray(selectedAlbums)) {
        response.status(400).json({ error: 'Invalid request body format' });
        return;
    }

    // Construct the SQL query dynamically
    const sqlQuery = `
    UPDATE bet_poc.wmg.music_predicted a
            SET singer = b.Predicted_singer
            FROM bet_poc.wmg.music_result b
            WHERE b.region_status ='False' AND a.album = b.album AND
            a.album IN (${selectedAlbums.map(album => `'${album}'`).join(',')});
    `;
    
    // Execute the SQL query
    connection.execute({
        sqlText: sqlQuery,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing SQL query:', err.message);
                response.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Update query executed successfully');
            response.json({ message: 'Albums updated successfully' });
        }
    });
});


app.put('/language/update', (request, response) => {

    const {selectedAlbums} = request.body
    // Check if albumsToUpdate is provided and is an array
    if (!Array.isArray(selectedAlbums)) {
        response.status(400).json({ error: 'Invalid request body format' });
        return;
    }

    // Construct the SQL query dynamically
    const sqlQuery = `
    UPDATE bet_poc.wmg.music_predicted a
    SET singer = b.Predicted_singer
    FROM bet_poc.wmg.music_result b
    WHERE b.language_status ='False' AND a.album = b.album AND
    a.album IN (${selectedAlbums.map(album => `'${album}'`).join(',')});
    `;
    
    // Execute the SQL query
    connection.execute({
        sqlText: sqlQuery,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing SQL query:', err.message);
                response.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Update query executed successfully');
            response.json({ message: 'Albums updated successfully' });
        }
    });
});