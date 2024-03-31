
function fetchPersonalData() {
    fetch('data/personal.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('namePlaceholder').textContent = data['personal'].name;
        document.getElementById('dateOfBirth').textContent = data['personal'].dateOfBirth;
        document.getElementById('placeOfBirth').textContent = data['personal'].placeOfBirth;
        document.getElementById('currentlyLivingIn').textContent = data['personal'].currentlyLivingIn;
        document.getElementById('address').textContent = data['personal']['address'].street + ', ' + data['personal']['address'].city + ', ' + data['personal']['address'].state;
    })
    .catch(error => console.error(error));
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