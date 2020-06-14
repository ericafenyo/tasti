export const email = () => {
  const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
  return [
    (value: string) => !!value || 'E-mail is required',
    (value: string) => emailRegex.test(value) || 'Please enter a valid email address',
  ];
};

export const required = () => [
  (value: string) => !!value || 'This field is required',
];

export const password = () => [
  (value: string) => !!value || 'Please enter your password',
  (value: string) => value.length >= 8 || 'Password must have at least 8 characters',
];
