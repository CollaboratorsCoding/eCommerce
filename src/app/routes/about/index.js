import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProfileActions from '../../store/profile/actions';
import Page from '../../components/page';
import './about.scss';

const { signin, signup } = ProfileActions;

class About extends PureComponent {
	componentDidMount = () => {};

	render() {
		return (
			<Page
				id="about"
				title="About"
				description="This is about really cool stuff."
			>
				<div
					style={{
						marginTop: '40px',
						display: 'flex',
					}}
				>
					<p>
						Sociis dictumst tristique eget mauris nulla in. Mi class
						dis molestie? Scelerisque eleifend fusce integer amet
						turpis dui pulvinar senectus euismod. Etiam sollicitudin
						ante suspendisse! Suscipit et laoreet, vulputate class.
						Ligula dis himenaeos placerat felis gravida enim at ante
						non cubilia magna. Congue malesuada parturient dui
						interdum eros placerat blandit tempor netus.
					</p>
					<p>
						Fringilla in vulputate id dolor augue etiam luctus donec
						ridiculus nibh phasellus netus? Id taciti morbi semper
						sem facilisis nisl mollis. Lobortis nam ante semper
						rhoncus metus magnis, id lacus dignissim a tincidunt.
						Sollicitudin bibendum per aliquam iaculis arcu nulla
						parturient nisl pellentesque turpis massa habitant.
						Conubia interdum libero aptent hac. Ante convallis.
					</p>
					<p>
						Parturient etiam felis aliquet eget scelerisque mus
						magna gravida litora adipiscing. Sociosqu justo quis
						ridiculus. Venenatis orci nullam nunc, ut iaculis dis
						luctus commodo duis diam turpis sollicitudin. Dis fusce
						porta aliquam fames sociis venenatis quis. Nec vitae
						nunc inceptos tortor ullamcorper accumsan etiam arcu
						consectetur fames pulvinar. Vitae odio accumsan
						vulputate! Ultrices nisl aliquet suspendisse pretium
						natoque per per magnis sit nec etiam aliquet. Hac justo
						purus dictumst non imperdiet sagittis potenti litora
						senectus fringilla curabitur blandit. Tortor eros eros
						aenean habitant quisque id inceptos fames blandit
						imperdiet. Ut sodales interdum diam. Lobortis ornare
						congue luctus porta ultrices imperdiet non. Mus elit
						class odio fames lacinia amet euismod non curabitur
						netus cubilia dictumst. Malesuada proin nam sed felis.
					</p>
					<p>
						Lacus nec tortor placerat tincidunt aliquam curabitur
						elementum. Iaculis pharetra amet tristique velit et
						venenatis viverra. Etiam massa viverra aliquet luctus
						porta laoreet imperdiet. Odio porttitor fermentum purus
						velit habitasse eleifend! Placerat urna commodo dictum
						vel blandit. Sociis potenti nec lectus penatibus rhoncus
						blandit potenti vel class? Natoque sit nulla quis leo id
						vivamus fringilla parturient sociosqu eros hendrerit.
						Ullamcorper lacinia eget dolor odio hendrerit facilisi
						tincidunt. Arcu curabitur suscipit posuere nibh ut
						cursus gravida a metus gravida. Felis sagittis senectus
						senectus senectus, suscipit ridiculus. Vel sollicitudin.
					</p>
					<p>
						Rutrum class class, turpis id nam elit dui! Fringilla
						taciti cum non nibh? Elit, pellentesque morbi nunc sed.
						Semper ullamcorper sodales porttitor nisl justo. Nibh
						dignissim suspendisse erat nam ullamcorper class elit
						justo habitant at. Vivamus sociis phasellus pellentesque
						magnis nisl cursus litora tristique elementum. Nostra
						dignissim lacinia diam class taciti. Quisque fusce diam
						sem montes quis. Rutrum in libero maecenas inceptos
						dictumst interdum etiam eu malesuada sem. Accumsan purus
						molestie pulvinar?
					</p>
				</div>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	cart: state.market.cart,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ signin, signup }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(About);
