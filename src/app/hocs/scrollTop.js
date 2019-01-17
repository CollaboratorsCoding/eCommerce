import { Component } from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends Component {
	componentDidUpdate(prevProps) {
		const location = this.props.location;
		const prevLocation = prevProps.location;
		if (
			location.pathname !== prevLocation.pathname ||
			location.search !== prevLocation.search
		) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		return this.props.children;
	}
}

export default withRouter(ScrollToTop);
