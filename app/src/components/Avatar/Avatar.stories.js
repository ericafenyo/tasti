import { storiesOf, addDecorator } from '@storybook/vue';
import Avatar from './Avatar';
import Notes from './Notes.md';

const stories = storiesOf('Components.Avatar', module).addParameters({
	subtitle: 'I am a title',
	component: Avatar
});
const url = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=600&h=600';

stories.add('Overview', () => ({
	notes: 'popover tooltip',
	props: {
		imageUrl: {
			type: String
		}
	},

	notes: Notes,

	render: (h) => <Avatar />
}));
