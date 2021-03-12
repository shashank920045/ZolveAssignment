# ZolveAssignment
Zolve BarChart Assignemnt


Please install chart2.jjs using this command 

npm install --save react-chartjs-2 chart.js


I have called 2 components from App Component - BarChart Component and CopyText Component.

BarChart uses chart2.js from which we can construct a Bar Chart. All we do is pass the data from App Component.
During Component Mount we fetch the data using the url and save it itn state.
We also have a form which collects the data and fetches the data on submit. Then it is passed to BarChart Component.

CopyText Component uses URL.SearchParams function to get the Url Parameters.

