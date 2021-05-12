let template; 
let img = document.createElement("img");
document.addEventListener('DOMContentLoaded', ()=>{ 

    //Create the component in the DOM 
    template = document.createElement('entry-creator'); 

    //Grab the main block and append
    let mainB = document.getElementsByTagName('main'); 
    mainB[0].appendChild(template); 

    //Assign id to created component
    template.id = "entryTemplate"; 

    //Obtain form from the shadow root of cretaed component
    let entryForm = document.getElementById("entryTemplate").shadowRoot.getElementById("entryCreator"); 
    
    //Send the entry from the form to textbox
    entryForm.addEventListener('submit', (event) =>{
        event.preventDefault(); 

        let textBox = document.getElementById("textWrapper");
        let entry = template.createEntry(); 
        
        let newEntry = document.createElement("p"); 

        let bullet;
        let choices = document.getElementById("entryTemplate").shadowRoot.querySelectorAll("input[name='entryType']"); 
        for (const choice of choices) { 
            if (choice.checked){ 
                bullet = choice.value; 
            }
        }

        //Puts the bullet point infront of the journal entry
        //TODO: Find better looking bullets
        switch(bullet) {
            case "task":
                newEntry.innerHTML = "☐ " + entry.content;
                break;
            case "event": //TODO: get a better empty bullet point symbol
                newEntry.innerHTML = "○ " + entry.content;
                break;
            case "note":
                newEntry.innerHTML = "\u2022 " + entry.content; 
                break;
        }

        //Only showing the text and picture right now **TODO** 
        textBox.appendChild(newEntry);

        if(img.alt != "") {
            textBox.appendChild(img);

        } 

        entryForm.reset(); 
        img = document.createElement("img");
    });

    //Obtain userImage from the shadow root of created component
    let userImage = document.getElementById("entryTemplate").shadowRoot.getElementById("image-input");

    //updates img variable with chosen image from user
    userImage.addEventListener("change", () => {

        let picture = userImage.files[0];
        
        img.src = URL.createObjectURL(picture);
        //console.log("From scripts.js " + img.src);
        img.alt = userImage.value;

        //TODO: adjust picture size based on the resolution of picture cause these resolution make some pics wacky 
        img.style.height = '300px';
        img.style.width = '390px';
    });
        
}); 



