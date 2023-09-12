const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();
const port = 3000;

// Serve static files (CSS, JavaScript, etc.) from the directory where your files are located
app.use(express.static(__dirname));

// Middleware to parse JSON in request body
app.use(express.json());

// Serve HTML files
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Serve students.json from the directory where your files are located
app.get('/students.json', (req, res) => {
    const studentsJsonPath = path.join(__dirname, 'students.json');
    res.sendFile(studentsJsonPath);
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

// Handle POST requests to add student image
app.post('/add-student-image/:studentId', upload.single('studentImage'), (req, res) => {
    // Image upload is handled by multer, and the uploaded image is saved in the "images" directory
    res.status(200).json({ message: 'Student image added successfully' });
});

// Handle POST requests to add a new student
app.post('/add-student', async (req, res) => {
    try {
        const newStudentData = req.body;
        const filePath = path.join(__dirname, 'students.json');

        // Read the existing students data from 'students.json'
        const data = fs.readFileSync(filePath, 'utf8');
        const studentsData = JSON.parse(data);

        // Check if the student ID already exists
        const idExists = studentsData.some((student) => student.id === newStudentData.id);

        if (idExists) {
            return res.status(400).json({ error: 'Student ID already exists' });
        }

        // Add the new student to the data
        studentsData.push(newStudentData);

        // Write the updated data back to 'students.json'
        fs.writeFileSync(filePath, JSON.stringify(studentsData, null, 2));

        res.status(201).json({ message: 'Student added successfully' });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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
    const filePath = path.join(__dirname, 'students.json');

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

// Handle DELETE requests to delete a student and their image
app.delete('/delete-student/:studentId', (req, res) => {
    const studentId = req.params.studentId;

    // Delete the student from 'students.json'
    const filePath = path.join(__dirname, 'students.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading student data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const studentsData = JSON.parse(data);

        // Find the index of the student with the given ID
        const studentIndex = studentsData.findIndex((student) => student.id === studentId);

        if (studentIndex === -1) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Remove the student from the array
        studentsData.splice(studentIndex, 1);

        // Write the updated data back to 'students.json'
        fs.writeFile(filePath, JSON.stringify(studentsData, null, 2), (err) => {
            if (err) {
                console.error('Error deleting student data:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Delete the student's image (assuming the filename is based on the student ID)
            const imagePath = path.join(__dirname, 'images', `${studentId}.jpg`);
            
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting student image:', err);
                }

                console.log('Student and image deleted successfully.');
                res.status(200).json({ message: 'Student and image deleted successfully' });
            });
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