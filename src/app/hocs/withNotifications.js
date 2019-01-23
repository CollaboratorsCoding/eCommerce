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
				right: '16px',
			},
		},
		n => {
			rcnotification = n;
		}
	);
}

const colors = {
	success: {
		color: 'rgb(0, 181, 173)',
		icon: (
			<svg
				version="1.1"
				className="notification-item__svg"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 512 512"
			>
				<g>
					<g>
						<path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z" />
					</g>
				</g>
			</svg>
		),
	},
	error: {
		color: '#da5353',
		icon: (
			<svg
				version="1.1"
				className="notification-item__svg"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 301.691 301.691"
			>
				<g>
					<polygon points="119.151,0 129.6,218.406 172.06,218.406 182.54,0  " />
					<rect
						x="130.563"
						y="261.168"
						width="40.525"
						height="40.523"
					/>
				</g>
			</svg>
		),
	},
	info: {
		color: '#5694da',
		icon: (
			<svg
				version="1.1"
				className="notification-item__svg"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 32 32"
			>
				<g>
					<g id="info">
						<g>
							<path d="M10,16c1.105,0,2,0.895,2,2v8c0,1.105-0.895,2-2,2H8v4h16v-4h-1.992c-1.102,0-2-0.895-2-2L20,12H8     v4H10z" />
							<circle cx="16" cy="4" r="4" />
						</g>
					</g>
				</g>
			</svg>
		),
	},
};

class ScrollToTop extends Component {
	componentDidUpdate(prevProps) {
		const { notification } = this.props;

		if (prevProps.notification.id !== notification.id && !isServer) {
			rcnotification.notice({
				key: notification.id,
				content: (
					<div
						className="notification-item"
						style={{
							borderColor: colors[notification.type].color,
						}}
					>
						<div
							className={`notification-item__icon ${
								notification.type
							}`}
						>
							{colors[notification.type].icon}
						</div>

						<div
							className="notification-item__close"
							onClick={() =>
								rcnotification.removeNotice(notification.id)
							}
						>
							<svg
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 15.642 15.642"
								enableBackground="new 0 0 15.642 15.642"
							>
								<path
									fillRule="evenodd"
									d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"
								/>
							</svg>
						</div>
						<div className="notification-item__header">
							{notification.message.header}
						</div>
						<div className="notification-item__content">
							{notification.message.text}
						</div>
					</div>
				),
				style: {
					right: '0',
					padding: '0',
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
