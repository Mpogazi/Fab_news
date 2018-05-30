angular.module('theApp', []).controller('signup_ctrl', ['$scope', '$http', signup_ctrl]);

function signup_ctrl($scope, $http) {

	// Preparing for the signup data and config
	var req = {
		method: 'POST',
		url: '/signup',
		data: {username: $scope.username, email: $scope.email,
			password: $scope.password}
	}

	// Sending the request for signup
	$http(req)
	.then(function onSuccess(response) {

	}, function onError(response) {

	});
}