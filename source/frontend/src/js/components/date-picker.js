// July 9, 2021
var dates = ["0","1", "2","3","4","5","6","7","8","9","10","11","12","13", "14", "15", "16", "17", "18", "19",
"20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]; 

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

 
export default class DatePicker extends HTMLElement{ 
    myDate = new Date(); 
    year = myDate.getFullYear();
    month = myDate.getMonth();
    day = myDate.getDay();
    date = myDate.getDate(); 

    dateText = months[month] + " " + dates[date] +  ", "  + year


    constructor(){ 
        myDate = new Date(); 
        year = myDate.getFullYear();
        month = myDate.getMonth();
        day = myDate.getDay();
        date = myDate.getDate(); 
    
        dateText = months[month] + " " + dates[date] +  ", "  + year
        
        super(); 

         const template = document.createElement("template"); 
         this.attachShadow({mode: "open"}); 
    

         template.innerHTML =  `
            <style>
            .full-date {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }
            </style>
        
            <div class ="full-date">
                
                <i class='fas fa-angle-left fa-pull-left' id="prev"> &lt;</i>
                <div id="date"></div>
                <i class='fas fa-angle-right' id="next"> &gt; </i>
        
            </div>
         `
  
         this.shadowRootRoot.appendChild(template.content.cloneNode(true)); 

         document.getElementById("date").innerText = dateText; 
         //dateText;
         
         this.shadowRootRoot.getElementById("next").addEventListener("click", next);
         this.shadowRootRoot.getElementById("prev").addEventListener("click", prev);

     }

     expandComponent(e){ 
         var content = e.nextElementSibling; 
         if(content.style.maxHeight){ 
             content.style.maxHeight = null; 
         }else{ 
             content.style.maxHeight = content.scrollHeight + "px"; 
         }
     }

       
 next() {
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
 
  prev() {
   myDate = new Date(myDate - 86400000);
   year = myDate.getFullYear(),
   month = myDate.getMonth(),
   day = myDate.getDay(),
   date = myDate.getDate();
 //  var dateText = days[day]+ "," + " "+ dates[date] + " "+ "of" + " " + months[month] +  " "  + year
 var dateText = months[month] + " " + dates[date] +  ", "  + year
 
 document.getElementById("date").innerHTML = dateText;
 }
 
 } 

 customElements.define('date-picker', DatePicker); 
