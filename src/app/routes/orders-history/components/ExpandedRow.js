import React from 'react';
import Table from 'rc-table';
import nanoid from 'nanoid';

const columns = [
	{ title: 'Title', dataIndex: 'item.title', key: 'title' },
	{ title: 'Qty', dataIndex: 'qty', key: 'qty' },
	{ title: 'Price', dataIndex: 'item.price', key: 'price' },
	{ title: 'SubTotal', dataIndex: 'price', key: 'subtotal' },
]

export default function ExpandedRow(products, OrderQty) {
	const mapProducts = products.map(product => ({key:nanoid(5), ...product}))
	return (
		<>
		<h3>Ordered products: {OrderQty}</h3>
		<Table
    		columns={columns}		
    		data={mapProducts}
    	/>
		</>
	)
}
