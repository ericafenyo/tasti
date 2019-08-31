import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Input from './Input';
import Button from '../Button/Button';

const stories = storiesOf('Components.Inputs', module);

stories.add('Overview', () => ({
	components: {
		Input
	},

	props: {},
	template:
		'<Input type="password" label = "Full Name" placeholder="What is your name?" :required ="true"" name="Name"/>'
}));

stories.add('Form', () => ({
	components: {
		Input
	},
	render: (h) => (
		<div class="container">
			<form>
				<Input type="text" label="Full Name" placeholder="What is your name?" required={true} name="name" />
				<Input type="email" label="Email" placeholder="Enter your email" required={true} name="email" />
				<Input
					type="password"
					label="Password"
					placeholder="Enter your password"
					required={true}
					name="password"
				/>
				<Button label="Submit" />
			</form>
		</div>
	)
}));
