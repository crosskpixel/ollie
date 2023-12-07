import axios from "axios";
import { BASE_URL } from "./base";
import { RepresentativeAgentItemResponse } from "../models/entity/representativeAgent";

export class RepresentativeAgentAPI {

    static async getListOrdenedByAgentCode() : Promise<RepresentativeAgentItemResponse[]> {
        return (await axios.get<RepresentativeAgentItemResponse[]>(`${BASE_URL}/measured_order/order_agents`, {}))
            .data.map(row => new RepresentativeAgentItemResponse(row))
                 .sort((a,b) => a.code - b.code);
    }

}