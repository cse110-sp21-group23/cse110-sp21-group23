// let template; 

// document.addEventListener("DOMContentLoaded", () => {

//     // Create weekly component element
//     template = document.createElement("weekly-component");
//     template.id = "componentTemplate";

//     // Add component to main
//     let mainBody = document.getElementsByTagName("main"); 
//     mainBody[0].appendChild(template);

//     // Get the button to make collapsible
//     let component = document.getElementById("componentTemplate").shadowRoot.querySelector(".collapsible");

//     // Make button collapsible
//     component.addEventListener('click', () => {

//         // Get content (bullets) of weekly component
//         let content = component.nextElementSibling;
        
//         // Expand component if not expanded, and close component if already expanded
//         if (content.style.maxHeight) {
//             content.style.maxHeight = null;
//         }
//         else {
//             content.style.maxHeight = content.scrollHeight + 'px';
//         }
//     });       
// }); 