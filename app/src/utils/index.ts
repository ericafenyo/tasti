export const buildImageUrl = (path: string) => {
  return !path ? '' : process.env.VUE_APP_IMAGE_BASE_URL + path;
};
