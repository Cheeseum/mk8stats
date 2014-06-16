var gameData = {
    weights: {
        "feather": {},
        "light": {},
        "cruiser": {},
        "medium": {},
        "heavy": {},
        "metal": {},
        "superheavy": {}
    },

    characters: {
    },

    karts: {
    },

    wheels: {
    },

    gliders: {
    }
}

// keys to calculate final stats from
var statKeys = ['speed', 'accel'];
var maxStat = 6.0;

// pre-build this template since it's static anyway
var kartOptions = mk8stats.templates['kart-options'](gameData);

var currentId = 0;

function addKart() {
    var kartElem = document.querySelector('#karts').appendChild(document.createElement(mk8stats.templates.kart({id: currentId})));
    kartElem.appendChild(document.createElement(kartOptions));
    kartElem.appendChild(mk8stats.templates['kart-stats']({
        max: maxStat,
        statKeys: statKeys
    }));
}

function recalculateStats(kartId) {
    var kartElem = document.querySelector('#karts > #kart-' + id);
    var kartStatElem = kartElem.querySelector('.kart-stats');
    var kartOptions = kartElem.querySelectorAll('.kart-options > select');

    var selectedStats = []

    // get the selected data, referencing names and values from gameData
    var character = kartElem.querySelector('.kart-options > select[name=character] > option:selected');
    selectedStats.append(gameData.weights[gameData[character]]);

    dataKeys = ['kart', 'wheel', 'glider'];
    for (var i=0; i < dataKeys.length; i++) {
        var opt = kartElem.querySelector('.kart-options > select[name=' + dataKeys[i] + '] > option:selected');
        selectedStats.append(gameData[dataKeys[i] + 's'][opt]);
    }    

    for (var i=0; i < statKeys.length; i++) {
        var k = statKeys[i];
        var stat = 0;
        for (var j=0; j < selectedStats[i]; j++) {
            stat += selectedStats[i][k];
        }

        kartStatElem.querySelector('meter[name=' + k + ']').value = stat;
    }
}

var addButton = document.querySelector('#add-button');
addButton.onclick = addKart

