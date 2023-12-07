export class SalesByMonthResponse {
    public year: number;
    public month: number;
    public total: number;
    public pairs: number;
    public period: string;

    constructor({ year, month, total, pairs } : { year: number, month: number, total: number, pairs: number }) {
        this.year = year;
        this.month = month;
        this.total = total;
        this.pairs = pairs;
        this.period = `${year}-${String(month).padStart(2,'0')}`
    }
}