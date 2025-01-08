document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profileForm');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const icon = document.querySelector('input[name="icon"]:checked').value;

      localStorage.setItem('userName', name);
      localStorage.setItem('userIcon', icon);

      window.location.href = 'dashboard.html';
    });
  });

  const userName = localStorage.getItem('userName');
  const userIcon = localStorage.getItem('userIcon');
  
  const userInfoContainer = document.getElementById('userInfo');
  if (userName && userIcon) {
    userInfoContainer.innerHTML = `
          <span class="fa-duotone fa-solid fa-font">Welcome  ${userName}</span>
      <span style="font-size: 2rem; margin-right: 10px;" >${userIcon}</span>
    `;
  } else {
    userInfoContainer.innerHTML = `<span>No user data available</span>`;
  }
  

 

            
// transactions


            



// Utility functions for localStorage for transaction page
function getLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


            

// function updateDashboard() {
//     const transactions = getLocalStorage('transactions');

//     // Calculate totals
//     const totalIncome = transactions
//         .filter((t) => t.type === 'income')
//         .reduce((sum, t) => sum + t.amount, 0);

//     const totalExpense = transactions
//         .filter((t) => t.type === 'expense')
//         .reduce((sum, t) => sum + t.amount, 0);

//     const totalBalance = totalIncome - totalExpense;

//     // Update dashboard totals
//     document.getElementById('dashboardTotalIncome').textContent = totalIncome.toFixed(2);
//     document.getElementById('dashboardTotalExpense').textContent = totalExpense.toFixed(2);
//     document.getElementById('dashboardTotalBalance').textContent = totalBalance.toFixed(2);

//     // Render charts
// //     renderIncomeExpenseChart(totalIncome, totalExpense);
// //     renderExpenseByCategoryChart(transactions);
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

//     // Update charts after rendering the transactions
//     updateCharts(transactions);
//     // console.log('Transactions:', getLocalStorage('transactions'));

// }

// function updateCharts(transactions) {
//     const incomeCategories = {};
//     const expenseCategories = {};

//     // Categorize transactions into income and expense categories
//     transactions.forEach((transaction) => {
//         if (transaction.type === 'income') {
//             incomeCategories[transaction.category] = (incomeCategories[transaction.category] || 0) + transaction.amount;
//         } else if (transaction.type === 'expense') {
//             expenseCategories[transaction.category] = (expenseCategories[transaction.category] || 0) + transaction.amount;
//         }
//     });

//     // Pie chart data (Expenses and Income)
//     const pieChartData = {
//         labels: ['Income', 'Expense'],
//         datasets: [{
//             data: [
//                 Object.values(incomeCategories).reduce((a, b) => a + b, 0), // Total Income
//                 Object.values(expenseCategories).reduce((a, b) => a + b, 0) // Total Expense
//             ],
//             backgroundColor: ['#4caf50', '#f44336'], // Green for Income, Red for Expense
//         }],
//     };

//     // Column chart data (Category-wise Income and Expense)
//     const columnChartData = {
//         labels: [...new Set([...Object.keys(incomeCategories), ...Object.keys(expenseCategories)])], // Unique categories
//         datasets: [{
//             label: 'Income',
//             data: Object.keys(incomeCategories).map((category) => incomeCategories[category] || 0),
//             backgroundColor: '#4caf50',
//         }, {
//             label: 'Expense',
//             data: Object.keys(expenseCategories).map((category) => expenseCategories[category] || 0),
//             backgroundColor: '#f44336',
//         }],
//     };

//     // Pie chart configuration
//     const pieChartConfig = {
//         type: 'pie',
//         data: pieChartData,
//     };

//     // Column chart configuration
//     const columnChartConfig = {
//         type: 'bar',
//         data: columnChartData,
//     };

//     // Render Pie chart
//     const pieChartContext = document.getElementById('pieChart').getContext('2d');
//     new Chart(pieChartContext, pieChartConfig);

//     // Render Column chart
//     const columnChartContext = document.getElementById('columnChart').getContext('2d');
//     new Chart(columnChartContext, columnChartConfig);
    
// }

// document.addEventListener('DOMContentLoaded', function () {
//     renderTransactions();
// });



// Helper function to interact with localStorage
function getLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

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

// Event listener to update dashboard on page load
document.addEventListener('DOMContentLoaded', updateDashboard);




// recent 
// Helper function to interact with localStorage
// Helper function to interact with localStorage
function getLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Global variables for transactions and scrolling
let transactions = [];
let displayedTransactions = 0;
const transactionsPerLoad = 5; // Number of transactions to load per scroll

// Update the dashboard with recent transactions (initial load and on scroll)
function updateRecentTransactions() {
    const recentTransactionsElement = document.getElementById('recentTransactions');

    // Load the next set of transactions
    const nextTransactions = transactions.slice(displayedTransactions, displayedTransactions + transactionsPerLoad);

    // Append the new transactions to the container
    nextTransactions.forEach((t) => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';

        transactionItem.innerHTML = `
            <div class="transaction-item ${t.type}">
                <div class="transaction-details">
                    <p><strong>${t.description}</strong> - ₹${t.amount.toFixed(2)}</p>
                    <p class="transaction-type">Type: <span>${t.type}</span></p>
                    <p class="transaction-category">Category: <span>${t.category}</span></p>
                </div>
            </div>
        `;

        recentTransactionsElement.appendChild(transactionItem);
    });

    // Update the number of displayed transactions
    displayedTransactions += nextTransactions.length;
}

// Scroll event listener to load more transactions when reaching the bottom
function handleScroll() {
    const recentTransactionsElement = document.getElementById('recentTransactions');
    
    // Check if the user has scrolled to the bottom of the container
    if (recentTransactionsElement.scrollTop + recentTransactionsElement.clientHeight >= recentTransactionsElement.scrollHeight) {
        updateRecentTransactions(); // Load more transactions
    }
}

// Initialize the page
function initializeTransactions() {
    transactions = getLocalStorage('transactions')
        .sort((a, b) => b.id - a.id); // Sort transactions by most recent

    const recentTransactionsElement = document.getElementById('recentTransactions');

    // Clear existing content
    recentTransactionsElement.innerHTML = '';

    // Initial load of transactions
    updateRecentTransactions();

    // Attach scroll event listener
    recentTransactionsElement.addEventListener('scroll', handleScroll);
}

// Event listener to initialize transactions on page load
document.addEventListener('DOMContentLoaded', initializeTransactions);



// progree bar

// Helper function to interact with localStorage
function getLocalStorage(transactions) {
    const data = localStorage.getItem(transactions);
    return data ? JSON.parse(data) : [];
}

// Update the dashboard progress bar
function updateProgressBar() {
    const transactions = getLocalStorage('transactions');

    // Calculate totals
    const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    // Prevent division by zero
    const percentage = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;

    // Update progress bar
    const progressBar = document.getElementById('expenseProgressBar');
    const progressText = document.getElementById('progressText');

    if (progressBar) {
        progressBar.style.width = `${Math.min(percentage, 100)}%`; // Cap at 100%
        progressText.textContent = `${percentage.toFixed(2)}% of income spent`;
    }
}

// Event listener to update the progress bar on page load
document.addEventListener('DOMContentLoaded', updateProgressBar);




// retrive balance

// Retrieve transactions from localStorage
window.onload = function() {
    const transactions = JSON.parse(localStorage.getItem('transactions'));
    
    // Check if the transactions exist and log to console for debugging
    if (!transactions) {
      console.error("No transactions found in localStorage");
    } else {
      let totalIncome = 0;
      let totalExpense = 0;
    
      // Loop through each transaction to calculate income and expense
      transactions.forEach(transaction => {
        if (transaction.type === "income") {
          totalIncome += transaction.amount;
        } else if (transaction.type === "expense") {
          totalExpense += transaction.amount;
        }
      });
    
      // Calculate total balance
      const totalBalance = totalIncome - totalExpense;
    
      // Log the calculated values to the console for debugging
      console.log("Total Income:", totalIncome);
      console.log("Total Expense:", totalExpense);
      console.log("Total Balance:", totalBalance);
    
      // Display the results on the webpage
      document.getElementById('total-balance').textContent = `Total Balance: ₹${totalBalance}`;
      document.getElementById('total-income').textContent = `Total Income: ₹${totalIncome}`;
      document.getElementById('total-expense').textContent = `Total Expense: ₹${totalExpense}`;
    }
    
    };


    const myModal = document.getElementById('myModal')
    const myInput = document.getElementById('myInput')
    
    myModal.addEventListener('shown.bs.modal', () => {
      myInput.focus()
    })



    const apiKey = 'b31803f50b9c404d976e3cdf9c988be1';
    const endpoint = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`;

    // Fetching the latest exchange rates
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const baseCurrency = data.base;
            const usdToGbp = data.rates.GBP; // USD to GBP rate
            const usdToEur = data.rates.EUR; // USD to EUR rate

            const output = `
                <p><strong>Base Currency:</strong> ${baseCurrency}</p>
                <p><strong>USD to GBP:</strong> ${usdToGbp}</p>
                <p><strong>USD to EUR:</strong> ${usdToEur}</p>
            `;
            document.getElementById('rates').innerHTML = output;
        })
        .catch(error => {
            document.getElementById('rates').innerHTML = '<p>Error fetching exchange rates.</p>';
            console.error('Error:', error);
        });