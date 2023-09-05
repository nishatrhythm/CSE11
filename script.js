// Define the number of students to display per page
let studentsPerPage = 12;

// Store the current page
let currentPage = 1;

// Function to create a student card element
function createStudentCard(student) {
    const card = document.createElement("div");
    card.classList.add("student-card");

    const image = document.createElement("img");
    image.classList.add("student-image");
    image.src = `/images/${student.id}.jpg`;
    image.alt = student.name;

    const name = document.createElement("h2");
    name.classList.add("student-name");
    name.textContent = student.name;

    const id = document.createElement("p");
    id.classList.add("student-id");
    id.textContent = `B1903050${student.id}`;

    const infoTable = document.createElement("table");
    infoTable.classList.add("student-info");

    const infoRows = [
        { label: "School:", value: student.school },
        { label: "College:", value: student.college },
        { label: "Hometown:", value: student.hometown },
    ];

    infoRows.forEach((infoRow) => {
        const row = document.createElement("tr");

        const labelCell = document.createElement("td");
        labelCell.classList.add("label");
        labelCell.textContent = infoRow.label;

        const valueCell = document.createElement("td");
        valueCell.textContent = infoRow.value;

        row.appendChild(labelCell);
        row.appendChild(valueCell);

        infoTable.appendChild(row);
    });

    const socialLinks = document.createElement("div");
    socialLinks.classList.add("social-links", "custom-social-links");

    const socialIcons = ["facebook", "twitter", "linkedin", "github"];

    socialIcons.forEach((icon) => {
        let socialLink = student.socialLinks[icon];
        if (icon === "linkedin") {
            socialLink = `https://www.linkedin.com/in/${socialLink}`;
        } else {
            socialLink = `https://www.${icon}.com/${socialLink}`;
        }

        const link = document.createElement("a");
        link.href = socialLink;
        link.innerHTML = `<i class="fab fa-${icon}"></i>`;
        link.target = "_blank"; // Open link in a new tab
        socialLinks.appendChild(link);
    });

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(infoTable);
    card.appendChild(socialLinks);

    return card;
}

// Function to display a page of students
function displayStudents(students, page, cardsPerPage) {
    const studentProfiles = document.querySelector(".student-profiles");
    studentProfiles.innerHTML = "";

    const startIndex = (page - 1) * cardsPerPage; // Use the cardsPerPage parameter here
    const endIndex = startIndex + cardsPerPage; // Use the cardsPerPage parameter here

    const studentsToDisplay = students.slice(startIndex, endIndex);

    studentsToDisplay.forEach((student) => {
        const card = createStudentCard(student);
        studentProfiles.appendChild(card);
    });
}

// Function to fetch JSON data and generate student cards
async function fetchAndGenerateStudentCards() {
    try {
        const response = await fetch("students.json"); // Fetch the JSON file
        const students = await response.json(); // Parse the JSON data

        // Function to handle the "Next" button click
        function nextPage() {
            currentPage++;
            displayStudents(students, currentPage);
            updatePaginationButtons();
            scrollToTop(); // Call the scrollToTop function
        }

        // Function to handle the "Previous" button click
        function prevPage() {
            currentPage--;
            displayStudents(students, currentPage);
            updatePaginationButtons();
            scrollToTop(); // Call the scrollToTop function
        }

        // Function to scroll to the top of the website
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth" // You can use "auto" for instant scrolling
            });
        }

        // Function to update the state of pagination buttons
        function updatePaginationButtons() {
            const prevButton = document.querySelector(".pagination-previous");
            const nextButton = document.querySelector(".pagination-next");

            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === Math.ceil(students.length / studentsPerPage);
        }

        // Event listeners for pagination buttons
        const prevButton = document.querySelector(".pagination-previous");
        const nextButton = document.querySelector(".pagination-next");

        prevButton.addEventListener("click", () => {
            currentPage--;
            displayStudents(students, currentPage, studentsPerPage); // Pass 'studentsPerPage' as the third argument
            updatePaginationButtons();
            scrollToTop();
        });

        nextButton.addEventListener("click", () => {
            currentPage++;
            displayStudents(students, currentPage, studentsPerPage); // Pass 'studentsPerPage' as the third argument
            updatePaginationButtons();
            scrollToTop();
        });

        // Add event listener to the cards per page dropdown
        const cardsPerPageDropdown = document.getElementById("cards");

        cardsPerPageDropdown.addEventListener("change", () => {
            const selectedCardsPerPage = parseInt(cardsPerPageDropdown.value, 10);
            currentPage = 1;
            studentsPerPage = selectedCardsPerPage; // Update the 'studentsPerPage' variable
            displayStudents(students, currentPage, studentsPerPage); // Pass 'studentsPerPage' as the third argument
            updatePaginationButtons();
            scrollToTop();
        });

        // Call the function to display the initial page of students
        displayStudents(students, currentPage, studentsPerPage);
        updatePaginationButtons();
    } catch (error) {
        console.error("Error fetching or parsing JSON data:", error);

        // Handle the error by disabling the buttons
        const prevButton = document.querySelector(".pagination-previous");
        const nextButton = document.querySelector(".pagination-next");

        prevButton.disabled = true;
        nextButton.disabled = true;
    }
}

// Call the function to fetch and generate student cards when the page loads
window.addEventListener("load", fetchAndGenerateStudentCards);