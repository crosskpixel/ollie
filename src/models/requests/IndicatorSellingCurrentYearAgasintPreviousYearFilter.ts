import { BusinessModel } from "../enums/businessModel.enum";

export class IndicatorSellingCurrentYearAgasintPreviousYearFilter {
    
    public days_to_subtract?: number;
    public b2b?: boolean;
    public b2c?: boolean;
    public agent_code?: number;

    constructor(
        { days, businessModels, agentCode } 
        :
        { 
            days: number, 
            businessModels: BusinessModel[], 
            agentCode: number | undefined 
        }
    ) {
        this.days_to_subtract = days;
        this.b2b = businessModels.includes(BusinessModel.B2B);
        this.b2c = businessModels.includes(BusinessModel.B2C);
        this.agent_code = agentCode;
    }

}