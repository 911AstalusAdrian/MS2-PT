
document.addEventListener("DOMContentLoaded", function() {
    initData();
});


// function fetchPersonalData() {
//     fetch('../data/personal.json')
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById('namePlaceholder').textContent = data['personal'].name;
//         document.getElementById('dateOfBirth').textContent = data['personal'].dateOfBirth;
//         document.getElementById('placeOfBirth').textContent = data['personal'].placeOfBirth;
//         document.getElementById('currentlyLivingIn').textContent = data['personal'].currentlyLivingIn;
//         document.getElementById('address').textContent = data['personal']['address'].street + ', ' + data['personal']['address'].city + ', ' + data['personal']['address'].state;
//     })
//     .catch(error => console.error(error));
// }

// function fetchWorkExperience(){
//     fetch('../data/personal.json')
//     .then(response => response.json())
//     .then(data => {
//         let workExperience = data['workExperience'];
//         console.log('Fetching work experience...');
//         workExperience.forEach(element => {
//             let workExperience = document.createElement('li');

//             let workExperienceCompany = document.createElement('h2');
//             workExperienceCompany.classList.add('font-bold');
//             workExperienceCompany.classList.add('text-xl');

//             let workExperiencePosition = document.createElement('p');
//             workExperiencePosition.classList.add('text-lg');

//             let workExperienceDuration = document.createElement('p');
//             workExperienceDuration.classList.add('text-lg');

//             workExperienceCompany.textContent = element.company;
//             workExperiencePosition.textContent = "Position: " + element.position;
//             workExperienceDuration.textContent = "Duration: " + element.duration;

//             workExperience.appendChild(workExperienceCompany);
//             workExperience.appendChild(workExperiencePosition);
//             workExperience.appendChild(workExperienceDuration);
//             console.log('Appending work experience...');
//             document.getElementById('workExperienceList').appendChild(workExperience);
//         });
//     })
//     .catch(error => console.error(error));
// }

// function fetchEducation(){
//     fetch('../data/personal.json')
//     .then(response => response.json())
//     .then(data => {
//         let education = data['education'];
//         console.log('Fetching education...');
//         education.forEach(element => {
//             let education = document.createElement('li');
            
//             let educationInstitution = document.createElement('h2');
//             educationInstitution.classList.add('font-bold');
//             educationInstitution.classList.add('text-xl');
            
//             let educationDegree = document.createElement('p');
//             educationDegree.classList.add('text-lg');

//             let educationDuration = document.createElement('p');
//             educationDuration.classList.add('text-lg');

//             educationInstitution.textContent = element.institution;
//             educationDegree.textContent = "Degree: " + element.degree + " in " + element.major;
//             educationDuration.textContent = "Duration: " + element.duration;
            
//             education.appendChild(educationInstitution);
//             education.appendChild(educationDegree);
//             education.appendChild(educationDuration);
//             console.log('Appending education...');
//             document.getElementById('educationList').appendChild(education);
//         });
//     })
// }

function fetchHobbies() {
    fetch('http://127.0.0.1:5000/hobbies', {mode: 'no-cors'})
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
}


function initData(){
    // fetchPersonalData();
    // fetchWorkExperience();
    // fetchEducation();
    fetchHobbies();
}


function visitInstagram() {
    document.getElementById('insta').innerHTML = 'Instagram';
    console.log('Visiting Instagram profile...');
    window.open('https://www.instagram.com/astalusadrian/', '_blank');
}

function visitLinkedIn() {
    document.getElementById('linkedin').innerHTML = 'LinkedIn';
    console.log('Visiting LinkedIn profile...');
    window.open('https://www.linkedin.com/in/adrian-astalus/', '_blank');
}

function visitGitHub() {
    document.getElementById('github').innerHTML = 'GitHub';
    console.log('Visiting GitHub profile...');
    window.open('https://github.com/911AstalusAdrian', '_blank');
}

function dropdownWorkExperience() {
    console.log('Dropdown work experience...')
    document.getElementById('workExperience').classList.toggle('hidden');
}

function dropdownEducation() {
    console.log('Dropdown education...')
    document.getElementById('education').classList.toggle('hidden');
}