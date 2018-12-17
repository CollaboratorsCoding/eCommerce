import React from 'react';
import { Embed } from 'semantic-ui-react';

import Page from '../../components/page';
import './about.scss';

export default () => (
	<Page
		id="about"
		title="About"
		description="This is about really cool stuff."
	>
		<p>What re all about</p>
		<Embed
			id="WWaLxFIVX1s"
			placeholder="https://lumiere-a.akamaihd.net/v1/images/Darth-Vader_6bda9114.jpeg?region=0%2C23%2C1400%2C785&width=960"
			source="youtube"
		/>
	</Page>
);
