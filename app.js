var app = angular.module("keytreeTest", []);

const BASE_URL = "https://api.github.com";

app.controller("appCtrl", function ($scope, $http) {

    // Variables daclaration
    $scope.title = "Github users (repos and orgs)";
    $scope.resultReady = false;
    $scope.loading = false;
    $scope.norepos = false;
    $scope.noorgs = false;

    /* Functions */

    // Submit search
    $scope.submit = function (username) {
        $scope.resultReady = false;
        $scope.loading = true;
        $scope.repos = []
        $scope.orgs = []
        $scope.norepos = false;
        $scope.noorgs = false;
        $scope.searchRepos(username);
    };
    // User's repos API
    $scope.searchRepos = function (username) {
        const url = `${BASE_URL}/users/${username}/repos?per_page=250`;
        $http.get(url)
            .then(function (response) {
                $scope.repos = response.data;
                if (!$scope.repos.length) {
                    $scope.norepos = true;
                }
                $scope.searchOrgs(username);
            }).catch(function (e) {
                $scope.norepos = true;
                $scope.searchOrgs(username);
                throw e;
            });
    }
    // User's orgs API
    $scope.searchOrgs = function (username) {
        const url = `${BASE_URL}/users/${username}/orgs`;
        $http.get(url)
            .then(function (response) {
                $scope.orgs = response.data;
                if (!$scope.orgs.length) {
                    $scope.noorgs = true;
                }
                $scope.loading = false;
                $scope.resultReady = true;
            }).catch(function (e) {
                $scope.noorgs = true;
                $scope.loading = false;
                $scope.resultReady = true;
                throw e;
            });
    }
    // Clear search form
    $scope.clear = function () {
        $scope.username = '';
        $scope.resultReady = false;
    }
});