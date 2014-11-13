var mk8statsApp = angular.module('mk8statsApp', ['ngSanitize', 'ui.select']);
var statKeys = ['accel', 'weight', 'traction', 'turbo'];

// returns the sum of the given stat objects
function mergeStats () {
    var stats = {'speed': {}, 'handling': {}};
    var args = arguments;
    for (var i=0; i < args.length; i++) {
        if (args[i] === undefined) {
            continue;
        }

        for (var j=0; j < statKeys.length; j++) {
            var stat = statKeys[j];
            if (!stats.hasOwnProperty(stat)) {
                stats[stat] = 0;
            }
            
            stats[stat] += args[i][stat];
        }
       
        angular.forEach(args[i]['speed'], function(v, k) {
        });

        angular.forEach(args[i]['speed'], function(v, k) {
            if(stats['speed'][k] === undefined)
                stats['speed'][k] = 0;
           
            if(stats['handling'][k] === undefined)
                stats['handling'][k] = 0;
            
            stats['speed'][k] += args[i]['speed'][k];
            stats['handling'][k] += args[i]['handling'][k];
        });
    }

    return stats;
}

mk8statsApp.controller('KartsCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('data/mk8data.json').success(function(data, st) {
        $scope.gameData = data;
        $scope.addKart();
    });

    $scope.karts = [];
    
    $scope.addKart = function () {
        if ($scope.karts.length > 0) {
            lastKart = $scope.karts[$scope.karts.length - 1];
            kart = {character: lastKart.character, 
                    body: lastKart.body, 
                    wheels: lastKart.wheels,
                    glider: lastKart.glider};
        } else {
            kart = {character: $scope.gameData.characters[0], 
                    body: $scope.gameData.bodies[0], 
                    wheels: $scope.gameData.wheels[0],
                    glider: $scope.gameData.gliders[0]};
        }

        $scope.karts.push(kart);
    };

    $scope.removeKart = function (kart) {
        idx = $scope.karts.indexOf(kart)
        if (idx !== -1) {
            $scope.karts.splice(idx, 1);
            if ($scope.karts.length === 0) {
                $scope.addKart();
            }
        }
    };
}]);

mk8statsApp.controller('KartCtrl', ['$scope', function ($scope) {
    //$scope.data = gameData;
    $scope.statKeys = statKeys;
    $scope.terrains = ['Ground', 'Water', 'Air', 'Anti-Grav'];

    $scope.$watchCollection('kart', function (newKart, oldKart) {
        var k = newKart;
        if (k !== undefined) {
            // merge the kart parts together for stats
            $scope.stats = mergeStats($scope.gameData.weights[k.character.weight], k.body, k.wheels, k.glider);
        }
    });
}])
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
