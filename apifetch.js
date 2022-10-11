



  export async function fetchGetAllJSON() {
    const url = 'https://adventure-park-api.azurewebsites.net/api/activity'
    const all = await fetch(url).then(r => r.json())
    return all;

  }

  export async function fetchJsonById(id) {
    const url = 'https://adventure-park-api.azurewebsites.net/api/activity/' + id;
    const one = await fetch(url).then(r => r.json())
    console.log(one)
    return one;

  }