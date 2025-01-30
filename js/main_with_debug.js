// this declares an array object that will represnt cities, which contains city, the name and population, the population of the city
var cityPop = [
    { 
        city: 'Madison',
        population: 233209
    },
    {
        city: 'Milwaukee',
        population: 594833
    },
    {
        city: 'Green Bay',
        population: 104057
    },
    {
        city: 'Superior',
        population: 27244
    }
];
// this is a function that takes the cityPop array and will add columns to a table
function addColumns(cityPop) {
	// this will selecat all tables rows in the document 
    document.querySelectorAll("tr").forEach(function (row, i) { // the .forEach method will iterate each rpw 
        if (i === 0) { // this checks if its the current row is the first row
            row.insertAdjacentHTML("beforeend", "<th>City Size</th>"); // when its the first row it will add a header row
        } else { // otherwise this happens if i is not 0
            var citySize;  // this declars a variable that will be used to hold the size of the city
            // this if statement determins the size of the city based on the population from cityPop
            if (cityPop[i - 1].population < 100000) { // if the pop is less than 100,000 it will be assigned small
                citySize = "Small";
            } else if (cityPop[i - 1].population < 500000) { // pop that are less than 500,000 but larger than 100,000 are medium
                citySize = "Medium";
            } else { // this is then if the population is 500,000 or larger will be citySize of large
                citySize = "Large";
            }

            row.insertAdjacentHTML("beforeend", "<td>" + citySize + "</td>"); // this adds a new data cell the the current row with city Size added
        }
    });
}
// this function adds mouse and clicke event listeners to the table
function addEvents() {
    // Add mouseover event to the table
    document.querySelector("table").addEventListener("mouseover", function () { // this triggers the funciton when a mouse hoovers over the table
        var color = "rgb("; //  this intializes a string for an RBG color value

        for (var i = 0; i < 3; i++) { // loop that occurs three times that will genrate the random color of the background
            var random = Math.round(Math.random() * 255); // generates a number value for the RBG color
            color += random; // adds the ramdom number to the RBG string

            if (i < 2) { // will add a comma between the values if there are less two values
                color += ",";
            } else { // if there are 2 valyes already this will just add the closing ) after the last vlaue
                color += ")";
            }
        }

        // Set the table background color
        document.querySelector("table").style.backgroundColor = color;
    });

    // Define the clickme function
    function clickme() { // this is a function that when you click on the table and alert will pop up
        alert("Hey, you clicked me!");
    }

    // Add click event to the table, which triggers the clickme function
    document.querySelector("table").addEventListener("click", clickme);
}

// Function that create a table and populates it with the city data
function createTable(cityPop) {
    var table = document.createElement("table"); // create a table element and assigns it to table
    var headerRow = document.createElement("tr"); // adds a row for header and assigns it to headerRow
    headerRow.innerHTML = "<th>City</th><th>Population</th>"; // adds the headers 'City' and 'Population' to the header row
    table.appendChild(headerRow); // appends the header row to the table

    for (var i = 0; i < cityPop.length; i++) { // loops through the cityPop and create a new row for each city
        var row = document.createElement("tr"); // code to actually create that row
        row.innerHTML = "<td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td>"; // fills the tow with the city's name and pop
        table.appendChild(row); // this appends the row to the table
    }

    document.body.appendChild(table); // this will then add the table to the webpage
}

// Create the table, add columns, and set up events
createTable(cityPop); // calls the function to create the table with the city and population data
addColumns(cityPop); // calls the function that will add the City Size to the table
addEvents(); // calls the fuction that adds mousover and click events to the crated table


// this is a function that accepts one argument 'myData' which is GeoJSON data passed from a fetch operation
function debugCallback(myData){
    console.log("GeoJSON data loaded:", myData) // line logs the message to the console, which helps to verify the data is loaded correctly
    // document.querySelector selects the DOM element with this id in the HTML
    // .insertAdjacentHTML adds the string version to the  of the myData 
    // JSON.stringify(myData) converts the object to JSON string so it can be displayed on the webpage properly
    document.querySelector("#mydiv").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(myData))
};

// this is a function that is responsible for fetching the GeoJSON data
function debugAjax(){
    // declares the variable myData
    var myData;
    // fetch request for the MegaCities.geojson from the data folder
    fetch("data/MegaCities.geojson")
    // this hadles the response from the fetch request
        .then(function(response){  
            return response.json(); // converts the response to a JavaScript object
        })
        .then(debugCallback) //calls the debugCallBack function and pass the JSON data with it (myData)

};
// calls the debugAjax function, truggering the fetch request and once loaded the debugCallBack function is executed, the data will then be displayed
debugAjax()