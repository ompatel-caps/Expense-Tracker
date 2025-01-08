const data = JSON.parse(localStorage.getItem('transactions'));

// Step 1: Retrieve data from localStorage (Example data here)
// const data = [
//   { id: 1735500992440, description: "water", amount: 2323, type: "income", category: "salary" },
//   { id: 1735500992441, description: "rent", amount: 1500, type: "expense", category: "housing" },
//   { id: 1735500992442, description: "groceries", amount: 800, type: "expense", category: "food" }
// ];

// Process the data into sums by category
const categoryTotals = {};
data.forEach(item => {
  if (!categoryTotals[item.category]) {
    categoryTotals[item.category] = 0;
  }
  categoryTotals[item.category] += item.amount;
});

// Prepare data for the pie chart
const pieChartData = {
  labels: Object.keys(categoryTotals),
  datasets: [{
    data: Object.values(categoryTotals),
    backgroundColor: ['#FF5733', '#F9E4A5', '#3357FF'],
    hoverBackgroundColor: ['#FF4C30', '#30FF4C', '#3034FF'],
  }],
};

// Process the data into sums by category
const incomeexpTotals = {};
data.forEach(item => {
  if (!incomeexpTotals[item.type]) {
    incomeexpTotals[item.type] = 0;
  }
  incomeexpTotals[item.type] += item.amount;
});

// Prepare data for the bar chart
const barChartData = {
  labels: Object.keys(incomeexpTotals),
  datasets: [{
    label: 'Amount',
    data: Object.values(incomeexpTotals),
    backgroundColor: '#F9E4A5',
    borderColor: '#F9E4A5',
    borderWidth: 1
  }],
};

// Create the pie chart
const ctxPie = document.getElementById('myPieChart').getContext('2d');
const myPieChart = new Chart(ctxPie, {
  type: 'pie',
  data: pieChartData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      }
    }
  }
});

// Create the bar chart
const ctxBar = document.getElementById('myBarChart').getContext('2d');
const myBarChart = new Chart(ctxBar, {
  type: 'bar',
  data: barChartData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend if not needed
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true, // Start the x-axis at zero
      },
      y: {
        beginAtZero: true, // Start the y-axis at zero
      }
    }
  }
});