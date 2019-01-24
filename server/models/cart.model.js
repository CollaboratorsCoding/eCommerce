/* eslint-disable */
export default class Cart {
	constructor(props) {
		this.items = props.items || {};
		this.totalQty = props.totalQty || 0;
		this.totalPrice = props.totalPrice || 0;
	}

	add(item, id) {
		let storedItem = this.items[id];
		if (!storedItem) {
			this.items[id] = {
				item,
				qty: 0,
				price: 0,
			};

			storedItem = this.items[id];
		}
		storedItem.qty++;
		storedItem.price = storedItem.item.price * storedItem.qty;
		this.totalQty++;
		this.totalPrice += storedItem.item.price;
	}

	get(id) {
		return this.items[id]
	}

	remove(id) {
		this.totalQty -= this.items[id].qty;
		this.totalPrice -= this.items[id].price;
		delete this.items[id];
	}

	removeOne(id) {
		this.items[id].qty--;
		this.items[id].price -= this.items[id].item.price;
		this.totalQty--;
		this.totalPrice -= this.items[id].item.price;

		if (this.items[id].qty <= 0) {
			delete this.items[id];
		}
	}

	generateArray() {
		const arr = [];
		for (let item in this.items) {
			arr.push(this.items[item]);
		}
		return arr;
	}
}
