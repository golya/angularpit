sampleController.$inject = ['$scope'];
angular.module('sample').controller('sampleController', sampleController);

function sampleController($scope) {
    $scope.clock = {
    now:new Date ()
    };

    var updateClock = function () {
    $scope.clock.now =new Date ()
    };

    setInterval(function(){
    $scope.$apply(updateClock);
    }, 1000 );
    updateClock();
}
