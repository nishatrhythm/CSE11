// Function to create a student card element
function createStudentCard(student) {
    const card = document.createElement("div");
    card.classList.add("student-card");

    const image = document.createElement("img");
    image.classList.add("student-image");
    image.src = `/images/${student.image}.jpg`; // Updated image source
    image.alt = student.name;

    const name = document.createElement("h2");
    name.classList.add("student-name");
    name.textContent = student.name;

    const id = document.createElement("p");
    id.classList.add("student-id");
    id.textContent = `B1903050${student.id.slice(-2)}`; // Extract the last 2 digits of ID

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

// Function to fetch JSON data and generate student cards
async function fetchAndGenerateStudentCards() {
    try {
        const response = await fetch("students.json"); // Fetch the JSON file
        const students = await response.json(); // Parse the JSON data

        const studentProfiles = document.querySelector(".student-profiles");

        students.forEach((student) => {
            const card = createStudentCard(student);
            studentProfiles.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching or parsing JSON data:", error);
    }
}

// Call the function to fetch and generate student cards when the page loads
window.addEventListener("load", fetchAndGenerateStudentCards);