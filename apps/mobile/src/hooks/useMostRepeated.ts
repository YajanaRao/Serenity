import _ from 'lodash';

export function useMostRepeated(data: any[]) {
    return _.chain(data).countBy().toPairs().sortBy(1).reverse().map(0).value();
}