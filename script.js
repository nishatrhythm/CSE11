// Define the number of students to display per page
let studentsPerPage = 12;

// Store the current page
let currentPage = 1;

// Function to create a student card element
function createStudentCard(student) {
    const card = document.createElement("div");
    card.classList.add("student-card");

    // Create a new container div for the image with a 16:9 aspect ratio
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("student-image-container");

    // Set the aspect ratio using padding-bottom
    imageContainer.style.paddingBottom = "64.1%"; /* 750/1170 = 64.1% ------- 1170*750 size image */

    const image = document.createElement("img");
    image.classList.add("student-image");

    // for GitHub image link (must add the repository name to link the images folder)
    image.src = `https://nishatrhythm.github.io/CSE11/images/${student.id}.jpg`;

    // for localhost image link 
    // image.src = `/images/${student.id}.jpg`;

    image.alt = student.name;

    // Append the image to the image container
    imageContainer.appendChild(image);

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

    const socialIcons = ["facebook", "x", "linkedin", "github"];

    socialIcons.forEach((icon) => {
        let socialLink = student.socialLinks[icon];

        if (icon === "linkedin") {
            socialLink = `https://www.linkedin.com/in/${socialLink}`;
        } else if (icon === "x") {
            socialLink = `https://www.x.com/${socialLink}`;
        } else {
            socialLink = `https://www.${icon}.com/${socialLink}`;
        }

        const link = document.createElement("a");
        link.href = socialLink;
        link.innerHTML = `<i class="fa-brands ${icon === "x" ? "fa-x-twitter" : `fa-${icon}`}"></i>`;
        link.target = "_blank"; // Open link in a new tab
        socialLinks.appendChild(link);
    });

    // Append the image container, name, id, infoTable, and socialLinks to the card
    card.appendChild(imageContainer);
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

// Function to display the custom modal with a message and an icon
function showModal(message, alertType) {
    const modal = document.getElementById('customModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalMessage = document.getElementById('modalMessage');
    const modalOkayBtn = document.getElementById('modalOkayBtn');
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
            // modalMessage.classList.add('error-message');
            break;
        default:
            modalIcon.className = 'fa fa-info-circle';
            modalIcon.style.color = 'blue';
    }

    modalMessage.textContent = message;

    // Display the modal in the vertical center of the screen
    modal.style.display = 'flex';
    modal.classList.add('show'); // Add the 'show' class for the animation

    // Add the class to the body element to prevent scrolling
    body.classList.add('modal-open');

    // Disable right-clicking while the modal is open
    document.addEventListener('contextmenu', preventContextMenu);

    // Handle the "Cancel" button click to close the modal and re-enable scrolling
    modalOkayBtn.addEventListener('click', () => {
        closeModal();
    });

    // Function to close the modal and remove animations
    function closeModal() {
        modal.classList.remove('show'); // Remove the 'show' class to trigger the fade-out animation
        setTimeout(() => {
            modal.style.display = 'none'; // Hide the modal after the animation completes
            // Remove the 'modal-open' class to re-enable scrolling
            body.classList.remove('modal-open');
            // Remove the contextmenu event listener
            document.removeEventListener('contextmenu', preventContextMenu);
        }, 300); // Adjust the timeout to match the animation duration
    }
}

// Function to prevent the context menu (right-click) while the modal is open
function preventContextMenu(event) {
    event.preventDefault();
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

            // Update pagination buttons and call highlightCardContent
            updatePaginationButtons();
            highlightCardContent(searchInput.value.trim().toLowerCase()); // Add this line
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

            // Call highlightCardContent again after displaying students
            highlightCardContent(searchInput.value.trim().toLowerCase());
        });

        nextButton.addEventListener("click", () => {
            currentPage++;
            displayStudents(students, currentPage, studentsPerPage); // Pass 'studentsPerPage' as the third argument
            updatePaginationButtons();
            scrollToTop();

            // Call highlightCardContent again after displaying students
            highlightCardContent(searchInput.value.trim().toLowerCase());
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

            // Update pagination buttons and call highlightCardContent
            updatePaginationButtons();
            highlightCardContent(searchInput.value.trim().toLowerCase()); // Add this line
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

                    // Highlight the searched text
                    highlightCardContent(searchQuery);

                    updatePaginationButtons();
                } else {
                    // Display a modal alert
                    showModal("Your query did not bring up any results.", 'error');

                    // Add an event listener to the modal "Okay" button to scroll to the input field
                    const modalOkayBtn = document.getElementById('modalOkayBtn');
                    modalOkayBtn.addEventListener('click', () => {
                        // Set the Search Input field border red after the delay
                        setTimeout(() => {
                            searchInput.focus(); // Focus on the Search Input field
                            searchInput.classList.add("red-border");

                            // Customize the #searchInput outline color
                            searchInput.style.outlineColor = "red";

                            scrollToElement(searchInput); // Scroll to the Search Input field
                        }, 200);
                    });

                    // Add an input event listener to remove the red border when the user starts typing again
                    searchInput.addEventListener('input', function () {
                        searchInput.classList.remove("red-border"); // Remove the red border

                        // Reset #searchInput outline color to its original state
                        searchInput.style.outlineColor = "#3498db";
                        searchInput.focus();
                    });
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

            // Call the highlightCardContent function after displaying students
            highlightCardContent(searchQuery);
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
        element.classList.remove("highlight-school"); // Remove the specific highlight classes
        element.classList.remove("highlight-college"); // Remove the specific highlight classes
        element.classList.remove("highlight-hometown"); // Remove the specific highlight classes
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
