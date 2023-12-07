import { BusinessModel } from "../enums/businessModel.enum";


export class RepresentativeAgentItemResponse {
    
    public name: string;
    public code: number;

    public get description(){
        return `${this.code} - ${name}`.toLowerCase();
    }

    public get businessModel(){
        return  this.code < 600 ? BusinessModel.B2B : BusinessModel.B2C;
    }

   constructor({ agentName, agentCode } : any) {
        this.name = agentName;
        this.code = Number(agentCode);
    }
}