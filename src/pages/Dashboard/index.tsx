
import { memo, useEffect, useState } from "react";
import { SingleSelectPeriodByDays } from "../../components/inputs/SingleSelectPeriodByDays";
import { Box, Card } from "@mui/material";
import ToggleB2BB2C from "../../components/inputs/ToggleB2CB2B";
import { RepresentativeAgentItemResponse } from "../../models/entity/representativeAgent";
import { SingleSelectRepresentativeAgent } from "../../components/inputs/SingleSelectRepresentativeAgent";
import { BusinessModel } from "../../models/enums/businessModel.enum";
import { CompareSellingCurrentYearAgainstPreviousYearGraph } from "../../components/Reports/Selling/CompareSellingCurrentYearAgainstPreviousYearGraph";
import { SellingReportsAPI } from "../../api/sellingReports";
import { IndicatorSellingCurrentYearAgasintPreviousYearFilter } from "../../models/requests/IndicatorSellingCurrentYearAgasintPreviousYearFilter";
import { SalesByMonthResponse } from "../../models/responses/SalesByMonth";
import { SalesByMonthFilter } from "../../models/requests/SalesByMonthFilter";
import { SalesByMonthGraph } from "../../components/Reports/Selling/SalesByMonthGraph";
import { LoadingGraph } from "../../components/LoadingGraph";
import IndicatorCurrentYearAgainstPreviousYearResponse from "../../models/responses/IndicatorCurrentYearAgainstPreviousYearResponse";

function DashboardPage() {

    const [ intervalDays , setIntervalDays ] = useState(7);
    const [ businessModel, setBusinesModel ] = useState<BusinessModel[]>([ BusinessModel.B2B, BusinessModel.B2C ]);
    const [ representativeAgent, setRepresentativeAgent ] = useState<RepresentativeAgentItemResponse | null>(null);

    const [ dataGraphCurrentYearAgaintPreviousYear, setDataGraphCurrentYearAgaintPreviousYear ] = useState<IndicatorCurrentYearAgainstPreviousYearResponse | null>(null);
    const [ dataGraphSalesByMonth, setDataGraphSalesByMonth ] = useState<SalesByMonthResponse[] | null>(null);

    const doRequestGraphCurrentYearAgainstPreviousYear = () => {
        setDataGraphCurrentYearAgaintPreviousYear(null);
        SellingReportsAPI.getIndicatorCurrentYearAgainstPreviousYear(
            new IndicatorSellingCurrentYearAgasintPreviousYearFilter({
                days: intervalDays,
                businessModels: businessModel,
                agentCode: representativeAgent?.code,
            })
        ).then(setDataGraphCurrentYearAgaintPreviousYear);
    }

    const doRequestSalesByMonth = () => {
        setDataGraphSalesByMonth(null);
        SellingReportsAPI.getSalesByMonth(
            new SalesByMonthFilter({
                businessModels: businessModel,
                agentCode: representativeAgent?.code,
            })
        ).then(setDataGraphSalesByMonth);
    }

    useEffect(() => {
        doRequestGraphCurrentYearAgainstPreviousYear();
        doRequestSalesByMonth();
    }, []);


    useEffect(() => {
        doRequestGraphCurrentYearAgainstPreviousYear();
    },[
        intervalDays, businessModel, representativeAgent
    ]);

    useEffect(() => {
        doRequestSalesByMonth();
    },[
        businessModel, representativeAgent
    ]);

    return <div>
        <Card>
            <Box p={2} >
                <SingleSelectPeriodByDays value={intervalDays} onChange={setIntervalDays} />
                <ToggleB2BB2C values={businessModel} onChange={setBusinesModel} />
                <SingleSelectRepresentativeAgent
                    value={representativeAgent}
                    onChange={setRepresentativeAgent}
                    useB2C={businessModel.includes(BusinessModel.B2C)}
                    useB2B={businessModel.includes(BusinessModel.B2B)}
                />
            </Box>
        </Card>

        <Box mt={2} >
            <Card>
                <LoadingGraph loading={!dataGraphCurrentYearAgaintPreviousYear} >
                    {dataGraphCurrentYearAgaintPreviousYear && <CompareSellingCurrentYearAgainstPreviousYearGraph data={dataGraphCurrentYearAgaintPreviousYear} />}
                </LoadingGraph>
            </Card>
        </Box>

        <Box mt={2} >
            <Card>
                <LoadingGraph loading={!dataGraphSalesByMonth} >
                    {dataGraphSalesByMonth && <SalesByMonthGraph data={dataGraphSalesByMonth} />}
                </LoadingGraph>
            </Card>
        </Box>

        
    </div>;


};

export default memo(DashboardPage);