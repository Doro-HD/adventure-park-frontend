
import {
    fetchGetAllJSON
} from "../../apifetch.js"



export async function loadHtmlCard(page, organizer) {
    //fetches the card template
    const cardHtml = await fetch(page).then(r => {
      if (!r.ok) {
        throw new Error(`Failed to load the page: '${page}' `)
      }
      return r.text()
    });

    //fetches the organizer template. The divs that holds the outer structure of our cards
    const cardOrganizerHtml = await fetch(organizer).then(r => {
        if (!r.ok) {
          throw new Error(`Failed to load the page: cardorganizer.html`)
        }
        return r.text()
      });
  

    //Initate Domparser.
    const parser = new DOMParser();

    const organizerContent = parser.parseFromString(cardOrganizerHtml, "text/html")
    console.log(organizerContent)

    const cardContent = parser.parseFromString(cardHtml, "text/html")
    const cardDiv = cardContent.querySelector(".template")
    console.log(cardDiv)

  let newElement= document.createElement("div");
  let newElement2= document.createElement("div");
  newElement.innerHTML=cardDiv.outerHTML
  newElement2.innerHTML=cardDiv.outerHTML


let coolstring="bruh"

let whatever= `
<div class="template">
<div class="col">
    <div class="card shadow-sm">
        <img src="./staticcontent/Paintball.jpg" alt="Adventure park" width="100%" height="225">


        <div class="card-body">
            <p class="card-custom-header">${coolstring}</p>
            <p class="card-text">Spil paint</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a href="/aktiviteter" data-navigo>
                    <button type="button" class="btn btn-sm btn-outline-secondary" >Læs mere!
                  </a>
                    
                    </button>
                </div>
                <small class="text-muted">Ingen aldersgrænse</small>
            </div>
        </div>
    </div>
</div>
</div>` 




/*
  organizerContent.getElementById("card-holder").appendChild(newElement)
  organizerContent.getElementById("card-holder").appendChild(newElement2)
  */
  
   // organizerContent.getElementById("card-holder").innerHTML = cardDiv.outerHTML;
    organizerContent.getElementById("card-holder").innerHTML += whatever;
      
    console.log(organizerContent)
    const organizerDiv = organizerContent.querySelector(".template")


    




    /*  
    const organizerContent = parser.parseFromString(cardOrganizerHtml, "text/html")
    const organizerDiv = organizerContent.querySelector(".template")
    if (!organizerDiv) {
      throw new Error(`No outer div with class ".template" found in file '${organizer}'`)
    }

    //create all cards in loop
    const cardContent = parser.parseFromString(cardHtml, "text/html")
    const cardDiv = cardContent.querySelector(".template")
    if (!cardDiv) {
      throw new Error(`No outer div with class ".template" found in file '${page}'`)
    }
    console.log(cardDiv)

    const insertIntoDiv = organizerContent.getElementById("card-holder");
    insertIntoDiv.append = cardDiv;

    console.log(insertIntoDiv)


    const div = document.createElement("div");
    const node = document.createTextNode(cardDiv.outerHTML);
    div.appendChild(node);
    */

  
    return organizerDiv
  };


  export function renderTemplateForActivities(template, contentId) {
    const content = document.getElementById(contentId)
    if (!content) {
      throw Error("No Element found for provided content id")
    }
    content.innerHTML = ""
    content.append(template)
  }