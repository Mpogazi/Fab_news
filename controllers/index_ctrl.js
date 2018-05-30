angular.module('App', []).controller('index_ctrl', ['$scope', '$http', index_ctrl]);

function index_ctrl($scope, $http) {
	// Getting the news Articles from the backend
	$scope.getNews =() => {
		$http.get('/index.news')
		.then(function onSuccess(resp) {
			$scope.news = resp.data.articles;
		}, function onError(resp) {
			$scope.news = resp.statusText;
		});
	}
	$scope.getNews();
}