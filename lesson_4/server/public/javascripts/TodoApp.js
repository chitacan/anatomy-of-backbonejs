(function() {

var todoList = $('#todo');

var TodoItem = Backbone.Model.extend({
	urlRoot: 'http://localhost:8080/todos',

	toggleStatus: function() {
		if (this.get('status') == 'incomplete') {
			this.set({'status': 'complete'});
		} else {
			this.set({'status': 'incomplete'});
		}

		this.save();
	}
});

var TodoView = Backbone.View.extend({
	template: _.template('<h3 class=<% print(status) %>>' + 
		'<input type=checkbox ' +
		'<% if (status == "complete") print("checked") %>/>' +
		'<%= description %></h3>'),

	events: {
		'change input': 'toggleStatus'
	},

	initialize: function() {
		this.model.on('change', this.render, this);
		// this.model.on('destroy', this.remove, this);
	},

	render: function() {
		console.log(this);
		var attr = this.model.toJSON();

		todoList.append(this.$el.html( this.template(attr) ));
	},

	toggleStatus: function() {
		this.model.toggleStatus();
	},

	remove: function() {
		// remove elements from DOM
	}
});

var todoItem = new TodoItem();
var todoView = new TodoView({model: todoItem});

// request GET to '/todos'
todoItem.fetch();

})();