(function (app) {
    app.factory('startService', ['$http', 'config', "util", function ($http, config, util) {
        return {
            sent_list: function (filter) { 
                return $http({
                    url: config.server + 'api/service/sent_list?q=' + filter.q + "&status=" + filter.status+ "&page=" + filter.page+"&f="+filter.f,
                    method: "get"
                })
            },
            supportDream:function(data){
                return $http({
                    url:config.server + "api/dream/support",
                    method:"post",
                    data:data
                })
            },
            collectionDream:function(id,is_collection){
                return $http({
                    url:config.server + "api/dream/collection?id=" + id+"&is_collection="+is_collection,
                    method:"get",
                })
            },
            search:function (keyword){
                return $http({
                    url: config.server + 'api/index/search?keyword='+keyword,
                    method:"get"
                })
            },
            dreamDetail: function (id) {
                return $http({
                    url: config.server + 'api/dream/show?id=' + id,
                    method: "get"
                })
            },
            index: function (type, page) {
                var url = util.format('{0}api/index/home?type={1}&page={2}', config.server,type,page);
                return $http({
                    url: url,
                    method: "get"
                })
            },
            news_info: function (id) {
                return $http({
                    url: config.server + 'api/index/news_info?id='+id,
                    method: "get"
                })
            },
            user_search: function (keyword) {
                return $http({
                    url: config.server + 'api/index/user_search?keyword='+keywords,
                    method: "get"
                })
            },
            news_info: function (id) {
                return $http({
                    url: config.server + 'api/index/news_info?id=' + id,
                    method: "get"
                })
            },
            add_interaction: function (data) {
                return $http({
                    url: config.server + 'api/interaction/store',
                    method:"post",
                    data:data
                })
            },
            add_comment: function (data) {
                return $http({
                    url: config.server + '/api/interaction/comment',
                    method:"post",
                    data:data
                })
            },
            
        };
    }]);
})(angular.module('app.services'));