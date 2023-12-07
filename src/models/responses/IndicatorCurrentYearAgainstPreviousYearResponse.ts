
class IndicatorSellingOfYear {
    quantityOfOrders: number;
    itemsSold: number;
    ordersValue: number;
    constructor({ quantityOfOrders, itemsSold, ordersValue }: { quantityOfOrders: number, itemsSold: number, ordersValue: number }) {
        this.quantityOfOrders = quantityOfOrders;
        this.itemsSold = itemsSold;
        this.ordersValue = ordersValue;
    }
}

export default class IndicatorCurrentYearAgainstPreviousYearResponse {

    public current: IndicatorSellingOfYear;
    public lastPeriod: IndicatorSellingOfYear;

    constructor({ current, lastPeriod } : { current: IndicatorSellingOfYear, lastPeriod: IndicatorSellingOfYear }) {
        this.current = new IndicatorSellingOfYear(current);
        this.lastPeriod = new IndicatorSellingOfYear(lastPeriod)
    }

}