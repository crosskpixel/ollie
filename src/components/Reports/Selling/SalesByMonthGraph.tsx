
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { SalesByMonthResponse } from '../../../models/responses/SalesByMonth';
import { formatMilionsToAbreviation, numberToMoneyBrl, receiveNameOfMonthByNumberOfMonth, receiveYearMonthToNameOfMonthWithYear } from '../../../utils';
import { useState } from 'react';

export enum SalesByMonthGraphTypes {
  TOTAL="TOTAL",
  PAIRS="PAIRS",
}

export const SalesByMonthGraph = (
    { data }: { data: SalesByMonthResponse[] | null | undefined }
) => {

  const [type, setType] = useState<SalesByMonthGraphTypes>(SalesByMonthGraphTypes.TOTAL);

    let graphData: any[] = [];
    if(data){
      [...new Set(data.map(r => r.year))].forEach(year => {
        graphData.push({
          id: String(year), 
          data: data
                  .filter(r => r.year == year)
                  .map(r => ({
                    x: receiveNameOfMonthByNumberOfMonth(r.month, 'long'),
                    y: type == SalesByMonthGraphTypes.TOTAL ? r.total : r.pairs 
                  })),
        });
      })
    }

    return <Box width={"100%"} display={"flex"}  flexDirection={"column"} height={400} p={2} alignItems={"flex-start"} >
        <FormControl>
          <FormLabel>Relatório de total vendido / pares vendidos</FormLabel>
          <RadioGroup row value={type} >
              <FormControlLabel color='#fff' value={SalesByMonthGraphTypes.TOTAL} onClick={() => setType(SalesByMonthGraphTypes.TOTAL)} control={<Radio />} label="Total vendido" />
              <FormControlLabel value={SalesByMonthGraphTypes.PAIRS} onClick={() => setType(SalesByMonthGraphTypes.PAIRS)} control={<Radio />} label="Total de pares" />
          </RadioGroup>
        </FormControl>
        <div style={{ height: '500px', width:"100%" }}>
            <ResponsiveLine
                data={graphData}
                enableSlices="x"
                animate
                curve="monotoneX"
                sliceTooltip={({ slice } : { slice: any }) => <CustomSliceTooltip slice={slice} type={type} />}
                axisLeft={{
                  format: value => type == SalesByMonthGraphTypes.TOTAL ? numberToMoneyBrl(value) : formatMilionsToAbreviation(value),
                }}
                yScale={{
                  stacked: true,
                  type: 'linear'
                }}
                legends={[
                  {
                      anchor: 'bottom',
                      direction: 'row',
                      translateY: 50,
                      itemWidth: 100,
                      itemHeight: 10,
                  },
              ]}
              margin={{ 
                top:30, 
                right: 30, 
                bottom: 260, 
                left: type == SalesByMonthGraphTypes.TOTAL ? 120 : 80 
              }}
            />
            </div>
        </Box>
};

const CustomSliceTooltip = ({ slice, type } : { slice: any, type: SalesByMonthGraphTypes })  => {
  return <div style={{ background: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: 300 }}>
    {slice.points.map((point: any) => {
      return <div style={{display:"flex", flexDirection:"row", gap: 10, marginBottom: 5}} >
        <div style={{height: 20, width: 20, backgroundColor: point.color, borderRadius: 14, color:"black"}} > </div>
        <div style={{fontSize: 12}} >{receiveYearMonthToNameOfMonthWithYear(String(point.id).replace(".","-"))} : <b> {type == SalesByMonthGraphTypes.TOTAL ? numberToMoneyBrl(point.data.y) : `${point.data.y} pares`} </b></div>
      </div>
    })}
  </div>
}