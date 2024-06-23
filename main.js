document.getElementById('searchbar').addEventListener('input', function (event) {
    sendSearchRequest(this.value);
});

getSearchParams();

function getSearchParams() {
    var searchBar = document.getElementById('searchbar');
    const searchParams = new URLSearchParams(location.search);
    let params = {};
    for (let param of searchParams) {
        params[param[0]] = param[1];
    }
    searchBar.value = params['r']
    sendSearchRequest(params['r']);

}

function sendSearchRequest(query) {

    var url = 'http://127.0.0.1/Api-TyroModFusion/result.php?itemResult=' + query;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data !== "err"){
                addNewMap(data)
            }
        })
        .catch(error => console.error('Error:', error));
}


function addNewMap(data) {

    var mapFusion = document.getElementById('fusion');
    mapFusion.innerHTML = null;

    data.forEach(fusion => {
        var mapFusion = document.getElementById('fusion');
        mapFusion.innerHTML += `
        <div class="map">
            <h4 class="tierName">Tier ${fusion.tier}</h4>
            <img class="item item1" src="textures/items/${fusion.item1}" title="${fusion.item1}" href="">
            <img class="item item2" src="textures/items/${fusion.item2}" title="${fusion.item2}">
            <img class="item itemResult" src="textures/items/${fusion.itemResult}" title="${fusion.itemResult}">
            <img class="item itemFuel" src="textures/items/${fusion.itemFuel}" title="${fusion.itemFuel}">
        </div>
        `;
    });
}
