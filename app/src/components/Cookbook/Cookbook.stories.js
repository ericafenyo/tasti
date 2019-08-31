import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import Cookbook from './Cookbook';
import CookbookDocs from './Cookbook.md'

const style = {
	width: '100px'
}


const stories = storiesOf('Cookbook', module);

stories.add('normal', () => ({
	components: { Cookbook },
	notes : CookbookDocs,
	render: (h) => <div style = {style}> <Cookbook /></div>
}));
