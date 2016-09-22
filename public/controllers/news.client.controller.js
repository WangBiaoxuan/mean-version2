/**
 * Created by gehua on 2016/9/20.
 */
angular.module('webapp')
    .controller('indexController',['$scope','$state','NewsService',indexController])
    .controller('detailController',['$scope','$state', '$stateParams', 'NewsService',detailController])
    .controller('updateController',['$scope','$state', '$stateParams', 'NewsService',updateController])
    .controller('addController',['$scope','$state','NewsService',addController]);


    function indexController($scope, $state, NewsService){
        $scope.list = [];
        //时间的格式化
        $scope.formatTime = function (time) {
            return moment(time).format('lll');
        };

        //查看所有新闻列表
        $scope.loadNews = function(){
            NewsService.list().then(
                function (data) {
                    $scope.list = data;
                },
                function(err){}
            );
        };
        $scope.loadNews();

        //跳到更新页
        $scope.NewsUpdate = function(uid){
            console.log(uid);
            $state.go('update',{'uid': uid});
        };

        //跳到新闻详情页
        $scope.NewsDetail = function(id){
            $state.go('detail',{'did': id});

        };

        //跳到新增新闻页
        $scope.createNews = function(){
            $state.go('add');
        };

        //删除新闻
        $scope.NewsDelete = function(id){
            var x = confirm('确定删除这条新闻吗？');
            if(x){
                NewsService.delete(id).then(
                    function (data) {
                        $scope.loadNews();
                    },
                    function(err){
                        console.log(err)
                    }
                )
            }
        }
    }

    function detailController($scope, $state, $stateParams, NewsService){
        $scope.current = {};
        var id = $stateParams.did;

        //展示新闻详情
        $scope.loadDetail = function(id){
            NewsService.detail(id).then(
                function(data){
                    $scope.current = data;
                }
            )
        };

        $scope.loadDetail(id);

        //时间的格式化
        $scope.formatTime = function (time) {
            return moment(time).format('lll');
        };
    }



    function updateController($scope, $state, $stateParams, NewsService){
        $scope.current = {};
        $scope.new = {};

        var  uid = $stateParams.uid;

        //时间的格式化
        $scope.formatTime = function (time) {
            return moment(time).format('lll');
        };

        //展示新闻详情
        $scope.loadDetail = function(uid){
            NewsService.detail(uid).then(
                function(data){
                    $scope.current = data;
                }
            )
        };

        $scope.loadDetail(uid);

        //更新方法
        $scope.update = function () {
            if(!$scope.current.title){
                $scope.editorMessage ="Title is require";
                return;
            }
            if(!$scope.current.content){
                $scope.editorMessage ="content is require";
                return;
            }
            $scope.editorMessage = '';
            NewsService.update($scope.current).then(
                function(data){
                    $state.go('index');
                    $scope.new = {};
                },
                function(err){
                    $scope.editorMessage = err;
                }
            )
        };
    }

    function addController($scope, $state, NewsService){
        $scope.new = {};

        //时间的格式化
        $scope.formatTime = function (time) {
            return moment(time).format('lll');
        };

        //保存新闻并更新
        $scope.save = function(){
            if(!$scope.new.title){
                $scope.editorMessage ="Title is require";
                return;
            }
            if(!$scope.new.content){
                $scope.editorMessage ="content is require";
                return;
            }
            $scope.editorMessage = '';

            NewsService.save($scope.new).then(
                function(data){
                    $("#modal-editor").modal('hide');
                    //$scope.loadNews();
                    $scope.new = {};
                    $state.go('index');
                },
                function(err){
                    $scope.editorMessage = err;
                }
            )
        };
    }