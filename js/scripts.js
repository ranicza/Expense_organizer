var Purchase = {
	initialize: function(description, price, quantity){
		this.description = description;
		this.price = price;
		this.quantity = quantity;
	},
	create: function(description, price, quantity) {
		var new_purchase = Object.create(Purchase);
		new_purchase.initialize(description, price, quantity);
		if(new_purchase.exist()) {
		return new_purchase;
		} else {
			alert("Add purchase correctly!");
			return false;
		}
	},
	exist: function() {
		if (this.description === undefined || isNaN(this.price) || this.description.length === 0 ||isNaN(this.quantity)) {
			return false;
		} else {
			return true;
		}
	},
	totalCost: function(){
		return this.price *this.quantity;
	}
};

var Category = {
	all: [],
	initialize: function(name){
		this.name = name;
		this.purchases= [];
	},
	create: function(name){
		var new_category = Object.create(Category);
		new_category.initialize(name);
		if(new_category.exist()) {
		Category.all.push(new_category);
			return new_category;
		}else{
			alert('Category is not exist!');
			return false;
		}
	},
	exist: function() {
		if (this.name === undefined) {
			return false;
		} else {
			return this.name.length > 0;
		}
	},
	create_purchase: function(description, price, quantity) {
		var new_purchase = Purchase.create(description, price, quantity);
		if (new_purchase != false) {
		this.purchases.push(new_purchase);
		return new_purchase;
		} else {
			return false;
		}
	},

	sum: function(){
		var sum = 0;
		for(var i =0; i < this.purchases.length; i++){
			sum += this.purchases[i].totalCost();
		}return sum;
	}
};

$(document).ready(function(){

	var current_category = Object.create(Category);

	$('#category-form').submit(function(event){
		event.preventDefault();
		var new_category = Category.create($('input#category').val());

		if(new_category != false) {
			$('ul#categories').append('<li><span>' + new_category.name + '</span></li>');
		}
		$('input#category').val('');

		$('#categories li').last().click(function() {
			current_category = new_category;
			$('#active-category').text(' in ' + new_category.name);
			$("#add-table").show();
			$('#sum').empty().show();

			$("#add-table").text("");
			$("#add-table").append("<tr><th>Description</th><th>Price</th><th>Quantity</th><th>Total cost</th></tr>");

			current_category.purchases.forEach(function(el){
				$('#add-table').append("<tr><td>" + el.description + "</td><td>" + el.price + '$'+  "</td><td>" + el.quantity+ "</td><td>" + el.totalCost()+ '$'+ "</td></tr>");
			});
			$('#sum').append("Total cost is : " + current_category.sum() + '$');
		});
	});


	$('#form-purchases').submit(function(event) {
		event.preventDefault();

		var new_purchase = current_category.create_purchase($('#purchase').val(), parseInt($('#price').val()), parseInt($('#quantity').val()));
		$('#add-table').show();
		$('#sum').empty().show();

		if(new_purchase != false) {
			$('#add-table').text('');
			$("#add-table").append("<tr><th>Description</th><th>Price</th><th>Quantity</th><th>Total cost</th></tr>");
			current_category.purchases.forEach(function (el) {
				$('#add-table').append("<tr><td>" + el.description + "</td><td>" + el.price + '$'+ "</td><td>" + el.quantity + "</td><td>" + el.totalCost() + '$'+ "</td></tr>");
			});
			$('#sum').append("Total cost is : " + current_category.sum() + '$');
		}
			$('#purchase').val('');
			$('#price').val('');
			$('#quantity').val('');
	});

});
