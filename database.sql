CREATE DATABASE quiz_app;
USE quiz_app;
CREATE TABLE quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    situation INT NOT NULL,
    answer1 VARCHAR(10),
    answer2 VARCHAR(10),
    answer3 VARCHAR(10),
    answer4 VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
