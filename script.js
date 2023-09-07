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

        // Add this code inside the fetchAndGenerateStudentCards function
        const sortingDropdown = document.getElementById("sorting");
        sortingDropdown.addEventListener("change", () => {
            // Get the selected sorting option
            const selectedSorting = sortingDropdown.value;

            // Sort the students based on the selected option
            if (selectedSorting === "asc") {
                students.sort((a, b) => (a.id - b.id)); // Sort in ascending order by student ID
            } else if (selectedSorting === "desc") {
                students.sort((a, b) => (b.id - a.id)); // Sort in descending order by student ID
            } else if (selectedSorting === "random") {
                students.sort(() => Math.random() - 0.5); // Shuffle the students randomly
            }

            // Re-display the students with the new sorting
            currentPage = 1; // Reset to the first page

            // Check if there is a search query
            if (searchInput.value.trim() !== "") {
                const filteredStudents = filterStudents(searchInput.value.trim().toLowerCase(), students);
                displayStudents(filteredStudents, currentPage, studentsPerPage);
            } else {
                displayStudents(students, currentPage, studentsPerPage);
            }

            updatePaginationButtons();
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
            window.scrollTo({
                top: 0,
                behavior: "smooth" // You can use "auto" for instant scrolling
            });
        }

        // Function to update the state of pagination buttons
        function updatePaginationButtons() {
            const prevButton = document.querySelector(".pagination-previous");
            const nextButton = document.querySelector(".pagination-next");

            const searchValue = searchInput.value.toLowerCase();

            // Filter students based on search input
            const filteredStudents = students.filter((student) => {
                const searchData = `${student.name} B1903050${student.id} ${student.school} ${student.college} ${student.hometown}`.toLowerCase();
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

            // Check if there is a search query
            if (searchInput.value.trim() !== "") {
                const filteredStudents = filterStudents(searchInput.value.trim().toLowerCase(), students);
                displayStudents(filteredStudents, currentPage, studentsPerPage);
            } else {
                displayStudents(students, currentPage, studentsPerPage);
            }

            updatePaginationButtons();
            scrollToTop();
        });

        // Function to filter students based on search query (case-insensitive)
        function filterStudents(query, students) {
            query = query.toLowerCase();
            return students.filter((student) => {
                // Combine student data fields into a single string for searching
                const searchData = `${student.name} B1903050${student.id} ${student.school} ${student.college} ${student.hometown}`.toLowerCase();

                // Check if the query exactly matches the full student ID
                if (searchData.includes(`b1903050${query}`)) {
                    return true;
                }

                // Check if the query is a partial match for the full student ID or other fields
                return searchData.includes(query);
            });
        }

        // Event listener for the search button
        const searchButton = document.getElementById("searchButton");
        searchButton.addEventListener("click", () => {
            const searchInput = document.getElementById("searchInput");
            const searchQuery = searchInput.value.trim(); // Get the search query and remove leading/trailing spaces

            if (searchQuery !== "") {
                // Filter students based on the search query
                const filteredStudents = filterStudents(searchQuery, students);

                if (filteredStudents.length > 0) {
                    // If there are matching students, display them
                    currentPage = 1; // Reset to the first page
                    displayStudents(filteredStudents, currentPage, studentsPerPage);
                    updatePaginationButtons();
                } else {
                    // If no matching students found, display a message or handle it as needed
                    // For example, you can show an alert or a message on the page
                    alert("No matching students found.");
                }
            } else {
                // If the search input is empty, add the "shaky" class for animation
                searchContainer.classList.add("shaky");

                // Add the red border class to the input element
                searchInput.classList.add("red-border");

                // Remove the "shaky" class and red border class after the animation duration
                setTimeout(() => {
                    searchContainer.classList.remove("shaky");
                    searchInput.classList.remove("red-border");
                }, 500); // Adjust the duration to match the animation duration in CSS
            }
        });

        // Event listener for real-time search
        const searchInput = document.getElementById("searchInput");
        searchInput.addEventListener("input", () => {
            const searchQuery = searchInput.value.trim().toLowerCase();

            // Filter students based on the search query
            const filteredStudents = filterStudents(searchQuery, students);

            // Display the filtered students
            currentPage = 1; // Reset to the first page
            displayStudents(filteredStudents, currentPage, studentsPerPage);
            updatePaginationButtons();
        });

        // Event listener for real-time search
        searchInput.addEventListener("input", () => {
            const searchQuery = searchInput.value.trim().toLowerCase();

            // Filter students based on the search query
            const filteredStudents = filterStudents(searchQuery, students);

            // Display the filtered students
            currentPage = 1; // Reset to the first page
            displayStudents(filteredStudents, currentPage, studentsPerPage);
            updatePaginationButtons();

            // Highlight search results in all card content
            highlightCardContent(searchQuery);
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

// Function to highlight search results in student card content
function highlightCardContent(searchQuery) {
    const studentProfiles = document.querySelector(".student-profiles");

    // Remove previous highlights
    const highlightedText = studentProfiles.querySelectorAll(".highlight");
    highlightedText.forEach((element) => {
        element.classList.remove("highlight");
    });

    // Highlight new search results in all card content
    if (searchQuery.trim() !== "") {
        const searchRegex = new RegExp(searchQuery, "gi"); // "gi" for global and case-insensitive search
        const cardContentElements = studentProfiles.querySelectorAll(".student-name, .student-id, .student-info td"); // Include td elements for School, College, and Hometown

        cardContentElements.forEach((element) => {
            const contentText = element.textContent;
            const highlightedHTML = contentText.replace(searchRegex, (match) => `<span class="highlight">${match}</span>`);
            element.innerHTML = highlightedHTML;

            // Add specific CSS classes for School, College, and Hometown
            if (element.parentElement.classList.contains("school")) {
                element.classList.add("highlight-school");
            } else if (element.parentElement.classList.contains("college")) {
                element.classList.add("highlight-college");
            } else if (element.parentElement.classList.contains("hometown")) {
                element.classList.add("highlight-hometown");
            }
        });
    }
}

// Call the function to fetch and generate student cards when the page loads
window.addEventListener("load", fetchAndGenerateStudentCards);