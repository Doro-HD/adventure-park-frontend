
function getContent(){
                //Måske med apostrof
    const url = "https://adventure-park-api.azurewebsites.net/api/activity";

    fetch(url)
        .then(res => res.json())


}

