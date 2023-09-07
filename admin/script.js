// Add this code to initialize DataTables
$(document).ready(function () {
    $('#studentTable').DataTable({
        paging: true, // Enable pagination
        searching: true, // Enable search
        ordering: true, // Enable sorting
        order: [], // Default sorting (remove this line if you want DataTables to automatically sort)
        responsive: true, // Enable responsiveness
        language: {
            paginate: {
                previous: '<i class="fas fa-chevron-left"></i>',
                next: '<i class="fas fa-chevron-right"></i>'
            }
        }
    });
});

// Counter for generating unique IDs
let idCounter = 0;

// Function to generate a unique student ID
function generateStudentId() {
    idCounter++;
    // You can customize the format of the ID here
    // This example uses "B1903050" followed by a unique number
    return `B1903050${idCounter.toString().padStart(3, '0')}`;
}

// Function to fetch and display student data
function fetchAndDisplayStudents() {
    fetch("/students.json")
        .then((response) => response.json())
        .then((data) => {
            // Data is an array of student objects
            const students = data;

            // Access your table and tbody elements
            const table = document.getElementById("studentTable");
            const tbody = table.getElementsByTagName("tbody")[0];

            // Loop through the student data and create rows
            students.forEach((student) => {
                const row = tbody.insertRow();

                // Generate a unique ID for the student
                const studentId = generateStudentId();

                // Insert cell for ID
                const idCell = row.insertCell(0);
                idCell.textContent = studentId;

                // Insert cell for Name
                const nameCell = row.insertCell(1);
                nameCell.textContent = student.name;

                // Insert cell for Actions (View, Edit, Delete buttons)
                const actionsCell = row.insertCell(2);
                actionsCell.innerHTML = `
                    <button class="btn btn-primary btn-sm" onclick="viewStudent('${studentId}')">View</button>
                    <button class="btn btn-warning btn-sm" onclick="editStudent('${studentId}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent('${studentId}')">Delete</button>
                `;
            });
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
}

// Call the fetchAndDisplayStudents function when the page loads
window.addEventListener("load", fetchAndDisplayStudents);

// You can define your viewStudent, editStudent, and deleteStudent functions here
function viewStudent(studentId) {
    // Implement your logic for viewing a student's details
}

function editStudent(studentId) {
    // Implement your logic for editing a student's details
}

function deleteStudent(studentId) {
    // Implement your logic for deleting a student's record
}