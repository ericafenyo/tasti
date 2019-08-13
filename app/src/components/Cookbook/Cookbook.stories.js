import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Cookbook from './Cookbook';

const style = {
	width: '100px'
}


const stories = storiesOf('Cookbook', module);

stories.add('normal', () => ({
	components: { Cookbook },
	render: (h) => <div style = {style}> <Cookbook /></div>
}));
