// Create and append the heading element
const heading = document.createElement("h2");
heading.className = "text-center mt-2 mb-5";
const headingText = document.createElement("strong");
headingText.textContent = "Add Student Information";
heading.appendChild(headingText);

// Create a new form element
const form = document.createElement("form");
form.id = "studentForm";
form.enctype = "multipart/form-data";
form.className = "mt-4 polite-background";

// Append the heading to the form
form.appendChild(heading);

// Create the form elements and append them to the form

// Student ID
const studentIdDiv = document.createElement("div");
studentIdDiv.className = "form-group mb-3";

const studentIdLabel = document.createElement("label");
studentIdLabel.textContent = "Student ID:";
studentIdDiv.appendChild(studentIdLabel);

const studentIdInputGroup = document.createElement("div");
studentIdInputGroup.className = "input-group";

const studentIdInputGroupPrepend = document.createElement("div");
studentIdInputGroupPrepend.className = "input-group-prepend";

const studentIdInputGroupText = document.createElement("span");
studentIdInputGroupText.className = "input-group-text";
studentIdInputGroupText.textContent = "B1903050";
studentIdInputGroupPrepend.appendChild(studentIdInputGroupText);

const studentIdInput = document.createElement("input");
studentIdInput.type = "text";
studentIdInput.id = "id";
studentIdInput.name = "id";
studentIdInput.className = "form-control";
studentIdInput.required = true;

studentIdInputGroup.appendChild(studentIdInputGroupPrepend);
studentIdInputGroup.appendChild(studentIdInput);

studentIdDiv.appendChild(studentIdInputGroup);
form.appendChild(studentIdDiv);

// Name
const nameDiv = createFormInput("Name:", "text", "name", "name", true);
form.appendChild(nameDiv);

// School
const schoolDiv = createFormInput("School:", "text", "school", "school", false);
form.appendChild(schoolDiv);

// College
const collegeDiv = createFormInput("College:", "text", "college", "college", false);
form.appendChild(collegeDiv);

// Hometown
const hometownDiv = createFormInput("Hometown:", "text", "hometown", "hometown", false);
form.appendChild(hometownDiv);

// Student Image Label (with information icon)
const imageLabelDiv = document.createElement("div");
imageLabelDiv.className = "form-group mb-3 d-flex align-items-center"; // Add a class for flex alignment

const imageLabel = document.createElement("label");
imageLabel.textContent = "Student Image:";
imageLabelDiv.appendChild(imageLabel);

// Create an information icon (i button)
const infoIcon = document.createElement("i");
infoIcon.className = "fas fa-info-circle ml-2 warning-icon"; // Add Font Awesome classes for the icon
infoIcon.style.cursor = "pointer"; // Add a pointer cursor to indicate interactivity

// Create a custom tooltip element
const customTooltip = document.createElement("div");
customTooltip.className = "custom-tooltip";
customTooltip.textContent = "Local development prevents direct browser-based file uploads due to security restrictions.";
customTooltip.style.display = "none"; // Initially hide the tooltip

// Append the tooltip element to the information icon
infoIcon.appendChild(customTooltip);

// Add an event listener to show the tooltip on mouseover
infoIcon.addEventListener("mouseover", function () {
    customTooltip.style.display = "block"; // Show the tooltip
});

// Add an event listener to hide the tooltip on mouseout
infoIcon.addEventListener("mouseout", function () {
    customTooltip.style.display = "none"; // Hide the tooltip
});

// Append the information icon to the imageLabelDiv
imageLabelDiv.appendChild(infoIcon);

form.appendChild(imageLabelDiv);

// Create a new paragraph element for the warning text
const warningText = document.createElement("p");
warningText.className = "warning-text";
warningText.textContent = "Please add the image inside \"images\" folder.";

// Create a "Learn more" link within the warning text
const learnMoreLink = document.createElement("a");
learnMoreLink.href = "https://github.com/nishatrhythm/CSE11"; // Replace with the actual link
learnMoreLink.target = "_blank"; // Open link in a new tab
learnMoreLink.textContent = "Learn more";

// Append the "Learn more" link to the warning text
warningText.appendChild(learnMoreLink);

// Append the warning text to the form
form.appendChild(warningText);

// Social Links
const socialLinksDiv = document.createElement("div");
socialLinksDiv.className = "form-group";

const socialLinksTable = document.createElement("table");
socialLinksTable.className = "social-links-table";

// Create a new table row for each social link
const facebookRow = createSocialLinkRow("Facebook", "facebook");
const twitterRow = createSocialLinkRow("Twitter", "twitter");
const linkedinRow = createSocialLinkRow("LinkedIn", "linkedin");
const githubRow = createSocialLinkRow("GitHub", "github");

// Append the rows to the table
socialLinksTable.appendChild(facebookRow);
socialLinksTable.appendChild(twitterRow);
socialLinksTable.appendChild(linkedinRow);
socialLinksTable.appendChild(githubRow);

// Append the table to the form
socialLinksDiv.appendChild(socialLinksTable);
form.appendChild(socialLinksDiv);

// Submit Button
const submitButtonDiv = document.createElement("div");
submitButtonDiv.className = "form-group";

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.className = "btn btn-primary";
submitButton.textContent = "Add Student";

submitButtonDiv.appendChild(submitButton);
form.appendChild(submitButtonDiv);

// Finally, append the form to the container in your HTML
const container = document.querySelector(".container");
container.appendChild(form);

function createFormInput(labelText, inputType, inputId, inputName, isRequired, inputValue = "") {
    const inputDiv = document.createElement("div");
    inputDiv.className = "form-group mb-3";

    const label = document.createElement("label");
    label.textContent = labelText;
    inputDiv.appendChild(label);

    const input = document.createElement("input");
    input.type = inputType;
    input.id = inputId;
    input.name = inputName;
    input.className = "form-control";
    if (isRequired) {
        input.required = true;
    }
    if (inputValue !== "") {
        input.value = inputValue;
    }

    inputDiv.appendChild(input);
    return inputDiv;
}

function createSocialLinkRow(labelText, inputName) {
    const row = document.createElement("tr");

    const labelCell = document.createElement("td");
    const label = document.createElement("label");
    label.textContent = labelText + ":";
    labelCell.appendChild(label);

    const inputCell = document.createElement("td");
    inputCell.className = "social-input";

    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";

    const inputGroupPrepend = document.createElement("div");
    inputGroupPrepend.className = "input-group-prepend";

    const iconSpan = document.createElement("span");
    iconSpan.className = "input-group-text";
    const icon = document.createElement("i");
    icon.className = "fab fa-" + inputName;
    iconSpan.appendChild(icon);
    inputGroupPrepend.appendChild(iconSpan);

    const input = document.createElement("input");
    input.type = "text";
    input.id = inputName;
    input.name = "socialLinks[" + inputName + "]";
    input.required = false;
    input.className = "form-control";

    inputGroup.appendChild(inputGroupPrepend);
    inputGroup.appendChild(input);

    inputCell.appendChild(inputGroup);
    row.appendChild(labelCell);
    row.appendChild(inputCell);

    return row;
}

// Function to fetch and display student data based on viewId
function fetchAndDisplayViewStudent() {
    // Get the viewId query parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const viewId = params.get('viewId');

    // Check if viewId is not null
    if (viewId) {
        // Fetch student data from students.json
        fetch('/students.json')
            .then(response => response.json())
            .then(data => {
                // Find the student with the matching ID
                const student = data.find(student => student.id === viewId);

                if (student) {
                    // Populate the form fields with the student's data
                    document.getElementById('id').value = student.id;
                    document.getElementById('name').value = student.name;
                    document.getElementById('school').value = student.school;
                    document.getElementById('college').value = student.college;
                    document.getElementById('hometown').value = student.hometown;
                    document.getElementById('facebook').value = student.socialLinks.facebook;
                    document.getElementById('twitter').value = student.socialLinks.twitter;
                    document.getElementById('linkedin').value = student.socialLinks.linkedin;
                    document.getElementById('github').value = student.socialLinks.github;
                } else {
                    console.error('Student not found.');
                }
            })
            .catch(error => {
                console.error('Error loading student data:', error);
            });
    } else {
        console.error('View ID not specified.');
    }
}

// Call the fetchAndDisplayViewStudent function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayViewStudent);

// Function to fetch and display student data based on editId
function fetchAndDisplayEditStudent() {
    // Get the editId query parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const editId = params.get('editId');

    // Check if editId is not null
    if (editId) {
        // Fetch student data from students.json
        fetch('/students.json')
            .then(response => response.json())
            .then(data => {
                // Find the student with the matching ID
                const student = data.find(student => student.id === editId);

                if (student) {
                    // Populate the form fields with the student's data
                    document.getElementById('id').value = student.id;
                    document.getElementById('name').value = student.name;
                    document.getElementById('school').value = student.school;
                    document.getElementById('college').value = student.college;
                    document.getElementById('hometown').value = student.hometown;
                    document.getElementById('facebook').value = student.socialLinks.facebook;
                    document.getElementById('twitter').value = student.socialLinks.twitter;
                    document.getElementById('linkedin').value = student.socialLinks.linkedin;
                    document.getElementById('github').value = student.socialLinks.github;
                    ;
                } else {
                    console.error('Student not found.');
                }
            })
            .catch(error => {
                console.error('Error loading student data:', error);
            });
    } else {
        console.error('Edit ID not specified.');
    }
}

// Call the fetchAndDisplayEditStudent function when the page loads for editing
document.addEventListener('DOMContentLoaded', fetchAndDisplayEditStudent);

// Add this code at the end of your form.js file
const urlParams = new URLSearchParams(window.location.search);
const viewId = urlParams.get("viewId");

// Function to populate the form fields
function populateFormFieldsView(student) {
    // Change the heading text to "View Student Information"
    const heading = document.getElementById("heading");
    headingText.textContent = "View Student Information";

    // Update the warning text
    warningText.textContent = "Please see the image inside the \"images\" folder.";

    // Update the "Learn more" link
    learnMoreLink.href = "https://github.com/nishatrhythm/CSE11"; // Update the link for viewing

    // Append the "Learn more" link to the warning text
    warningText.appendChild(learnMoreLink);

    const studentIdInput = document.getElementById("id");
    studentIdInput.value = student.id;
    studentIdInput.disabled = true;

    const nameInput = document.getElementById("name");
    nameInput.value = student.name;
    nameInput.disabled = true;

    const schoolInput = document.getElementById("school");
    schoolInput.value = student.school;
    schoolInput.disabled = true;

    const collegeInput = document.getElementById("college");
    collegeInput.value = student.college;
    collegeInput.disabled = true;

    const hometownInput = document.getElementById("hometown");
    hometownInput.value = student.hometown;
    hometownInput.disabled = true;

    const facebookInput = document.getElementById("facebook");
    facebookInput.value = student.socialLinks.facebook;
    facebookInput.disabled = true;

    const twitterInput = document.getElementById("twitter");
    twitterInput.value = student.socialLinks.twitter;
    twitterInput.disabled = true;

    const linkedinInput = document.getElementById("linkedin");
    linkedinInput.value = student.socialLinks.linkedin;
    linkedinInput.disabled = true;

    const githubInput = document.getElementById("github");
    githubInput.value = student.socialLinks.github;
    githubInput.disabled = true;

    // Hide the "Add Student" button
    submitButton.style.display = "none";
}

// Check if viewId exists and fetch the corresponding student data
if (viewId) {
    fetch("/students.json")
        .then((response) => response.json())
        .then((data) => {
            const student = data.find((s) => s.id === viewId);
            if (student) {
                populateFormFieldsView(student);
            } else {
                console.error(`Student with ID ${viewId} not found.`);
            }
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
}

const editId = urlParams.get("editId");

// Function to populate the form fields
function populateFormFieldsEdit(student) {
    // Change the heading text to "View Student Information"
    const heading = document.getElementById("heading");
    headingText.textContent = "Update Student Information";

    // Update the warning text
    warningText.textContent = "Please update the image inside the \"images\" folder.";

    // Update the "Learn more" link
    learnMoreLink.href = "https://github.com/nishatrhythm/CSE11"; // Update the link for viewing

    // Append the "Learn more" link to the warning text
    warningText.appendChild(learnMoreLink);

    const studentIdInput = document.getElementById("id");
    studentIdInput.value = student.id;
    studentIdInput.disabled = true;

    // Update the button label to "Update Student"
    const submitButton = document.querySelector(".btn.btn-primary");
    submitButton.textContent = "Update Student";
}

// Check if editId exists and fetch the corresponding student data
if (editId) {
    fetch("/students.json")
        .then((response) => response.json())
        .then((data) => {
            const student = data.find((s) => s.id === editId);
            if (student) {
                populateFormFieldsEdit(student);
            } else {
                console.error(`Student with ID ${viewId} not found.`);
            }
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
}