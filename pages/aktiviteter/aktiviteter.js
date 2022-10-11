import {
    fetchGetAllJSON, fetchJsonById
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

        let cardConstruct = `
  <div class="template">
  <div class="col">
      <div class="card shadow-sm">
          <img src="./staticcontent/adventureparkcard.png" alt="Adventure park" width="100%" height="225">
  
  
          <div class="card-body">
              <p class="card-custom-header">${headerName}</p>
              <p class="card-text">${description}</p>
              <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                  <a href="/aktiviteter/${headerId}" data-navigo>
                    
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


export async function loadActivitySubpage(urlId) {

    let activityObject = await fetchJsonById(urlId);

    let headerName = activityObject.name;
    let headerId = activityObject.id;
    let description = activityObject.description;
    let ageRestriction = activityObject.ageRestriction;

    let cardConstruct = `
  <div class="template">
    <div id="picture-header">
        <section class="py-5 text-center container">
  
            <img src="../../staticcontent/adventureparkcard.png" alt="Adventure park" width="700" height="300">
            <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light">${headerName}</h1>
                <p class="lead text-muted">${description}
                    </p>
  
            </div>
        </section>
    </div>
  </div>`


    return document.getElementById("content").innerHTML = cardConstruct;
};


export function renderTemplateForActivities(template, contentId) {
    const content = document.getElementById(contentId)
    if (!content) {
        throw Error("No Element found for provided content id")
    }
    content.innerHTML = ""
    content.append(template)
}