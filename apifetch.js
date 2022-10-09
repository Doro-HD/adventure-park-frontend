



  export async function fetchGetAllJSON() {
    const url = 'https://adventure-park-api.azurewebsites.net/api/activity'
    const all = await fetch(url).then(r => r.json())
    return all;

  }