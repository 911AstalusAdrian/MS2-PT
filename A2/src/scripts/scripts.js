function fetchPersonalData() {
    fetch('http://127.0.0.1:5000/about')
    .then(response => response.json())
    .then(data => {
        data = data[0]
        console.log(data);
        document.getElementById('namePlaceholder').textContent = data['name'];
        document.getElementById('dateOfBirth').textContent = data['dateOfBirth'];
        document.getElementById('placeOfBirth').textContent = data['placeOfBirth'];
        document.getElementById('currentlyLivingIn').textContent = data['currentCity'];
        document.getElementById('address').textContent = data['addressStreet']+ ', ' + data['addressCity'] + ', ' + data['addressState'] + ', ' + data['addressZip'];

    })
    .catch(error => console.error('Error:', error));
}

function fetchWorkExperience(){
    fetch('http://127.0.0.1:5000/work')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(element => {
            let workExperience = document.createElement('li');

            let workExperienceCompany = document.createElement('h2');
            workExperienceCompany.classList.add('font-bold');
            workExperienceCompany.classList.add('text-xl');

            let workExperiencePosition = document.createElement('p');
            workExperiencePosition.classList.add('text-lg');

            let workExperienceDuration = document.createElement('p');
            workExperienceDuration.classList.add('text-lg');

            workExperienceCompany.textContent = element.company;
            workExperiencePosition.textContent = "Position: " + element.position;
            workExperienceDuration.textContent = "Duration: " + element.start_date + " - " + element.end_date;

            workExperience.appendChild(workExperienceCompany);
            workExperience.appendChild(workExperiencePosition);
            workExperience.appendChild(workExperienceDuration);
            console.log('Appending work experience...');
            document.getElementById('workExperienceList').appendChild(workExperience);
        });
    })
    .catch(error => console.error('Error:', error));
}

function fetchEducation(){
    fetch('http://127.0.0.1:5000/education')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(element => {
            let education = document.createElement('li');
            
            let educationInstitution = document.createElement('h2');
            educationInstitution.classList.add('font-bold');
            educationInstitution.classList.add('text-xl');
            
            let educationDegree = document.createElement('p');
            educationDegree.classList.add('text-lg');

            let educationDuration = document.createElement('p');
            educationDuration.classList.add('text-lg');

            educationInstitution.textContent = element.institution;
            educationDegree.textContent = "Degree: " + element.degree + " in " + element.major;
            educationDuration.textContent = "Duration: " + element.start_date + " - " + element.end_date;
            
            education.appendChild(educationInstitution);
            education.appendChild(educationDegree);
            education.appendChild(educationDuration);
            console.log('Appending education...');
            document.getElementById('educationList').appendChild(education);
        });
    })

}

function fetchHobbies(){
    fetch('http://127.0.0.1:5000/work')

}

function initData(){
    fetchPersonalData();
    fetchWorkExperience();
    fetchEducation();
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