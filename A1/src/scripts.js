
function fetchPersonalData() {
    fetch('data/personal.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('name').textContent += data.name + '.';
    })
    .catch(error => console.error(error));
}