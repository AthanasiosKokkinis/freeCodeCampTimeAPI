const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {
    const { date } = req.params;
    let parsedDate;

    // Determine if the date parameter is present and what type it is
    if (date) {
        // Check if the date is a number (UNIX timestamp in milliseconds)
        if (!isNaN(date)) {
            // Convert string to number
            parsedDate = new Date(parseInt(date));
        } else {
            // Parse the string date
            parsedDate = new Date(date);
        }
    } else {
        // No date parameter, use the current date
        parsedDate = new Date();
    }

    // Validate the parsed date
    if (parsedDate.toString() === "Invalid Date") {
        res.json({ error: "Invalid Date" });
    } else {
        // Return the formatted date
        res.json({
            unix: parsedDate.getTime(), // UNIX timestamp in milliseconds
            utc: parsedDate.toUTCString() // UTC string
        });
    }
});