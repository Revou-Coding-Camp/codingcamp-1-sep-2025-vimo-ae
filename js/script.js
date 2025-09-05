// Variable to store new item 
let to_do_list = []

// Validate Input Fields 
function validasi() {
    const activity=document.getElementById('to_do_activity').value;
    const when=document.getElementById('to_do_when').value;
    
    if (activity === '' || when === '') {
        alert('Betul-betul kau isi');
    }
    else {
        addtodo(activity, when);
    }
}

// Add Input to List 
function addtodo(list_activity, list_when) {
    // Add New Item to List 
    const item = {
        activity: list_activity,
        when: list_when,
        status: false
    };
    // Push new item to the list 
    to_do_list.push(item);

    //Render the list
    renderto_do_list();
}

function renderto_do_list() {
    const rendertdl = document.getElementById('to_do_list');
    rendertdl.innerHTML = '';

    to_do_list.forEach((list, idx) => {
        rendertdl.innerHTML += `
        <tr>
            <td style="text-align:center;"><input type="checkbox" onchange="toggleStatus(${idx})" ${list.status ? 'checked' : ''}></td>
            <td>${list.activity}</td>
            <td>${list.when}</td>
            <td>${list.status ? 'Complete' : 'Not Yet'}</td>
        `});
    }

// Fungsi untuk toggle status complete
function toggleStatus(idx) {
    to_do_list[idx].status = !to_do_list[idx].status;
    renderto_do_list(); }

//Remove all to-do list
function resettodo() {
    to_do_list = [];
    renderto_do_list();
}


// filter 
    const statusFilter = document.getElementById('statusFilter');

    function applyFilters() {
        const status = statusFilter.value;
        const tableBody = document.getElementById('to_do_list');
        const rows = tableBody.getElementsByTagName('tr');
        for (const row of rows) {
            const rowStatus = row.cells[3].textContent.toLowerCase();
            let showRow = true;
            if (status === 'complete' && !rowStatus.includes('complete')) showRow = false;
            if (status === 'notyet' && !rowStatus.includes('not yet')) showRow = false;
            // status 'all' tampilkan semua
            row.style.display = showRow ? '' : 'none';
        }
    }


    // Event listener untuk filter status
    statusFilter.addEventListener('change', applyFilters);

    // Toggle dropdown statusFilter saat tombol FILTER ditekan
    document.addEventListener('DOMContentLoaded', function() {
        var filterBtn = document.getElementById('button_filter');
        var statusFilter = document.getElementById('statusFilter');
        if (filterBtn && statusFilter) {
            filterBtn.addEventListener('click', function() {
                if (statusFilter.style.display === 'none' || statusFilter.style.display === '') {
                    statusFilter.style.display = 'inline-block';
                } else {
                    statusFilter.value = 'all';
                    statusFilter.style.display = 'none';
                    applyFilters(); // reset filter saat dropdown disembunyikan
                }
            });
        }
    });