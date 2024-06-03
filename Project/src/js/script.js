function uploadCSV() {
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        columns = data['columns']
        document.getElementById('uploadButton').classList.add('hidden');
        document.getElementById('additionalButtons').classList.remove('hidden');
        document.getElementById('tableContainer').classList.remove('hidden');

        const columnsSelect = document.getElementById('columnsSelect')
        // console.log('Columns:', columns);
        columns.forEach(column => {
            const option = document.createElement('option');
            option.value = column;
            option.text = column;
            columnsSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error uploading CSV:', error));
    // TODO: Display error message on page when upload fails
}

function getDataShape() {

    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';

    fetch('http://127.0.0.1:5000/shape')
    .then(response => response.json())
    .then(data => {
        console.log('Getting data shape...');
        let tableHTML = '<table class="table-auto w-full border-collapse border border-gray-400 ">';
        tableHTML += '<tr><th>Rows</th><th>Columns</th></tr>';
        tableHTML += '<tr><td class="border px-4 py-2">' + data.rows + '</td><td class="border px-4 py-2">' + data.columns + '</td></tr>';
        tableHTML += '</table>';
        tableContainer.innerHTML = tableHTML;
    })
}

function getColumnDetails(){

    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';

    fetch('http://127.0.0.1:5000/columns')
    .then(response => response.json())
    .then(data => {
    
        console.log('Getting column details...');
        let tableHTML = '<table class="table-auto w-full border-collapse border border-gray-400 ">';
        tableHTML += '<tr><th>Columns</th><th>Data Type</th></tr>';
        columns = data.Columns;
        types = data.Type; 
        columns.forEach((column, index) => {
            tableHTML += '<tr><td class="border px-4 py-2">' + column + '</td><td class="border px-4 py-2">' + types[index] + '</td></tr>';
        });
        tableHTML += '</table>';
        tableContainer.innerHTML = tableHTML;
    })
}

function getFirstN(){

    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
    tableHTML = '<table class="table-auto w-full border-collapse border border-gray-400 ">';

    let firstN = document.getElementById('first-n').value || 5;
    let rows = '';
    let headers = '<tr>';

    fetch(`http://127.0.0.1:5000/first?n=${firstN}`)
    .then(response => response.json())
    .then(data => {
        dataHeaders = Object.keys(data); // Get the headers of the data
        dataLen = dataHeaders[0].length;
        keys = Object.keys(data[dataHeaders[0]]);

        Object.keys(data).forEach(key => {
            headers += '<th>' + key + '</th>';
        }); // Create the headers of the table


        keys.forEach(key => {
            let row = '<tr>';
            dataHeaders.forEach(header => {
                row += '<td>' + data[header][key] + '</td>';
            })
            row += '</tr>';
            rows += row;
        });

        headers += '</tr>';
        tableHTML += headers;
        tableHTML += rows;
        tableHTML += '</table>';
        tableContainer.innerHTML = tableHTML;
    })
}

function getLastN(){
    
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
    tableHTML = '<table class="table-auto w-full border-collapse border border-gray-400 ">';

    let lastN = document.getElementById('last-n').value || 5;
    let rows = '';
    let headers = '<tr>';

    fetch(`http://127.0.0.1:5000/last?n=${lastN}`)
    .then(response => response.json())
    .then(data => {
        dataHeaders = Object.keys(data); // Get the headers of the data
        dataLen = dataHeaders[0].length;
        keys = Object.keys(data[dataHeaders[0]]);

        Object.keys(data).forEach(key => {
            headers += '<th>' + key + '</th>';
        }); // Create the headers of the table


        keys.forEach(key => {
            let row = '<tr>';
            dataHeaders.forEach(header => {
                row += '<td>' + data[header][key] + '</td>';
            })
            row += '</tr>';
            rows += row;
        });

        headers += '</tr>';
        tableHTML += headers;
        tableHTML += rows;
        tableHTML += '</table>';
        tableContainer.innerHTML = tableHTML;
    })
}

function getTableInfo(){
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
    tableHTML = '<table class="table-auto w-full border-collapse border border-gray-400 ">';
    let header = '<tr>';
    let rows = '';

    fetch('http://127.0.0.1:5000/info')
    .then(response => response.json())
    .then(data => {
        console.log('Getting table info...');

        headers = Object.keys(data);
        secondHeaders = Object.keys(data[headers[0]]);

        header += '<th>Column</th>';
        secondHeaders.forEach(h => {
            header += '<th>' + h + '</th>';
        })
        header += '</tr>';

        rows = '';
        for (index in data) {
            rows += '<tr><td class="border text-center">' + index + '</td>'
            values = data[index]
            for (value_key in values) {
                rows += '<td class="border text-center">' + values[value_key] + '</td>';
            }
        }
        tableHTML += header;
        tableHTML += rows;
        tableHTML += '</table>';
        tableContainer.innerHTML = tableHTML;
    })
}
 
function removeEmptyRows(){

    fetch('http://127.0.0.1:5000/clean')
    .then(response => response.json())
    .then(data => {
        console.log('Removing empty rows...');
        alert('Removed ' + data['removed_rows'] + ' empty rows');
    })
}

function setFeatures(){
    features = []
    const columnsSelect = document.getElementById('columnsSelect');
    const selectedColumn = columnsSelect.selectedOptions
    for (let i = 0; i < selectedColumn.length; i++) {
        features.push(selectedColumn[i].value);
    }
    
    
    fetch('http://127.0.0.1:5000/features', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'features': features
        })
    })
    .then(
        alert('Features set successfully')
    )
}

function trainModel(){

    model_type = document.getElementById('algorithmSelect').value;
    console.log('Model type:', model_type);

    fetch('http://127.0.0.1:5000/train',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'model_type': model_type
        })
    })
}

function normalizeData(){
    fetch('http://127.0.0.1:5000/normalize')
}


function showPredictor(){
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    let predictorHTML = '\
    <div class="input-container flex items-center mb-6">\
        <input type="text" id="gdpInput" class="input-field py-2 px-4 border border-gray-300 rounded mr-2" placeholder="Enter GDP values separated by commas">\
        <button id="predictButton" class="predict-button py-2 px-4 bg-blue-500 text-white font-semibold rounded" onclick="predictGDP()">Predict</button>\
    </div>\
    <div class="result-box w-64 h-16 flex items-center justify-center border border-gray-300 rounded">\
        <span id="resultText" class="result-text"></span>\
    </div>';
    tableContainer.innerHTML = predictorHTML;
}

function predictGDP() {
    let apiURL = 'http://127.0.0.1:5000/predict';

    gdpValues = document.getElementById('gdpInput').value;
    if (!validGdpString(gdpValues)) {
        document.getElementById('resultText').innerText = 'Invalid input. Please enter valid GDP values separated by commas';
        return;
    }


    fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'gdpValues': document.getElementById('gdpInput').value.split(',')
        })
    })
    .then(response => response.json())
    .then(data => {
        // console.log('Data:', data);
        document.getElementById('resultText').innerText = data.prediction;
    })
}

function validGdpString(gdpString) {
    const gdpValues = gdpString.split(',');
    
    if (gdpValues.length != 22) return false;
    else {
        for (let i = 0; i < gdpValues.length; i++) {
            if (isNaN(gdpValues[i])) return false;
        }
    }
    return true;
}