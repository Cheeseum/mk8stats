var gameData = {
    weights: {
        'feather': {},
        'light': {},
        'cruiser': {},
        'medium': {'speed': [3.75, 4.25, 3.75, 4], 'accel': 2.5, 'weight': 3.75, 'handling': [3.25, 3.25, 3, 3.5], 'traction': 3.75, 'turbo': 2.25},
        'heavy': {},
        'metal': {},
        'superheavy': {}
    },

    characters: {
        'Luigi': { weight: 'medium' }
    },

    karts: {
        'Standard Kart': {'speed': [0, 0, 0, 0], 'accel': 0, 'weight': 0, 'handling': [0, 0, 0, 0], 'traction': 0, 'turbo': 0},
        'Cat Cruiser': {'speed': [0, 0, 0, 0], 'accel': 0, 'weight': 0, 'handling': [0, 0, 0, 0], 'traction': 0, 'turbo': 0}
    },

    wheels: {
        'Standard': {'speed': [0, 0, 0, 0], 'accel': 0, 'weight': 0, 'handling': [0, 0, 0, 0], 'traction': 0, 'turbo': 0}
    },

    gliders: {
        'Super Glider': {'speed': [0, 0, 0, 0], 'accel': 0, 'weight': 0, 'handling': [0, 0, 0, 0], 'traction': 0, 'turbo': 0}
    }
}

var mk8statsApp = angular.module('mk8statsApp', []);
var statKeys = ['accel', 'weight', 'traction', 'turbo'];

function mergeStats () {
    var stats = {'speed': [0,0,0,0], 'handling': [0,0,0,0]};
    for (var i=0; i < arguments.length; i++) {
        if (arguments[i] === undefined) {
            continue;
        }

        for (var j=0; j < statKeys.length; j++) {
            var k = statKeys[j];
            if (!stats.hasOwnProperty(k)) {
                stats[k] = 0;
            }
            
            stats[k] += arguments[i][k];
        }

        for (var j=0; j < 4; j++) {
            stats['speed'][j] += arguments[i]['speed'][j];
            stats['handling'][j] += arguments[i]['handling'][j];
        }
    }

    return stats;
}

mk8statsApp.controller('KartsCtrl', function ($scope) {
    $scope.karts = [];
    
    $scope.addKart = function () {
        kart = {weight: 'medium', kart: 'Standard Kart', wheels: 'Standard', glider: 'Super Glider'};
        $scope.karts.push(kart);
    };

    $scope.addKart();
});

mk8statsApp.controller('KartCtrl', function ($scope) {
    $scope.data = gameData;
    $scope.statKeys = statKeys;
    
    $scope.$watchCollection('kart', function (newKart, oldKart) {
        var k = newKart;
        if (k !== undefined) {
            // merge the kart parts together for stats
            $scope.stats = mergeStats(gameData.weights[k.weight], gameData.karts[k.kart], gameData.wheels[k.wheels], gameData.gliders[k.glider]);
        }
    });
})
.directive('statMeter', function () {
    return {
        restrict: 'E',
        scope: {
          name: '@',
          value: '@',
          max: '@',
        },
        link: function (scope, elem, attrs) {
            scope.level = function () {
                var l = scope.value / scope.max;

                if (l < 0.4) {
                    return 'low';
                } else if (l < 0.65) {
                    return 'mid';
                } else {
                    return 'high';
                }
            }
        },
        templateUrl: 'partials/stat-meter.html'
    };
});
