(function () {
    'use strict';
    function PostListController($scope, Post) {
    	var postsQuery = Post.get({}, function(posts) {
    		$scope.posts = posts.objects;
    	});
    }
})();
