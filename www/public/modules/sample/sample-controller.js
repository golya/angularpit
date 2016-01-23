sampleController.$inject = ['$scope'];
angular.module('sample').controller('sampleController', sampleController);

function sampleController($scope) {
    $scope.test = 'test';
}
