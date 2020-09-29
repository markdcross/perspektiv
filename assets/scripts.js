


const form = document.querySelector('#js-search-form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    // prevent page from reloading when form is submitted
    event.preventDefault();
    // get the value of the input field
    const inputValue = document.querySelector('#js-search-input').value;
    // remove whitespace from the input
    const searchQuery = inputValue.trim();
    // print `searchQuery` to the console
    console.log(searchQuery);
    searchWikipedia(searchQuery);
/*
    try {
  
        const results = await searchWikipedia(searchQuery);
    
        console.log(results);
    
      } catch (err) {
    
        console.log(err);
    
        alert('Failed to search wikipedia');
    
    }
    */
}


// searching wikipedia
async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    $.ajax({
        url: endpoint,
        method: "get"
    }).then(function(response){
        console.log(response);
    });

    /*
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    console.log(json);
*/

}



  

