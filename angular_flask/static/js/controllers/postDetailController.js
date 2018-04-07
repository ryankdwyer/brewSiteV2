(function () {
    'use strict';
    function PostDetailController($scope, $routeParams, Post) {
    	var postQuery = Post.get({ postId: $routeParams.postId }, function(post) {
    		$scope.post = post;
    	});
    }
})();
