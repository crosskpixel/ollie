
import { Box, FormControl, FormLabel } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import dayjs from 'dayjs';
import { numberToMoneyBrl, sufixNegativeOrPositiveString } from '../../../utils';
import { TooltipForNivuCursor } from '../../TooltipForNivuCursor';
import IndicatorCurrentYearAgainstPreviousYearResponse from '../../../models/responses/IndicatorCurrentYearAgainstPreviousYearResponse.ts';

export const CompareSellingCurrentYearAgainstPreviousYearGraph = ({ data }: { data: IndicatorCurrentYearAgainstPreviousYearResponse }) => {

  const currentYear  = String(dayjs().year());
  const previousYear = String(dayjs().year() - 1);

  const chartsData = [
    {
      metric: 'Quantidade de ordens',
      [currentYear]: data.current.quantityOfOrders,
      [previousYear]: data.lastPeriod.quantityOfOrders,
    },
    {
      metric: 'Itens vendidos',
      [currentYear]: data.current.itemsSold,
      [previousYear]:  data.lastPeriod.itemsSold,
    },
    {
      metric: 'Valor das Ordens',
      [currentYear]: data.current.ordersValue,
      [previousYear]: data.lastPeriod.ordersValue,
    },
  ];

  return (
    <Box width={"100%"} display={"flex"} p={2} flexDirection={"column"} height={300} >

      <FormControl>
        <FormLabel>Indicador de vendas</FormLabel>
      </FormControl>

      <Box display="flex" flexDirection="row" >
        {chartsData.map((chatValues) => {
              return <Box flex={1} height={300} >
                      <ResponsiveBar
                          data={[chatValues]}
                          keys={[
                              previousYear,
                              currentYear
                          ]}
                          indexBy="metric"
                          margin={{ top: 30, right: 30, bottom: 70, left: 120 }}
                          padding={0.5}
                          groupMode="grouped"
                          legends={[
                              {
                                  dataFrom: 'keys',
                                  anchor: 'bottom',
                                  direction: 'row',
                                  translateY: 50,
                                  itemWidth: 100,
                                  itemHeight: 10,
                              },
                          ]}
                          valueFormat={value => {
                              const valueCurrentYear = Number(chatValues[String(currentYear)]);
                              const valuePreviousYear = Number(chatValues[String(previousYear)]);

                              if(value == valueCurrentYear) {
                                if(valueCurrentYear > 0 && valuePreviousYear > 0) {
                                      const percentageDiff = Number(((valueCurrentYear - valuePreviousYear) / Math.abs(valuePreviousYear)) * 100).toFixed(2);
                                      return numberToMoneyBrl(value) + ` (${sufixNegativeOrPositiveString(percentageDiff)}%)`
                                }
                              }
                              return numberToMoneyBrl(value)
                          }}
                          tooltip={(tooltip) => <TooltipForNivuCursor><h3>{tooltip.label} : {numberToMoneyBrl(tooltip.value)}</h3></TooltipForNivuCursor>}
                          axisLeft={{
                              format: numberToMoneyBrl,
                          }}
                      />
              </Box>
          })}
      </Box>

    </Box>
    
  );
};