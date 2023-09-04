// Sample data for student cards
const students = [
    {
        image: "/images/001.jpg",
        name: "Farhana Akter Suci",
        id: "B190305001",
        school: "Updating soon",
        college: "Updating soon",
        hometown: "Majdee Court, Sadar, Noakhali",
        socialLinks: {
            facebook: "https://www.facebook.com",
            twitter: "https://www.twitter.com",
            linkedin: "https://www.linkedin.com",
            github: "https://www.github.com"
        }
    },
    {
        image: "/images/002.jpg",
        name: "A. M. Rakib Hasan",
        id: "B190305002",
        school: "Updating soon",
        college: "Updating soon",
        hometown: "Brahmman Paiksha, Sreenagar, Munshiganj",
        socialLinks: {
            facebook: "https://www.facebook.com",
            twitter: "https://www.twitter.com",
            linkedin: "https://www.linkedin.com",
            github: "https://www.github.com"
        }
    },
    // Add more student data here
];

// Function to create a student card
function createStudentCard(student) {
    const card = document.createElement("div");
    card.classList.add("student-card");

    card.innerHTML = `
        <img class="student-image" src="${student.image}" alt="${student.name}">
        <h2 class="student-name">${student.name}</h2>
        <p class="student-id">${student.id}</p>
        <table class="student-info">
            <tr>
                <td class="label">School:</td>
                <td>${student.school}</td>
            </tr>
            <tr>
                <td class="label">College:</td>
                <td>${student.college}</td>
            </tr>
            <tr>
                <td class="label">Hometown:</td>
                <td>${student.hometown}</td>
            </tr>
        </table>
        <div class="social-links custom-social-links">
            <a href="${student.socialLinks.facebook}"><i class="fab fa-facebook"></i></a>
            <a href="${student.socialLinks.twitter}"><i class="fab fa-twitter"></i></a>
            <a href="${student.socialLinks.linkedin}"><i class="fab fa-linkedin"></i></a>
            <a href="${student.socialLinks.github}"><i class="fab fa-github"></i></a>
        </div>
    `;

    return card;
}

// Function to generate student cards and append them to the page
function generateStudentCards() {
    const studentProfiles = document.querySelector(".student-profiles");

    students.forEach((student) => {
        const card = createStudentCard(student);
        studentProfiles.appendChild(card);
    });
}

// Call the function to generate student cards when the page loads
window.addEventListener("load", generateStudentCards);
