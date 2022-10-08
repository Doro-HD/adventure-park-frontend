export function renderTemplateForActivities(template, contentId) {
    const content = document.getElementById(contentId)
    if (!content) {
      throw Error("No Element found for provided content id")
    }
    content.innerHTML = ""
    content.append(template)
  }

  

  export async function fetchGetAllJSON() {
    const url = 'https://adventure-park-api.azurewebsites.net/api/activity'
    const response = await fetch(url);
    const activities = await response.json();
    return activities;

  }