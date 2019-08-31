import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Headline from './Headline';

const stories = storiesOf('Type', module);

stories.add('Headline', () => ({
	components: { Headline },
	render: (h) => (
		<div class="container">
			<Headline text="We help coaches and athletes win with video." level={1} />
		</div>
	)
}));
