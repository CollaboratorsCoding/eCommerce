const mongoose = require('mongoose');
const Product = require('./models/product.model');

mongoose.connect('mongodb://localhost:27017/ecommerce');

mongoose.Promise = global.Promise;

const products = [
	{
		imagePath:
			'http://www.gesgi.com/wp-content/uploads/2014/05/demo-image-325x390.png',
		title: 'iphone X',
		category: 'mobile',
		slug: 'sddff',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque perspiciatis deleniti quam est unde ad non quidem iste blanditiis, maxime fugit, tempore dolorem voluptatem commodi, dignissimos sequi praesentium architecto accusantium!',
		price: 1300,
		category: 'phones',
		slug: 'iphone1',
	},
	{
		imagePath:
			'http://www.gesgi.com/wp-content/uploads/2014/05/demo-image-325x390.png',
		title: 'iphone 8',
		category: 'mobile',
		slug: 'sdsdff',
		description:
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam numquam inventore, dolor nemo asperiores officia omnis ea commodi, eveniet nostrum vel. Beatae fugiat saepe dolores ipsum odit deleniti, culpa porro!',
		price: 1300,
		category: 'phones',
		slug: 'iphone12',
	},
	{
		imagePath:
			'http://www.gesgi.com/wp-content/uploads/2014/05/demo-image-325x390.png',
		title: 'Macbook 12',
		category: 'mobile',
		slug: 'sdsdff',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab veritatis numquam voluptate deleniti mollitia. Aut ullam esse quaerat vitae neque dignissimos, ipsa facilis eum dolores? Earum mollitia impedit inventore eligendi.',
		price: 1000,
		category: 'phones',
		slug: 'iphone13',
	},
	{
		imagePath:
			'http://www.gesgi.com/wp-content/uploads/2014/05/demo-image-325x390.png',
		title: 'MacbookPro 13',
		category: 'mobile',
		slug: 'sdsdfdf',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque laborum doloremque, mollitia excepturi voluptas commodi, distinctio laudantium nulla quisquam tenetur sed cum natus. Quae, quidem illo? Dolores cum necessitatibus omnis.',
		price: 1500,
		category: 'phones',
		slug: 'iphone14',
	},
	{
		imagePath:
			'http://www.gesgi.com/wp-content/uploads/2014/05/demo-image-325x390.png',
		title: 'MacbookPro 15',
		category: 'mobile',
		slug: 'sdsdfsdff',
		description:
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit ea, a temporibus, cumque ducimus veritatis excepturi deleniti aperiam aliquid aliquam tempora exercitationem numquam debitis et repudiandae officiis saepe odit doloremque?',
		price: 2000,
		category: 'phones',
		slug: 'iphone15',
	},
	{
		imagePath:
			'http://www.gesgi.com/wp-content/uploads/2014/05/demo-image-325x390.png',
		title: 'ipad',
		category: 'mobile',
		slug: 'sddsff',
		description:
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit ea, a temporibus, cumque ducimus veritatis excepturi deleniti aperiam aliquid aliquam tempora exercitationem numquam debitis et repudiandae officiis saepe odit doloremque?',
		price: 500,
		category: 'phones',
		slug: 'iphone16',
	},
];

let done = 0;
for (let i = 0; i < products.length; i++) {
	new Product(products[i]).save((err, result) => {
		done++;
		if (done === products.length) {
			exit();
		}
	});
}

function exit() {
	mongoose.disconnect();
}
