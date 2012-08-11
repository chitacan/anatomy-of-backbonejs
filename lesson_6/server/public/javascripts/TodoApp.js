//(function() {

var todoListDom = $('#todo');

var TodoItem = Backbone.Model.extend({
	urlRoot: 'http://192.168.0.107:8080/todo',

	toggleStatus: function() {
		if (this.get('status') == 'incomplete') {
			this.set({'status': 'complete'});
		} else {
			this.set({'status': 'incomplete'});
		}

		this.save();
	}
});

var TodoList = Backbone.Collection.extend({
	model: TodoItem,
	url: 'http://192.168.0.107:8080/todos'
});

var TodoListView = Backbone.View.extend({
	initialize: function() {
		this.collection.on('reset', this.render, this);
		this.collection.on('add', this.addOne, this);
	},

	render: function() {
		this.collection.forEach(this.addOne, this);

		todoListDom.append(this.$el);
	},

	addOne: function(todoItem) {
		var todoView = new TodoView({model: todoItem});
		this.$el.append(todoView.render().el);
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
		var attr = this.model.toJSON();
		this.$el.html( this.template(attr) );

		return this;
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

var todoList 		= new TodoList();
var todoListView 	= new TodoListView({collection: todoList});

// request GET to '/todos'
// todoItem.fetch();

todoList.fetch();

// })();