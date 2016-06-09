//test test geoff edit
$(document).ready(function() {
  chatPage.init();
})

var chatPage = {
  url: 'http://tiny-tiny.herokuapp.com/collections/pottytalk',
  chat: [],
  init: function() {
    chatPage.styling();
    chatPage.events();
  },
  styling: function() {
    chatPage.getChat();
  },
  events: function() {
    //events go in here

    // CREATE NEW MESSAGE BY HITTING ENTER.
    $('.messageArea').keypress(function(){
      //enter pressed ?
      if(e.which == 10 || e.which == 13) {
          console.log("the enter button works on...", $('.messageArea'));
          var newMsg = $(this).val();
          console.log(newMsg);
            chatPage.createChat(newMsg);
            $(this).val("");
            }
    })

  }, /* --------------------------------------- end of events */


// create chat windows

    createChat: function(chat) {
      $.ajax({
        url: chatPage.url,
        method: "POST",
        data: chat,
        success: function(data) {
          console.log("WE CREATED SOMETHING", data);

    // will need something similar to add chat messages
          var htmlStr = chatPage.htmlGenerator(chatTemplates.myMsgs,data)
          chatPage.chat.push(data);
          $('.main-container').append(htmlStr);

        },
        error: function(err) {
          console.error("CREATE ERROR", err);
        }
      })
    },

//update chat windows
    updateChat: function(chat) {

      $.ajax({
        method: 'PUT',
        url: chatPage.url,    //+ "/" + blog.id, need id for individual users?
        data: chat,
        success: function(data) {
          console.log("UPDATED SUCCESSFULLY!!!", data);
          chatPage.getChat();
        },
        error: function(err) {
          console.error("UPDATE ERROR", err);
        }
      })
    },

//
    getChat: function() {
      $.ajax({
        url: chatPage.url,
        method: "GET",
        success: function(data) {
          console.log("WE GOT SOMETHING", data);
          $('.main-container').html("");
        data.forEach(function(element,idx) {
          var chatHtmlStr = chatPage.htmlGenerator(chatTemplates.myMsgs,element)
          $('.main-container').append(htmlStr);
          chatPage.chat.push(data);

          });
        },
        error: function(err) {
          console.error("OH CRAP", err);
        }
      })
    },

// delete chat windows
    deletechat: function(blogId) {
      // find blog to delete from our blog data;
      // var deleteUrl = blogPage.url + "/" + blogId;
      $.ajax({
        url: deleteUrl,
        method: "DELETE",
        success: function(data) {
          console.log("WE DELETED SOMETHING", data);
          chatPage.getChat();
        },
        error: function(err) {
          console.error("OH CRAP", err);
        }
      })
    },

      templification: function(template) {
        return _.template(template);
      },

      htmlGenerator: function(template,data) {
        var tmpl = chatPage.templification(template);
        return tmpl(data);
      },

};
