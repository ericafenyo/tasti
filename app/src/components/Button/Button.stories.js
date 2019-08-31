import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from './Button';

const stories = storiesOf('Components.Buttons', module);

stories.add('Overview', () => ({
	components: {
		Button
	},

	props: {},
	template: '<Button  type="outline" size="" :disabled="false"/>'
}));
