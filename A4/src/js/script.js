function changeTable(buttonIndex) {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';


    let firstN = document.getElementById('first-n').value || 5;
    let lastN = document.getElementById('last-n').value || 5;

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
        case 5:
            apiUrl = 'http://127.0.0.1:5000/predict';
            break;
        default:
            tableContainer.innerHTML = 'No data available';
            return;
    }


    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log('Data:', data);
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
                let rows = '';

                for (index in countries){
                    headers += '<th>' + countries[index] + '</th>';
                }

                for (index in data){
                    if (index != 'Country'){
                        row = '<tr class="border-2"><td class="border text-center">' + index + '</td>'
                        values = data[index];
                        console.log(values)
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
        }

        // if (buttonIndex === 0 || buttonIndex === 1) {
        //     // tableHTML += '<tr><th>Rows</th><th>Columns</th></tr>';
        //     // tableHTML += '<tr><td class="border px-4 py-2">' + data.rows + '</td><td class="border px-4 py-2">' + data.columns + '</td></tr>';
        // } else {
        //     data.forEach((item, index) => {
        //         if (index < 20) {
        //             tableHTML += '<tr>';
        //             for (const key in item) {
        //                 tableHTML += '<td class="border px-4 py-2">' + item[key] + '</td>';
        //             }
        //             tableHTML += '</tr>';
        //         }
        //     });
        // }
        
        tableHTML += '</table>';
        tableContainer.innerHTML = tableHTML;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        tableContainer.innerHTML = 'Error loading data';
    });
}