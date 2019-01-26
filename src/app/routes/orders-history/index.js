import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import { Container, Loader, Label } from 'semantic-ui-react';
import Table from 'rc-table';

import { frontloadConnect } from '../../hocs/frontLoad';

import Page from '../../components/page';
import MarketActions from '../../store/market/actions';

import ExpandedRow from './components/ExpandedRow';

import './style.scss';

const { getOrders } = MarketActions;

const columns = [
	{ 
		title: 'Order id', 
		dataIndex: 'key', 
		key: '_id', 
		width: 200 
	},
	{ 
		title: 'Status', 
		dataIndex: 'status',
		key: 'status', 
		width: 100, 
		render: status => <Label color='red'>{status}</Label>},
	{ 
		title: 'Total', 
		dataIndex: 'OrderPrice', 
		key: 'OrderPrice', 
		width: 100 },
	{ 
		title: 'Date', 
		dataIndex: 'date',
		key: 'date', 
		width: 200,
		render: date => dayjs(date).format('DD.MM.YYYY | H:mm')
	},
];


const frontload = async props => {
	if(props.myOrders.length <= 1){
		await props.getOrders();
	}
};

class OrderHistory extends Component {
	state ={}

	render() {
    	if(this.props.loading) {
    		return 	<Loader active={this.props.loading} />
    	}
    	
    	return (
    		<Page id="myorders" title="My order history"
    			description="This is about really cool stuff."
    			noCrawl>
    			
    			<Container>
    				<div className="orders-history">
    					{
    						this.props.myOrders.length
    							? (
							<>
							<h3>Your order history from the moment of registration on the site</h3>
    					<div className="orders-history-table">
    						<Table
    							columns={columns}
    							expandRowByClick
    							scroll={{ x: 550 }}
    							expandedRowRender={(record) => ExpandedRow(record.products, record.OrderQty)}
    							data={this.props.myOrders}
    						/>
    					</div>
						</>
    							)
    							: (
    								<h3>Your order history is empty</h3>
    							)
    					}
    					
    				</div>
    			</Container>
    		</Page>
    		);
				
	}
}

const mapStateToProps = state => ({
	myOrders: state.market.myOrders,
	loading: state.market.loading
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getOrders
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(OrderHistory)
);
