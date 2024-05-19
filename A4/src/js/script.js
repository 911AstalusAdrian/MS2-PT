function changeTable(buttonIndex) {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';

    let apiURL;
    switch (buttonIndex) {
        case 0:
            apiUrl = 'http://127.0.0.1:5000/shape';
            break;
        case 1:
            apiUrl = 'http://127.0.0.1:5000/columns';
            break;
        case 2: {
            const inputValue = document.getElementById('input-3').value || 5; // Set a default value
            apiUrl = `http://127.0.0.1:5000/first`;
            break;
        }
        case 3: {
            const inputValue = document.getElementById('input-4').value || 5; // Set a default value
            apiUrl = `http://127.0.0.1:5000/last`;
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
        let tableHTML = '<table class="table-auto w-full border-collapse border border-gray-400">';
        
        if (buttonIndex === 0) {
            tableHTML += '<tr><td class="border px-4 py-2">' + data.title + '</td><td class="border px-4 py-2">' + data.body + '</td></tr>';
        } else {
            data.forEach((item, index) => {
                if (index < 20) {
                    tableHTML += '<tr>';
                    for (const key in item) {
                        tableHTML += '<td class="border px-4 py-2">' + item[key] + '</td>';
                    }
                    tableHTML += '</tr>';
                }
            });
        }
        
        tableHTML += '</table>';
        tableContainer.innerHTML = tableHTML;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        tableContainer.innerHTML = 'Error loading data';
    });

    // let tableHTML = '<table class="table-auto w-full border-collapse border border-gray-400">';
    // if (buttonIndex === 0) {
    //     tableHTML += '<tr><td class="border px-4 py-2">Cell 1</td><td class="border px-4 py-2">Cell 2</td></tr>';
    // } else if (buttonIndex === 1) {
    //     for (let i = 0; i < 20; i++) {
    //         tableHTML += '<tr><td class="border px-4 py-2">Row ' + (i + 1) + ' Cell 1</td><td class="border px-4 py-2">Row ' + (i + 1) + ' Cell 2</td><td class="border px-4 py-2">Row ' + (i + 1) + ' Cell 3</td></tr>';
    //     }
    // }
    // // Add more conditions for other buttons as needed
    // tableHTML += '</table>';

    // tableContainer.innerHTML = tableHTML;
}