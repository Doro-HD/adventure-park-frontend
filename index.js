import "https://unpkg.com/navigo"  //Will create the global Navigo object used below


import {
    setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./utils.js"

import {
    fetchGetAllJSON
} from "./apifetch.js"

//import { initNavigate } from "./pages/navigate/navigate.js"
//import { showMatchObject } from "./pages/show-match/match.js"
//import { initUsers } from "./pages/users/users.js"
//import { initFindUser } from "./pages/findUser/findUser.js"

window.addEventListener("load", async () => {

  const templateAktiviteter = await loadHtml("./pages/aktiviteter/aktiviteter.html")
  const templateHome = await loadHtml("./pages/home/home.html")
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
            "/aktiviteter": () => {
                renderTemplate(templateAktiviteter, "content")
                console.log(fetchMoviesJSON().then(movies => {
                    movies; // fetched movies
                  }))

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