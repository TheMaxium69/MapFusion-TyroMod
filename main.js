document.getElementById('searchbar').addEventListener('input', function (event) {
    sendSearchRequest(this.value);
});

function sendSearchRequest(query) {
    // Please replace URL with your API endpoint
    var url = 'http://127.0.0.1/Api-TyroModFusion/result.php?itemResult=' + query;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Process the data
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
}