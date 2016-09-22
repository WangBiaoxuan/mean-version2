/**
 * Created by gehua on 2016/9/20.
 */
"use strict";
var app = angular.module('webapp',['ui.router']);
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('index');
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'tpl/index.html',
            controller: 'indexController'
        })
        .state('add', {
            url: '/add',
            templateUrl: 'tpl/add.html',
            controller: 'addController'
        })
        .state('update', {
            url: '/update/:uid',
            templateUrl: 'tpl/update.html',
            controller: 'updateController'
        })
        .state('detail', {
            url: '/detail/:did',
            templateUrl: 'tpl/detail.html',
            controller: 'detailController'
        })
}])
