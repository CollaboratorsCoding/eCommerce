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
				1. SUPPLIER IDENTIFICATION The first thing is that the customer
				needs to know who you are. XYZ.co.uk is a site operated by
				(individual or company name with legal status, e.g.). We are
				registered in (country of registration) under company number
				(your registration number) and with our registered office at
				(company address). Our main trading address is: (trading
				address). Our VAT number is (VAT number). We are regulated by
				(...). 2. PRIVACY POLICY & COOKIES Explain to your customers how
				cookies are collected, stored, managed and used on your website.
				(If Information Commissioners Office registered) The website is
				owned by (...) and the data controller is (...). We are
				registered with the Information Commissioners Office and our
				registration number is (...). Contract execution Your personal
				data will be used to provide the information, goods and services
				offered through our website to you, for billing and order
				fulfillment. Email newsletter If you sign up to our newsletter
				we may use your email address to send you information about
				products or services. You can opt out of these at any point and
				you can ask for personal data to stop being recorded at any
				time. Cookies & monitoring Monitoring is important for your
				consumers to understand what information you are collecting from
				visits. It is important that you stress the reasons why you are
				monitoring this traffic. Remember to mention any 3rd party
				services you are using that may collect cookies also, such as
				Google Analytics. A cookie is a small text file that we store on
				your device. Our website uses cookies to distinguish from other
				users of you website. Cookies also provide us with information
				about how this website is used so we can keep it as up to date,
				relevant and error-free as possible. Strictly necessary cookies
				- These are cookies that are essential to the operation of our
				website. Analytical/performance cookie - These cookies allow us
				to recognise and count the number of visitors to our website.
				Functionality cookies - These cookies are used to recognise you
				when you return to our website. Targeting Cookies - These
				cookies record your visit to our website, the pages you have
				visited and the links you have followed. We may monitor traffic
				to our site and collect the following information: The IP
				address of your computer. The referring website from which you
				have got to our website from. The reasons for this are: To make
				ongoing improvements to our website based on this data. To see
				our most popular sources of business. Disclosure of personal
				data We may disclose your personal data: To other companies
				within our group. If we sell our business. To agents and service
				providers. In cases where we are required by law to pass on
				information or if we believe action is necessary for fraud,
				cyber crime or to protect the website, rights, personal safety
				of person/s. We may also disclose aggregate statistics about
				visitors to our website (customers and sales) in order to
				describe our services to prospective partners (advertisers,
				sponsors) and other reputable third parties and for other lawful
				purposes, but these statistics will include no personally
				identifiable information. If you are concerned about your data,
				you have the right, subject to the payment of a small fee to
				request access to personal data which may hold or process about
				you. 3. PRODUCT INFORMATION Describe any conditions specific to
				your product such as the restriction of sale for age-restricted
				products and services. 4. RIGHT TO CANCEL All customers have the
				right to cancel their orders under the The Distance Selling
				Regulations which gives consumers extra protection when buying
				online. Specific legislation here that applies is regulation of
				The Distance Selling Regulations. You have the right to cancel
				the purchase of a good without having to give a reason at any
				time within the of seven working days, beginning on the day
				after you receive the goods. If you are in possession of the
				goods you are under the duty to retain them and take reasonable
				care of them. You must send the goods back to us to our contact
				address at your own cost (unles we delivered the item to you in
				error or the item is damaged or defective) as soon as possible
				once you have canceled the contract. We reserve the right to
				make a charge not exceeding our direct costs of recovering the
				goods if you do not return the goods or return them at our
				expense. Once you have notified us that you wish to cancel the
				contract, any sum debited to us will be refunded to you as soon
				as possible and in any event within 30 days of your
				cancellation. You will not have any right to cancel a purchase
				for the supply of any of the following goods: for the supply of
				goods the price of which is dependent on fluctuations in the
				financial market which cannot be controlled by the retailer. for
				the supply of good made to your specifications or clearly
				personalised or which by reason of their nature cannot be
				returned or are liable to deteriorate or expire rapidly. for the
				supply of audio or video recordings or computer software if they
				are unsealed by you. for the supply of newspapers, periodicals
				or magazines. for gaming, betting or lottery services. 5.
				NOTICES All notices you send us must be sent to the contact
				details on this site (link). We may give notice to you at either
				the email or postal address you provide to us when making a
				purchase. (Notice will be deemed received and properly served 24
				hours after an email is sent or three days after the date of
				posting of any letter.) In providing the service of any notice,
				it will be sufficient to prove, in the case of a letter, that
				the letter was properly addressed, stamped and placed in the
				post and, in the case of an email that the email was sent to the
				specified email address of the addressees. 6. CONCLUSION These
				terms are governed by English law. Any contract for the purchase
				of goods from this site and any dispute or claim arising out of
				or in connection with any such contract will be governed by
				English law. You and we both agree that the courts of England
				and Wales will have non-exclusive jurisdiction. However, if you
				are a resident in Northern Ireland you may also bring
				proceedings in Northern Ireland, and if you are a resident in
				Scotland you may also bring proceedings in Scotland.
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
