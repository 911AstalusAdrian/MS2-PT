
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
        document.getElementById('uploadButton').classList.add('hidden');
        document.getElementById('additionalButtons').classList.remove('hidden');
        document.getElementById('tableContainer').classList.remove('hidden');
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

              // Extract the rows from the data
              const rows = data.map(row => {
                let rowData = '<tr>';
                Object.values(row).forEach(value => {
                    rowData += '<td>' + value + '</td>';
                });
                rowData += '</tr>';
                return rowData;
            });
    
            // Construct the table HTML
            tableHTML += '<thead><tr>';
            Object.keys(data[0]).forEach(key => {
                tableHTML += '<th>' + key + '</th>';
            });
            tableHTML += '</tr></thead>';
            tableHTML += '<tbody>';
            tableHTML += rows.join('');
            tableHTML += '</tbody>';
            tableHTML += '</table>';
    
            // Update the table container with the constructed HTML
            tableContainer.innerHTML = tableHTML;

        // Object.keys(data).forEach(key => {
            
        //     headers += '<th>' + key + '</th>';
        //     let row = '<tr>'

        //     values = data[key];
        //     console.log(values);

        //     Object.values(values).forEach(value => {
        //         row += '<td>' + value + '</td>';
        //     })
        //     row += '</tr>';
        //     rows += row;
        // });

        // headers += '</tr>';
        // tableHTML += headers;
        // tableHTML += rows;
        // tableHTML += '</table>';
        // tableContainer.innerHTML = tableHTML;


        // data = JSON.parse(data);

        // console.log('Getting first N rows...');
        // const table = document.createElement('table');
        // table.className = 'table-auto w-full border-collapse border border-gray-200';

        // // Create table header
        // const thead = document.createElement('thead');
        // const headerRow = document.createElement('tr');
        // Object.keys(data).forEach(key => {
        //     const th = document.createElement('th');
        //     th.className = 'border px-4 py-2';
        //     th.textContent = key;
        //     headerRow.appendChild(th);
        // });
        // thead.appendChild(headerRow);
        // table.appendChild(thead);

        // // Create table body
        // const tbody = document.createElement('tbody');
        // data.forEach(rowData => {
        //     const row = document.createElement('tr');
        //     Object.values(rowData).forEach(value => {
        //         const cell = document.createElement('td');
        //         cell.className = 'border px-4 py-2';
        //         cell.textContent = value;
        //         row.appendChild(cell);
        //     });
        //     tbody.appendChild(row);
        // });
        // table.appendChild(tbody);

        // tableContainer.appendChild(table);
    })
}

function getLastN(){}

function getTableInfo(){}
 

function changeTable(buttonIndex) {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';


    let firstN = document.getElementById('first-n').value || 5;
    let lastN = document.getElementById('last-n').value || 5;
    let rows = '';

    let apiURL;
    switch (buttonIndex) {
        case 0:
            apiUrl = 'http://127.0.0.1:5000/shape';
            break;
        case 1:
            apiUrl = 'http://127.0.0.1:5000/columns';
            break;
        case 2: {
            apiUrl = `http://127.0.0.1:5000/first?n=${firstN}`;
            break;
        }
        case 3: {
            apiUrl = `http://127.0.0.1:5000/last?n=${lastN}`;
            break;
        }
        case 4:
            apiUrl = 'http://127.0.0.1:5000/info';
            break;
        default:
            tableContainer.innerHTML = 'No data available';
            return;
    }


    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // console.log('Data:', data);
        let tableHTML = '<table class="table-auto w-full border-collapse border border-gray-400 ">';
        

        switch (buttonIndex) {
            case 0:
                tableHTML += '<tr><th>Rows</th><th>Columns</th></tr>';
                tableHTML += '<tr><td class="border px-4 py-2">' + data.rows + '</td><td class="border px-4 py-2">' + data.columns + '</td></tr>';
                break;
            case 1:
                tableHTML += '<tr><th>Columns</th><th>Data Type</th></tr>';
                columns = data.Columns;
                types = data.Type; 
                columns.forEach((column, index) => {
                    tableHTML += '<tr><td class="border px-4 py-2">' + column + '</td><td class="border px-4 py-2">' + types[index] + '</td></tr>';
                });
                break;
            case 2:
            case 3:
                countries = data.Country;
                let headers = '<tr><th>Year</th>';
                rows = '';

                for (index in countries){
                    headers += '<th>' + countries[index] + '</th>';
                }

                for (index in data){
                    if (index != 'Country'){
                        row = '<tr class="border-2"><td class="border text-center">' + index + '</td>'
                        values = data[index];
                        for (index in values){
                            row += '<td class="border text-center">' + values[index] + '</td>';
                        }
                        row += '</tr>';
                        rows += row;
                    }
                }
                headers += '</tr>';
                tableHTML += headers;
                tableHTML += rows;
                break;
            case 4:
                header = '<tr class="border-2"><th>Column</th><th>Count</th><th>Mean</th><th>Std</th><th>Min</th><th>25%</th><th>50%</th><th>75%</th><th>Max</th></tr>';
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
                break;
        }
        tableHTML += '</table>';
        tableContainer.innerHTML = tableHTML;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        tableContainer.innerHTML = 'Error loading data';
    });
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