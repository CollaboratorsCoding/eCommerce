import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Notification from 'rc-notification';
import { isServer } from '../utils';

let rcnotification = null;
if (!isServer) {
	Notification.newInstance(
		{
			style: {
				top: '66px',
				right: '6px',
			},
		},
		n => {
			rcnotification = n;
		}
	);
}

const colors = {
	success: {
		background: '#dfffdf',
		text: 'green',
	},
	error: {
		background: '#ffdfdf',
		text: 'red',
	},
};

class ScrollToTop extends Component {
	componentDidUpdate(prevProps) {
		const { notification } = this.props;

		if (prevProps.notification.id !== notification.id && !isServer) {
			rcnotification.notice({
				content: <span>{notification.message.text}</span>,
				style: {
					right: '50px',
					backgroundColor: colors[notification.type].background,
					color: colors[notification.type].text,
					textAlign: 'center',
					padding: '16px 30px',
				},
				duration: notification.duration,
			});
		}
	}

	render() {
		return this.props.children;
	}
}

export default withRouter(ScrollToTop);
