// Define the number of students to display per page
const studentsPerPage = 12;

// Store the current page
let currentPage = 1;

// Function to create a student card element
function createStudentCard(student, searchQuery = "") {
    const card = document.createElement("div");
    card.classList.add("student-card");

    const image = document.createElement("img");
    image.classList.add("student-image");
    image.src = `/images/${student.id}.jpg`;
    image.alt = student.name;

    const name = document.createElement("h2");
    name.classList.add("student-name");
    name.innerHTML = highlightText(student.name, searchQuery);

    const id = document.createElement("p");
    id.classList.add("student-id");
    id.innerHTML = highlightText(`B1903050${student.id}`, searchQuery);

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

// Function to highlight search results in text
function highlightText(text, query) {
    if (!query) return text; // Return the original text if there's no search query

    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlighted">$1</span>');
}

// Function to display a page of students
function displayStudents(students, page) {
    const studentProfiles = document.querySelector(".student-profiles");
    studentProfiles.innerHTML = "";

    const startIndex = (page - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;

    const studentsToDisplay = students.slice(startIndex, endIndex);

    studentsToDisplay.forEach((student) => {
        const card = createStudentCard(student);
        studentProfiles.appendChild(card);
    });
}

// Function to create and append pagination buttons
function createPaginationButtons() {
    const prevButton = document.createElement("button");
    prevButton.id = "prevButton";
    prevButton.classList.add("pagination-button", "pagination-previous");
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';

    const nextButton = document.createElement("button");
    nextButton.id = "nextButton";
    nextButton.classList.add("pagination-button", "pagination-next");
    nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';

    const paginationDiv = document.querySelector(".pagination");
    paginationDiv.appendChild(prevButton);
    paginationDiv.appendChild(nextButton);
}

// Function to fetch JSON data and generate student cards
async function fetchAndGenerateStudentCards() {
    try {
        const response = await fetch("students.json"); // Fetch the JSON file
        const students = await response.json(); // Parse the JSON data

        // Add an event listener to the search bar for input events
        const searchBar = document.getElementById("searchBar");
        searchBar.addEventListener("input", () => {
            applyFilters(); // Call the function to apply filters
        });

        // Function to filter and display students based on filters and search input
        function applyFilters() {
            const sortOrder = document.getElementById("sortOrder").value.toLowerCase();
            const searchValue = searchBar.value.toLowerCase();

            // Filter students based on search input
            const filteredStudents = students.filter((student) => {
                const searchData = `${student.name} B1903050${student.id} ${student.school} ${student.college} ${student.hometown}`.toLowerCase();
                const tableHeaders = ["school:", "college:", "hometown:"]; // Add lowercase versions of the table headers here
                return searchData.includes(searchValue) || tableHeaders.some(header => searchData.includes(header));
            });

            // Sort students based on the selected sort order
            if (sortOrder === "ascending") {
                filteredStudents.sort((a, b) => a.id - b.id);
            } else if (sortOrder === "descending") {
                filteredStudents.sort((a, b) => b.id - a.id);
            } else if (sortOrder === "random") {
                filteredStudents.sort(() => Math.random() - 0.5);
            }

            currentPage = 1; // Reset the current page
            displayStudents(filteredStudents, currentPage);
            updatePaginationButtons();
        }

        // Modify the event listener for the sortOrder dropdown
        const sortOrderDropdown = document.getElementById("sortOrder");
        sortOrderDropdown.addEventListener("change", () => {
            applyFilters(); // Call the function to apply filters
        });


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
            // Use window.scroll to smoothly scroll to the top of the page
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }


        // Function to update the state of pagination buttons
        function updatePaginationButtons() {
            const prevButton = document.querySelector(".pagination-previous");
            const nextButton = document.querySelector(".pagination-next");

            const sortOrder = document.getElementById("sortOrder").value.toLowerCase();
            const searchValue = searchBar.value.toLowerCase();

            // Filter students based on search input
            const filteredStudents = students.filter((student) => {
                const searchData = `${student.name} ${student.id} ${student.school} ${student.college} ${student.hometown}`.toLowerCase();
                return searchData.includes(searchValue);
            });

            // Sort and update pagination based on the filtered students
            const totalFilteredStudents = filteredStudents.length;

            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === Math.ceil(totalFilteredStudents / studentsPerPage) || totalFilteredStudents <= studentsPerPage;
        }


        // Event listeners for pagination buttons
        const prevButton = document.querySelector(".pagination-previous");
        const nextButton = document.querySelector(".pagination-next");

        prevButton.addEventListener("click", prevPage);
        nextButton.addEventListener("click", nextPage);

        // Call the function to display the initial page of students
        displayStudents(students, currentPage);
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

// Call the function to create and append pagination buttons
createPaginationButtons();