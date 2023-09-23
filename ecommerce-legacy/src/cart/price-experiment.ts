import { Injectable } from '@nestjs/common';
import { isEqual } from 'lodash'

@Injectable()
export class Experiment<T> {
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