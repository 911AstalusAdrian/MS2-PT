let datasetColumns = [];

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
        document.getElementById('datasetInfo').classList.remove('hidden');
        document.getElementById('numRowsCols').innerText = `Rows: ${data.rows}, Columns: ${data.cols}`;
        document.getElementById('columnNames').innerText = `Columns: ${data.columns.join(', ')}`;
        datasetColumns = data.columns;
        populateTable('firstRows', data.first_rows, datasetColumns);
        populateTable('lastRows', data.last_rows, datasetColumns);
        document.getElementById('basicStats').innerText = JSON.stringify(data.stats, null, 2);

        document.getElementById('featureSelection').classList.remove('hidden');
        const featuresDiv = document.getElementById('features');
        featuresDiv.innerHTML = '';
        data.columns.forEach(col => {
            const label = document.createElement('label');
            label.className = 'block mr-4 mb-2';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = col;
            checkbox.className = 'mr-2';
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(col));
            featuresDiv.appendChild(label);
        });
    })
    .catch(error => console.error('Error uploading CSV:', error));
}

function populateTable(tableId, rows, columns) {
    const table = document.getElementById(tableId);
    table.innerHTML = '';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    columns.forEach(col => {
        const th = document.createElement('th');
        th.className = 'border px-4 py-2';
        th.innerText = col;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        columns.forEach(col => {
            const td = document.createElement('td');
            td.className = 'border px-4 py-2';
            td.innerText = row[col];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
}

function removeEmptyRows() {
    fetch('/remove_empty', { method: 'POST' })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => console.error('Error removing empty rows:', error));
}

function transformData() {
    const selectedColumns = Array.from(document.querySelectorAll('#features input:checked'))
                                 .map(input => input.value);
    fetch('/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ columns: selectedColumns })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('modelTraining').classList.remove('hidden');
        document.getElementById('modelPrediction').classList.remove('hidden');
    })
    .catch(error => console.error('Error transforming data:', error));
}

function trainRegression() {
    fetch('/train_regression', { method: 'POST' })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => console.error('Error training regression model:', error));
}

function trainClassification() {
    fetch('/train_classification', { method: 'POST' })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => console.error('Error training classification model:', error));
}

function trainClustering() {
    fetch('/train_clustering', { method: 'POST' })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => console.error('Error training clustering model:', error));
}

function makePrediction() {
    const inputData = {};  // Collect input data for prediction
    // Assume you have input fields for each feature to collect data
    datasetColumns.forEach(col => {
        const input = document.querySelector(`#predictionForm input[name="${col}"]`);
        if (input) {
            inputData[col] = input.value;
        }
    });
    fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('predictionResult').innerText = `Prediction: ${data.result}`;
    })
    .catch(error => console.error('Error making prediction:', error));
}