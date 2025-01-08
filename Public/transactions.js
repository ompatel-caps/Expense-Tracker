// function addTransaction(e) {
//     e.preventDefault();

//     const description = document.getElementById('description').value;
//     const amount = parseFloat(document.getElementById('amount').value);
//     const type = document.getElementById('type').value;
//     const category = document.getElementById('category').value;

//     if (!description || isNaN(amount) || !type || category === 'none') {
//         alert('Please fill in all fields!');
//         return;
//     }

//     const transactions = getLocalStorage('transactions');
//     const newTransaction = {
//         id: Date.now(),
//         description,
//         amount,
//         type,
//         category,
//     };

//     transactions.push(newTransaction);
//     setLocalStorage('transactions', transactions);

//     document.getElementById('transactionForm').reset();
//     renderTransactions();
// }

// function renderTransactions() {
//     const transactions = getLocalStorage('transactions');
//     const transactionsList = document.getElementById('transactionsList');

//     transactionsList.innerHTML = transactions
//         .map(
//             (t) =>
//                 `<div class="transaction-item">
//                     <p>${t.description} - ₹${t.amount.toFixed(2)}</p>
//                     <p>Type: ${t.type}, Category: ${t.category}</p>
//                     <button class="delete-transaction" data-id="${t.id}">Delete</button>
//                 </div>`
//         )
//         .join('');

//     // Attach event listeners to delete buttons
//     const deleteButtons = document.querySelectorAll('.delete-transaction');
//     deleteButtons.forEach((button) => {
//         button.addEventListener('click', deleteTransaction);
//     });
// }

// function deleteTransaction(e) {
//     const transactionId = parseInt(e.target.getAttribute('data-id'));

//     let transactions = getLocalStorage('transactions');
//     transactions = transactions.filter((t) => t.id !== transactionId);

//     setLocalStorage('transactions', transactions);
//     renderTransactions();
// }

// document.addEventListener('DOMContentLoaded', renderTransactions);
// document.getElementById('transactionForm').addEventListener('submit', addTransaction);

// // Helper functions to interact with localStorage
// function getLocalStorage(key) {
//     const data = localStorage.getItem(key);
//     return data ? JSON.parse(data) : [];
// }

// function setLocalStorage(key, value) {
//     localStorage.setItem(key, JSON.stringify(value));
// }




// // Helper functions to interact with localStorage
// function getLocalStorage(key) {
//     const data = localStorage.getItem(key);
//     return data ? JSON.parse(data) : [];
// }

// function setLocalStorage(key, value) {
//     localStorage.setItem(key, JSON.stringify(value));
// }









// Helper functions to interact with localStorage
function getLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Global variables for managing scroll
let displayedTransactions = 0;
const transactionsPerLoad = 5; // Number of transactions to load per scroll

// Function to add a new transaction
function addTransaction(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;

    if (!description || isNaN(amount) || !type || category === 'none') {
        alert('Please fill in all fields!');
        return;
    }

    const transactions = getLocalStorage('transactions');
    const newTransaction = {
        id: Date.now(),
        description,
        amount,
        type,
        category,
    };

    transactions.push(newTransaction);
    setLocalStorage('transactions', transactions);

    document.getElementById('transactionForm').reset();
    resetTransactions(); // Reset the transactions list and reload from the start
}

// Function to render transactions dynamically
function renderTransactions() {
    const transactions = getLocalStorage('transactions');
    const transactionsList = document.getElementById('transactionsList');

    // Load a chunk of transactions
    const nextTransactions = transactions.slice(displayedTransactions, displayedTransactions + transactionsPerLoad);

    // Append transactions to the list
    nextTransactions.forEach((t) => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';

        transactionItem.innerHTML = `
            <p>${t.description} - ₹${t.amount.toFixed(2)}</p>
            <p>Type: ${t.type}, Category: ${t.category}</p>
            <button class="delete-transaction" data-id="${t.id}">Delete</button>
        `;

        transactionsList.appendChild(transactionItem);
    });

    // Update the displayed transactions count
    displayedTransactions += nextTransactions.length;

    // Attach event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-transaction');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', deleteTransaction);
    });
}

// Function to reset the transaction list
function resetTransactions() {
    displayedTransactions = 0;
    const transactionsList = document.getElementById('transactionsList');
    transactionsList.innerHTML = ''; // Clear the list
    renderTransactions(); // Reload from the start
}

// Function to handle scroll and load more transactions
function handleScroll() {
    const transactionsList = document.getElementById('transactionsList');

    if (transactionsList.scrollTop + transactionsList.clientHeight >= transactionsList.scrollHeight) {
        renderTransactions(); // Load the next chunk of transactions
    }
}

// Function to delete a transaction
function deleteTransaction(e) {
    const transactionId = parseInt(e.target.getAttribute('data-id'));

    let transactions = getLocalStorage('transactions');
    transactions = transactions.filter((t) => t.id !== transactionId);

    setLocalStorage('transactions', transactions);
    resetTransactions(); // Reset the list and reload from the start
}

// Initialize the transaction list and attach events
document.addEventListener('DOMContentLoaded', () => {
    resetTransactions(); // Initial load of transactions
    document.getElementById('transactionsList').addEventListener('scroll', handleScroll); // Attach scroll event
});

document.getElementById('transactionForm').addEventListener('submit', addTransaction);












// Update the dashboard with totals from transactions
function updateDashboard() {
    const transactions = getLocalStorage('transactions');

    // Calculate totals
    const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpense;

    // Update dashboard totals
    const incomeElement = document.getElementById('dashboardTotalIncome');
    const expenseElement = document.getElementById('dashboardTotalExpense');
    const balanceElement = document.getElementById('dashboardTotalBalance');

    if (incomeElement) {
        incomeElement.textContent = totalIncome.toFixed(2);
    }

    if (expenseElement) {
        expenseElement.textContent = totalExpense.toFixed(2);
    }

    if (balanceElement) {
        balanceElement.textContent = totalBalance.toFixed(2);
    }

    // Log to verify the data (can be removed after debugging)
    console.log(transactions); // This will output the transactions array to the console
}


