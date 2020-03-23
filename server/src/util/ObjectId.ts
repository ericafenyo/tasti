/**
 * returns an Object id using random strings and timestamp
 * 
 * @see {@link https://gist.github.com/solenoid/1372386}
 */
export const getObjectID = () => {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};