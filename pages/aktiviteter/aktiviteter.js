
import {
    fetchGetAllJSON
} from "../../apifetch.js"



export async function loadHtmlCard(organizer) {


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


let activityArray = await fetchGetAllJSON();


activityArray.forEach((result, id) => {
  let headerName = activityArray[id].name;
  let headerId = activityArray[id].id;
  let description = activityArray[id].description;
  let ageRestriction = activityArray[id].ageRestriction;

  let cardConstruct= `
  <div class="template">
  <div class="col">
      <div class="card shadow-sm">
          <img src="./staticcontent/adventureparkcard.png" alt="Adventure park" width="100%" height="225">
  
  
          <div class="card-body">
              <p class="card-custom-header">${headerName}</p>
              <p class="card-text">${description}</p>
              <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                  <a href="/aktiviteter/${id}" data-navigo>Aktiviteter
                    
                      <button type="button" class="btn btn-sm btn-outline-secondary" >Læs mere!
                    </a>
                      
                      </button>
                  </div>
                  <small class="text-muted">Aldersgrænsen er ${ageRestriction} år</small>
              </div>
          </div>
      </div>
  </div>
  </div>`
  

  organizerContent.getElementById("card-holder").innerHTML += cardConstruct;
    

});

    const organizerDiv = organizerContent.querySelector(".template")
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