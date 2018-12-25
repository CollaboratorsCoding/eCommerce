import React, { PureComponent } from 'react';
import request from 'superagent';

import Page from '../../components/page';

class Add extends PureComponent {
	state = {
		loading: false,
		msg: '',
	};

	handleSubmit = (e, type) => {
		const formData = new FormData(e.target);
		const data = {};

		e.preventDefault();
		this.setState({
			loading: true,
		});
		/* eslint-disable-next-line */
		for (const entry of formData.entries()) {
			data[entry[0]] = entry[1];
		}

		request
			.post(`/api/${type}`)
			.send(data)

			.end((err, res) => {
				this.setState({
					loading: false,
					msg: res.body.msg,
				});
			});
	};

	render() {
		const { msg, loading } = this.state;
		return (
			<Page
				id="add"
				title="Add New Product"
				description="This is about really cool stuff."
				noCrawl
			>
				<div>
					{msg}
					{loading}
				</div>
				Add product
				<form
					onSubmit={e => {
						this.handleSubmit(e, 'add-product');
					}}
				>
					<input type="text" name="title" placeholder="title" />
					<input type="text" name="slug" placeholder="custom slug" />
					<input
						type="text"
						name="imagePath"
						placeholder="imagePath"
					/>
					<input
						type="text"
						name="description"
						placeholder="description"
					/>
					<input type="text" name="price" placeholder="price" />
					<input type="text" name="category" placeholder="category" />
					<button type="submit">Send</button>
				</form>
				Add category
				<form
					onSubmit={e => {
						this.handleSubmit(e, 'add-category');
					}}
				>
					<input type="text" name="title" placeholder="title" />
					<input type="text" name="slug" placeholder="custom slug" />

					<input
						type="text"
						name="description"
						placeholder="description"
					/>

					<button type="submit">Send</button>
				</form>
			</Page>
		);
	}
}

export default Add;
