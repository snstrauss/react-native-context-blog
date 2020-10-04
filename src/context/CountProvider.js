import createDataContext from './createDataContext';

const countActions = {
    add: (count) => count + 1,
    subtract: (count) => count - 1
};

const { Provider, Context } = createDataContext('count', countActions, 0);

const CountProvider = Provider;

export const CountContext = Context;
export default CountProvider;