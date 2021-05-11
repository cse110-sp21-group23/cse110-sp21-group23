var myDate = new Date(),
    year = myDate.getFullYear(),
    month = myDate.getMonth(),
    day = myDate.getDay(),
    date = myDate.getDate()

// July 9, 2021
var dates = ["0","1", "2","3","4","5","6","7","8","9","10","11","12","13", "14", "15", "16", "17", "18", "19",
    "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"] 

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

var dateText = months[month] + " " + dates[date] +  ", "  + year

document.getElementById("date").innerText = dateText; 
//dateText;
  
  document.getElementById("next").addEventListener("click", next);
  document.getElementById("prev").addEventListener("click", prev);
  
function next() {
   myDate =new Date(myDate.getFullYear(),myDate.getMonth(),myDate.getDate()+1);
   //myDate = new Date(myDate + 86400000);
    year = myDate.getFullYear(),
    month = myDate.getMonth(),
    day = myDate.getDay(),
    date = myDate.getDate();
    //var dateText = days[day]+ "," + " "+ dates[date] + " "+ "of" + " " + months[month] +  " "  + year
    var dateText = months[month] + " " + dates[date] +  ", "  + year

    document.getElementById("date").innerHTML = dateText;
    
}

function prev() {
  myDate = new Date(myDate - 86400000);
  year = myDate.getFullYear(),
  month = myDate.getMonth(),
  day = myDate.getDay(),
  date = myDate.getDate();
//  var dateText = days[day]+ "," + " "+ dates[date] + " "+ "of" + " " + months[month] +  " "  + year
var dateText = months[month] + " " + dates[date] +  ", "  + year

document.getElementById("date").innerHTML = dateText;
}
