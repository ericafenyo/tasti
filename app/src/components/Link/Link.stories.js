import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { radios } from '@storybook/addon-knobs';

import Link from './Link';

const stories = storiesOf('Components.Link', module);

stories.add('Overview', () => ({
	props: {

  },
	template:
		'<Link text="Link" type="password" state = "" />'
}));
