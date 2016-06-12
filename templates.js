// templates for our chat bubbles.

var chatTemplates = {
  myMsgs:`
    <div class="my-msgs" data-id="<%= _id %>">
      <span> <%= message %> </span>
      <button class="delete"></button>
    </div>
  `,
  otherMsgs: `
    <div class="other-msgs" data-id="<%= _id %>">
      <h5><%= username %>: </h5>
      <span> <%= message %> </span>
    </div>
  `
}
