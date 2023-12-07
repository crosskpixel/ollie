import ToggleButton from '@mui/material/ToggleButton';
import FormControl from '@mui/material/FormControl';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, Typography } from '@mui/material';
import { colorsConstants } from '../../../constants/colors';

export function ToggleCustom ({ title, values, onChange, options } : { title: string, values: string[], onChange: Function, options: string[] }) {
    return <FormControl sx={{ m: 1, minWidth: 100, border: '1px solid rgba(0, 0, 0, 0.257)', position:'relative', borderRadius: 1 }}>
        <Box m={0} sx ={{ background:"white" ,width: 'fit-content', lineHeight: 0.5, paddingLeft: 1, paddingRight: 1, top: -9, left: 5, position:'absolute'  }}>
            <Typography 
                variant='caption' 
                fontWeight={"600"} 
                color={colorsConstants.titleOutlinedInput} 
                lineHeight={1.3}
                m={0}
                p={0}
            >
                {title}
            </Typography>
        </Box>
        <Box padding={1} >
            <ToggleButtonGroup
                color='info'
                size="small" 
                value={values}
                onChange={(e, values) => {
                    e.preventDefault();
                    onChange(values);
                }}
                >
                    {options.map(option => <ToggleButton key={option} sx={{border: `1px solid rgba(0, 0, 0, 0.2)`}} autoFocus={false}  value={option} ><b>{option}</b></ToggleButton>)}
            </ToggleButtonGroup>
        </Box>
    </FormControl>;
}
