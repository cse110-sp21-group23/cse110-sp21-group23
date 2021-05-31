import { login, register } from '../../api/user'
import { getJournals, getBulletsByDay, addBullet, deleteBullet, editBullet } from '../../api/journal'

import WeeklyComponent from '../weekComponent'
export class DefaultPage extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        const template = document.createElement("template");
        this.attachShadow({ mode: "open" })
        template.innerHTML = (`
            <div id="defaultPageDiv">
                <h1>yeet</h1>
                <button name="toDailyPage"></button> 
                <label for="toDailyPage"> Go to daily page </label> 
            </div>

            <div class="piechart"></div>
            <style>
            .piechart {
                margin-top: 300px;
                display: block;
                position: absolute;
                width: 400px;
                height: 400px;
                border-radius: 50%;
                background-image: conic-gradient(
                    pink 70deg, 
                    lightblue 0 235deg, 
                    orange 0);
            }
    
            body,
            .piechart {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            </style>

            <script src="https://cdn.anychart.com/js/8.0.1/anychart-core.min.js"></script>
            <script src="https://cdn.anychart.com/js/8.0.1/anychart-pie.min.js"></script>
            <div id="container"></div>
            <style>
            html, body, #container {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
            }
            </style>
            <script>
                anychart.onDocumentReady(function(){
                    // set the data
                    var data = [
                        {x: "White", value: 223553265},
                        {x: "Black or African American", value: 38929319},
                        {x: "American Indian and Alaska Native", value: 2932248},
                        {x: "Asian", value: 14674252},
                        {x: "Native Hawaiian and Other Pacific Islander", value: 540013},
                        {x: "Some Other Race", value: 19107368},
                        {x: "Two or More Races", value: 9009073}
                    ];
                    // create the chart
                    var chart = anychart.pie();

                    // set the chart title
                    chart.title("Mood traker");

                    // add the data
                    chart.data(data);

                    // display the chart in the container
                    chart.container('container');
                    chart.draw();
                    });
            </script>
        `)
        
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        editBullet({
            "id": 6,
            "journal_id": 7,
            "body": "yoooooooot",
            "type": "task",
            "is_done": false,
            "priority": 2,
            "mood": 1,
            "date": "2021-03-29T07:00:00.000Z",
            "created_at": "2021-05-21T05:26:39.492Z",
            "updated_at": "2021-05-21T05:34:08.907Z"
        }).then(data => {
            console.log("Data: ", data)
        }).catch(err => {
            
        })
        //Event handler to get to daily page
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            window.location = "dailyPage"
        });
    }
}

customElements.define('default-page', DefaultPage);
