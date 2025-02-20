require("dotenv").config(); // Load environment variables at the very top
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db"); // Import database connection

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Correct PORT setup (3306 is for MySQL, but Express should run on 3000 or another free port)
const PORT = process.env.PORT || 3000;

// ✅ Endpoint to save quiz results
app.post("/save-results", (req, res) => {
    const { userName, results } = req.body;

    if (!userName || !results || results.length === 0) {
        return res.status(400).send("Invalid input data.");
    }

    results.forEach((result, index) => {
        const query = `
            INSERT INTO quiz_results (user_name, situation, answer1, answer2, answer3, answer4) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [userName, index + 1, result[0], result[1], result[2], result[3]];

        db.query(query, values, (err) => {
            if (err) {
                console.error("Error saving results:", err);
                res.status(500).send("Error saving results.");
                return;
            }
        });
    });

    res.status(200).send("Quiz results saved successfully.");
});


app.get("/results", (req, res) => {
    db.query("SELECT * FROM quiz_results ORDER BY created_at DESC", (err, results) => {
        if (err) {
            console.error("Error fetching results:", err);
            return res.status(500).send("Error fetching results.");
        }
        res.json(results);
    });
});

// ✅ Start the Express server on the correct port
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});