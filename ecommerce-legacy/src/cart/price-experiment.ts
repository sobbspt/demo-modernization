import { isEqual } from 'lodash'

export class PriceExperiment<T> {
    use: () => T;
    try: () => T;
    run = () => {
        const useResult = this.use()
        const tryResult = this.try()

        if (!isEqual(useResult, tryResult)) {
            console.log(`Prices from the two services do not match. calculatedPrice: ${JSON.stringify(useResult)} pricingServiceCalculationResult: ${JSON.stringify(tryResult)}`);
        }

        return useResult
    }
}