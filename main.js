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
    if (params['r'] !== undefined){

        searchBar.value = params['r']
        sendSearchRequest(params['r']);
    }

}

function sendSearchRequest(query) {

    // var url = 'http://127.0.0.1/Api-TyroModFusion/result.php?itemResult=' + query;
    var url = 'http://vps214.tyrolium.fr/api-fusion/result.php?itemResult=' + query;

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

    var mapFusion = document.getElementById('fusionResult');
    mapFusion.innerHTML = null;

    var mapFusionI = document.getElementById('fusionImplication');
    mapFusionI.innerHTML = null;

    var infoItem = document.getElementById('infoItem');
    infoItem.innerHTML = null;



    var i = 1;

    data.forEach(reponse => {
        if (i == 1) {

            infoItem.style.background = "#e0e0e0"

            infoItem.innerHTML += `
            <div id="firstInfoItem">
                <img class="itemInfo" src="textures/items/${reponse['name']}.png">
            </div>
            <div id="secondInfoItem">
                <h3>${reponse['name']} <span>#${reponse['tyroid']}</span></h3>
                <p>Tier : ${reponse['tier']}</p>
                <p>Version : ${reponse['version']}</p>
                <p>Nombre de Fusion : ${reponse['fusion_count']}</p>
                <p>Combustible : ${reponse['isFuel']}</p>
            </div>
            `;


        } else if (i == 2) {

            if (reponse.length !== 0){

                mapFusion.innerHTML += `
                    <h3>Obtention</h3>
                `;

                reponse.forEach(fusion => {

                    mapFusion.innerHTML += `
                <div class="map">
                    <h4 class="tierName">Tier ${fusion.tier}</h4>
                    <img class="item item1" src="textures/items/${fusion.item1}" title="${fusion.item1}" onclick="window.location.href = '?r=${fusion.item1}';">
                    <img class="item item2" src="textures/items/${fusion.item2}" title="${fusion.item2}" onclick="window.location.href = '?r=${fusion.item2}';">
                    <img class="item itemResult" src="textures/items/${fusion.itemResult}" title="${fusion.itemResult}" onclick="window.location.href = '?r=${fusion.itemResult}';">
                    <img class="item itemFuel" src="textures/items/${fusion.itemFuel}" title="${fusion.itemFuel}" onclick="window.location.href = '?r=${fusion.itemFuel}';">
                </div>
                `;

                });

            }

        } else if (i == 3) {


            if (reponse.length !== 0){

                mapFusionI.innerHTML += `
                    <h3>Usage</h3>
                `;

                reponse.forEach(fusion => {

                    mapFusionI.innerHTML += `
                <div class="map">
                    <h4 class="tierName">Tier ${fusion.tier}</h4>
                    <img class="item item1" src="textures/items/${fusion.item1}" title="${fusion.item1}" onclick="window.location.href = '?r=${fusion.item1}';">
                    <img class="item item2" src="textures/items/${fusion.item2}" title="${fusion.item2}" onclick="window.location.href = '?r=${fusion.item2}';">
                    <img class="item itemResult" src="textures/items/${fusion.itemResult}" title="${fusion.itemResult}" onclick="window.location.href = '?r=${fusion.itemResult}';">
                    <img class="item itemFuel" src="textures/items/${fusion.itemFuel}" title="${fusion.itemFuel}" onclick="window.location.href = '?r=${fusion.itemFuel}';">
                </div>
                `;

                });

            }


        }



        i++;
    });
}
