//test test geoff edit

//this requests animation layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  function( callback ){
            window.setTimeout(callback, 1000);
          };
})();

$(document).ready(function() {
  chatPage.init();
})

var chatPage = {
  url: 'http://tiny-tiny.herokuapp.com/collections/pottytalk',
  chat: [],
  users: [],
  init: function() {
    chatPage.styling();
    chatPage.events();
  },
  styling: function() {
    chatPage.getChat();
  },
  events: function() {

    //BOX SHADOW ANIMATION FOR LOGIN
    //modified Brian Gonzolez's codepen: http://codepen.io/briangonzalez/pen/Btmpe
      var $shadow = $('#login');
        var shadowLimit = 200;
        var moveEvent = ('ontouchstart' in document.documentElement) ? "touchmove" : "mousemove";

        (function animloop(){
          requestAnimFrame(animloop);

          $(window).bind(moveEvent, function(event){
            var $this = $(this);
            var w      = $this.width();
            var h      = $this.height();
            var center = { x: w/2, y: h/2 };

            var evX = (moveEvent == 'touchmove') ? event.originalEvent.touches[0].clientX : event.clientX;
            var evY = (moveEvent == 'touchmove') ? event.originalEvent.touches[0].clientY : event.clientY;

            var shadowX = (center.x - evX) / 10;
            var shadowY = (center.y - evY) / 10;

            shadowX = (shadowX > shadowLimit) ? shadowLimit : shadowX;
            shadowX = (shadowX < shadowLimit*-1) ? shadowLimit*-1 : shadowX;
            shadowY = (shadowY > shadowLimit) ? shadowLimit : shadowY;
            shadowY = (shadowY < shadowLimit*-1) ? shadowLimit*-1 : shadowY;

            $shadow.css({ boxShadow: Math.ceil(shadowX) + 'px '+ Math.ceil(shadowY + 20) +'px '+ Math.abs(shadowX*shadowY)/4 +'px  rgba(0,0,0,0.2)' });
         });
        })();

//  SUBMIT USERNAME VIA (( ENTER )) & STORE IN USERS ARRAY & BEGIN CHAT
    $('#formid').on('keypress click', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        var $username = $('input[type=text]').val()
        console.log($username);
        chatPage.users.push($username);
        $('input[type=text]').val('');
        $('#login').fadeOut(2000);
        $('.main-container').removeClass('hidden').fadeIn(2000);
        return false;
      }
    });

    // SUBMIT USERNAME VIA (( BUTTON )) & STORE IN USERS ARRAY & BEGIN CHAT
    $('.loginButton').on('click', function(event){
      event.preventDefault();
      var $username = $('input[type=text]').val()
      console.log($username);
      chatPage.users.push($username);
      $('input[type=text]').val('');
      $('#login').fadeOut(2000);
      $('.main-container').removeClass('hidden').fadeIn(2000);
    })

    // CREATE NEW MESSAGE BY HITTING ENTER.
    $('.messageArea').keypress(function(event){
      //enter pressed ?
      if(event.which == 10 || event.which == 13) {
          console.log("the enter button works on...", $('.messageArea'));
          var newMsg = {
            message: $(this).val()
          }

          console.log("this is the message to save", newMsg);
            chatPage.createChat(newMsg);
            $(this).val("");
            }

    })

// delete (flush) function use if/else for delete for author
    $('.main-container').on('click','.delete', function(event) {
      event.preventDefault();
      var chatId = $(this).parent().data('id');
      console.log(chatId);
      chatPage.deleteChat(chatId);
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
          $('.chat-window').append(htmlStr);
          chatPage.getChat();

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
          $('.chat-window').html("");
        data.forEach(function(element,idx) {
          var chatHtmlStr = chatPage.htmlGenerator(chatTemplates.myMsgs,element)
          $('.chat-window').append(chatHtmlStr);
          chatPage.chat.push(data);

          });
        },
        error: function(err) {
          console.error("OH CRAP", err);
        }
      })
    },

// delete chat windows
    deleteChat: function(chatId) {
      // find blog to delete from our blog data;
      var deleteUrl = chatPage.url + "/" + chatId;
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
