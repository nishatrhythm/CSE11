// Add this code to initialize DataTables with column width adjustments
$(document).ready(function () {
    $('#studentTable').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        order: [],
        responsive: true,
        language: {
            paginate: {
                previous: '<i class="fas fa-chevron-left"></i>',
                next: '<i class="fas fa-chevron-right"></i>'
            }
        },
        columnDefs: [
            { width: '20%', targets: 0 }, // Adjust width of the "Student ID" column
            { width: '50%', targets: 1 }, // Adjust width of the "Name" column
            { width: '30%', targets: 2 }, // Adjust width of the "Actions" column
        ]
    });
});

// Counter for generating unique IDs
let idCounter = 0;

function generateStudentId() {
    idCounter++;
    const uniqueNumber = idCounter.toString().padStart(3, '0');
    return `B1903050${uniqueNumber}`;
}

// Function to fetch and display student data
function fetchAndDisplayStudents() {
    // Check if the DataTable is already initialized
    if ($.fn.DataTable.isDataTable("#studentTable")) {
        // If initialized, clear and destroy the existing DataTable
        $("#studentTable").DataTable().clear().destroy();
    }

    fetch("/students.json")
        .then((response) => response.json())
        .then((data) => {
            // Data is an array of student objects
            const students = data;

            // Access your table
            const table = $("#studentTable").DataTable({
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

            // Loop through the student data and create rows
            students.forEach((student) => {
                // Generate a unique ID for the student
                const studentId = `B1903050${student.id}`;

                // Insert cell for ID
                const idCell = studentId;

                // Insert cell for Name
                const nameCell = student.name;

                // Insert cell for Actions (View, Edit, Delete buttons)
                const actionsCell = `
                    <button class="btn btn-primary btn-sm" onclick="viewStudent('${studentId}')">View</button>
                    <button class="btn btn-warning btn-sm" onclick="editStudent('${studentId}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent('${studentId}')">Delete</button>
                `;

                // Add a new row to the DataTable
                table.row.add([idCell, nameCell, actionsCell]);
            });

            // Draw the table to display the data
            table.draw();
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
}

// Function to display the custom modal with a message and an icon
function showModal(message, alertType) {
    const modal = document.getElementById('customModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalMessage = document.getElementById('modalMessage');
    const modalCancelBtn = document.getElementById('modalCancelBtn'); // New Cancel button
    const modalConfirmBtn = document.getElementById('modalConfirmBtn'); // New Confirm button
    const body = document.querySelector('body');

    // Set the modal content based on the alert type
    switch (alertType) {
        case 'success':
            modalIcon.className = 'fa fa-check-circle';
            modalIcon.style.color = 'green';
            break;
        case 'error':
            modalIcon.className = 'fa fa-triangle-exclamation';
            modalIcon.style.color = 'orange';
            break;
        default:
            modalIcon.className = 'fa-solid fa-trash';
            modalIcon.style.color = 'red';
    }

    modalMessage.textContent = message;

    // Display the modal in the vertical center of the screen
    modal.style.display = 'flex';

    // Add the class to the body element to prevent scrolling
    body.classList.add('modal-open');

    // Disable right-clicking while the modal is open
    document.addEventListener('contextmenu', preventContextMenu);

    // Handle the "Cancel" button click to close the modal and re-enable scrolling
    modalCancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';

        // Remove the 'modal-open' class to re-enable scrolling
        document.body.classList.remove('modal-open');

        // Remove the contextmenu event listener
        document.removeEventListener('contextmenu', preventContextMenu);
    });

    // Handle the "Confirm" button click (you can add your custom logic here)
    modalConfirmBtn.addEventListener('click', () => {
        // Add your logic for the Confirm button here
        // For example, perform an action or submit a form
        // Then close the modal as needed
        modal.style.display = 'none';

        // Remove the 'modal-open' class to re-enable scrolling
        document.body.classList.remove('modal-open');

        // Remove the contextmenu event listener
        document.removeEventListener('contextmenu', preventContextMenu);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    showModal('This is a test modal that appears when the page loads.', 'info');
});

// Function to view a student's details
function viewStudent(studentId) {
    // Extract the last two characters (student number) from the studentId
    const studentNumber = studentId.substr(-2);

    // Redirect to form.html with the viewId query parameter
    window.location.href = `/form.html?viewId=${studentNumber}`;
}

// Function to edit a student's details
function editStudent(studentId) {
    // Extract the last two characters (student number) from the studentId
    const studentNumber = studentId.substr(-2);

    // Redirect to form.html with the editId query parameter for editing
    window.location.href = `/form.html?editId=${studentNumber}`;
}

function deleteStudent(studentId) {
    // Implement your logic for deleting a student's record
}

// Call the fetchAndDisplayStudents function when the page loads
$(document).ready(fetchAndDisplayStudents);