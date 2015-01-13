(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('commentsList', CommentsList)
    .controller('CommentsListCtrl', CommentsListCtrl);

  function CommentsList() {
    return {
      scope: {
        comments: '=commentsList',
        count: '=commentCount'
      },
      controller: 'CommentsListCtrl as ctrl',
      templateUrl: 'components/comments_list/templates/comments_list.html'
    };
  }

  function CommentsListCtrl(DS, $stateParams) {
    var ctrl = this;

    ctrl.editing = null;

    ctrl.updateComment = updateComment;
    ctrl.editComment = editComment;
    ctrl.cancelEdit = cancelEdit;

    function updateComment(comment) {
      var updated = DS.createInstance('comment', comment, { useClass:true });

      updated.update(ctrl.editing.body).then(refreshComment);

      function refreshComment(comment) {
        angular.extend(ctrl.editing, comment);
        ctrl.editing = null;
      }
    }

    function editComment(comment) {
      ctrl.newBody = comment.body;
      ctrl.editing = comment;
    }

    function cancelEdit() {
      ctrl.editing.body = ctrl.newBody;
      ctrl.editing = null;
    }
  }
})();
