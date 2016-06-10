// templates for our chat bubbles.

var chatTemplates = {
  myMsgs:`
    <div class="my-msgs" data-id="<%= _id %>">
      <p> <%= message %> </p>
      <button class="delete"></button>
      <label for="delete">Flush</label>
    </div>
  `,
  otherMsgs: `
    <div class="other-msgs" data-id="<%= _id %>">
      <h5><%= username %></h5>
      <p> <%= message %> </p>
    </div>
  `
}
