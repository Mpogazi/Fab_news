angular.module('theApp', []).controller('myCtrl', ['$scope', '$http', myCtrl]);

function myCtrl($scope, $http) {
	// Getting all the users from the db
	$scope.getUsers =() => {
		$http.get('/index')
		.then(function onSuccess(response){
			$scope.users = response.data;
		}, function onError(response) {
			$scope.users = response.statusText;
		});
	}
	$scope.getUsers();
}