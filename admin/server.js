const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer'); // Import multer
const app = express();
const port = 3000;

// Serve static files (CSS, JavaScript, etc.) from the "admin" directory
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON in request body
app.use(express.json());

// Serve HTML files
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Serve students.json from the CSE11 directory
app.get('/students.json', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'students.json'));
});

// Create a storage engine for multer to specify where to save the uploaded image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'images')); // Save images in the "images" directory
    },
    filename: (req, file, cb) => {
        const studentId = req.params.studentId; // Get studentId from the URL parameter
        cb(null, studentId + '.jpg'); // Use studentId as the image filename
    },
});

// Create a multer instance with the storage engine
const upload = multer({ storage: storage });

// Handle POST requests to update student image
app.post('/update-student-image/:studentId', upload.single('studentImage'), (req, res) => {
    // Image upload is handled by multer, and the uploaded image is saved in the "images" directory
    res.status(200).json({ message: 'Student image updated successfully' });
});

// Handle POST requests to update student data
app.post('/update-student', (req, res) => {
    // Read the updated data from the request body
    const updatedStudentData = req.body;

    // Read the existing students data from 'students.json'
    const filePath = path.join(__dirname, '..', 'students.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading student data:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        const studentsData = JSON.parse(data);

        // Find and update the student data based on the student ID
        const updatedStudentsData = studentsData.map((student) => {
            if (student.id === updatedStudentData.id) {
                return updatedStudentData;
            }
            return student;
        });

        // Write the updated data back to 'students.json'
        fs.writeFile(filePath, JSON.stringify(updatedStudentsData, null, 2), (err) => {
            if (err) {
                console.error('Error updating student data:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log('Student data updated successfully.');
                res.status(200).json({ message: 'Student data updated successfully' });
            }
        });
    });
});

// Catch-all route for unknown routes
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});