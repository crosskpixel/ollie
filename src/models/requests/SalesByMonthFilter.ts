import { BusinessModel } from "../enums/businessModel.enum";

export class SalesByMonthFilter {
    
    public b2b?: boolean;
    public b2c?: boolean;
    public agent_code?: number;

    constructor(
        { businessModels, agentCode } 
        :
        { 
            businessModels: BusinessModel[], 
            agentCode: number | undefined 
        }
    ) {
        this.b2b = businessModels.includes(BusinessModel.B2B);
        this.b2c = businessModels.includes(BusinessModel.B2C);
        this.agent_code = agentCode;
    }

}