import "https://unpkg.com/navigo"  //Will create the global Navigo object used below


import {
    setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./utils.js"


//import { initNavigate } from "./pages/navigate/navigate.js"
//import { showMatchObject } from "./pages/show-match/match.js"
//import { initUsers } from "./pages/users/users.js"
//import { initFindUser } from "./pages/findUser/findUser.js"

window.addEventListener("load", async () => {

  const templateGocart = await loadHtml("./pages/gocart/gocart.html")
  const templateHome = await loadHtml("./pages/home/home.html")
  const templateMinigolf = await loadHtml("./pages/minigolf/minigolf.html")
  const templatePaintball = await loadHtml("./pages/paintball/paintball.html")
  const templateWrestling = await loadHtml("./pages/sumoWrestling/sumoWrestling.html")
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")
  adjustForMissingHash()


    const router = new Navigo("/", {hash: true});
    //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
    window.router = router

    router
        .hooks({
            before(done, match) {
                setActiveLink("menu", match.url)
                done()
            }
        })
        .on({

          "/": () => {
            renderTemplate(templateHome, "content")
        },
            "/gocart": () => {
                renderTemplate(templateGocart, "content")
            },

            "/minigolf": () => {
                renderTemplate(templateMinigolf, "content")

            },
            "/paintball": (match) => {
                renderTemplate(templatePaintball, "content")

            },

            "/sumo": () => {
                renderTemplate(templateWrestling, "content")

            },

            "/show-match": (match) => {
                renderTemplate(templateMatch, "content")
                showMatchObject(match)
            }
        })
        .notFound(() => {
            renderTemplate(templateNotFound, "content")
        })
        .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
        + ' Column: ' + column + ' StackTrace: ' + errorObj);
}