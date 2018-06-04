angular.module('theApp', []).controller('login_ctrl', ['$scope', '$http', login_ctrl]);

function login_ctrl($scope, $http) {
	$scope.login =() => {
		// Preparing for the stuff to send with the request
		var req = {
			method:'POST',
			url: '/login',
			data: {email: $scope.email, password: $scope.password}
		}

		// Sending the POST request for login
		$http(req)
		.then(function onSuccess(response) {
			console.log("SUCCESSFULLY LOGGED IN.");		
		}, function onError(response) {
			console.log("Error Trynna Log in!");
		});
	}
}