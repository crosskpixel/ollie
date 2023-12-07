import axios from "axios";
import { BASE_URL } from "./base";
import { IndicatorSellingCurrentYearAgasintPreviousYearFilter } from "../models/requests/IndicatorSellingCurrentYearAgasintPreviousYearFilter";
import { SalesByMonthFilter } from "../models/requests/SalesByMonthFilter";
import { SalesByMonthResponse } from "../models/responses/SalesByMonth";
import IndicatorCurrentYearAgainstPreviousYearResponse from "../models/responses/IndicatorCurrentYearAgainstPreviousYearResponse";

export class SellingReportsAPI {

    static async getIndicatorCurrentYearAgainstPreviousYear(filter: IndicatorSellingCurrentYearAgasintPreviousYearFilter) : Promise<IndicatorCurrentYearAgainstPreviousYearResponse> {
        return new IndicatorCurrentYearAgainstPreviousYearResponse(
            (await axios.get(`${BASE_URL}/measured_order/grouped_sales`, { params: filter } )).data
        );
    }

    static async getSalesByMonth(filter: SalesByMonthFilter) : Promise<SalesByMonthResponse[]> {
        return (await axios.get(`${BASE_URL}/measured_order/sales_by_month`, { params: filter } )).data.map((row: any) => new SalesByMonthResponse(row));
    }


}