import { isEqual } from 'lodash'
import { CalculatePriceResult } from './domain/cart.domain';

type ExperimentFunc = () => CalculatePriceResult

export class PriceExperiment {
    use: ExperimentFunc;
    try: ExperimentFunc;
    run = () => {
        const useResult = this.use()
        const tryResult = this.try()

        if (!isEqual(useResult, tryResult)) {
            console.log(`Prices from the two services do not match. calculatedPrice: ${JSON.stringify(useResult)} pricingServiceCalculationResult: ${JSON.stringify(tryResult)}`);
        }

        return useResult
    }
}