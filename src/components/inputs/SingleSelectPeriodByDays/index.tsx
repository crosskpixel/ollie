import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';;
import { getNumericDaysBetweenBeginCurrentYearUntilNow } from '../../../utils';

export const SingleSelectPeriodByDays = ({ value, onChange }: { value: number, onChange: Function }) => {

  const dayOfYearNumeric = getNumericDaysBetweenBeginCurrentYearUntilNow();

  return (
    <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel><b>Período</b></InputLabel>
        <Select
          value={value}
          onChange={event => onChange(event.target.value)}
          label="Período"
        >
          <MenuItem value={7}>7 dias</MenuItem>
          <MenuItem value={30}>30 dias</MenuItem>
          <MenuItem value={60}>60 dias</MenuItem>
          <MenuItem value={90}>90 dias</MenuItem>
          <MenuItem value={dayOfYearNumeric}>{dayOfYearNumeric} dias</MenuItem>
          <MenuItem value={365}>365 dias</MenuItem>
        </Select>
      </FormControl>
  );
};