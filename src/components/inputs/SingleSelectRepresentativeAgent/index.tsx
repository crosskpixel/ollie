import { memo, useEffect, useMemo, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { RepresentativeAgentItemResponse } from '../../../models/entity/representativeAgent';
import { RepresentativeAgentAPI } from '../../../api/representativeAgent';
import { Box, Input, ListSubheader } from '@mui/material';
import { destructArrayOfObjectsAndSearchByTerm } from '../../../utils';
import { BusinessModel } from '../../../models/enums/businessModel.enum';

export const SingleSelectRepresentativeAgent = memo((
    {
        value, 
        onChange,
        useB2B = true,
        useB2C = true,
    }
    :
    {
        value: RepresentativeAgentItemResponse | undefined | null,
        onChange: Function,
        useB2C: boolean,
        useB2B: boolean,
    }
) => {

  const [ representativesAgents, setRepresentativeAgents ] = useState<RepresentativeAgentItemResponse[] | undefined | null>(undefined);
  const [ searchTerm, setSearchTerm ] = useState("");

  const representativeAgentsToRender = useMemo(() => {
    return (searchTerm && representativesAgents) ?  destructArrayOfObjectsAndSearchByTerm(searchTerm, representativesAgents, ['code', 'name'])  :  representativesAgents
  }, [ representativesAgents, searchTerm ]);

  const b2bOptions = useMemo(() => useB2B == true && 
    representativeAgentsToRender?.filter(row => row.businessModel == BusinessModel.B2B) || [] 
  , [ representativeAgentsToRender, useB2B ]);

  const b2cOptions = useMemo(() => useB2C == true && 
    representativeAgentsToRender?.filter(row => row.businessModel == BusinessModel.B2C) || [] 
  ,[ representativeAgentsToRender, useB2C ]);

  useEffect(() => {
    if(
      (useB2B == false && value?.businessModel == BusinessModel.B2B) 
      || 
      (useB2C == false && value?.businessModel == BusinessModel.B2C) 
    ) {
      onChange(null);
    }

  }, [useB2B, useB2C])

  const onClick = (itemTouched: RepresentativeAgentItemResponse) => {
    onChange(itemTouched);
    setSearchTerm("");
  };

  useEffect(() => {
    RepresentativeAgentAPI.getListOrdenedByAgentCode().then(setRepresentativeAgents);
  }, []);

  return (
    <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel><b>Representante</b></InputLabel>
          <Select
            placeholder='Representante'
            value={value}
            onChange={event => {
              onChange(event.target.value);
              setSearchTerm("");
            }}
            label="Representante"
          >

            <Box p={1}>
              {representativesAgents && <Input autoFocus={true} placeholder='Pesquisa' fullWidth value={searchTerm} onChange={event => setSearchTerm(event?.target?.value || '')} ></Input>}
              {searchTerm && representativeAgentsToRender?.length == 0 && <span style={{fontSize:11, fontStyle:'italic'}} >Nenhum resultado encontrado para '{searchTerm}'</span>} 
              {!representativesAgents && <span style={{fontSize:11, fontStyle:'italic'}}  >Carregando...</span>}
              {representativesAgents && !useB2B && !useB2C && <span style={{fontSize:11, fontStyle:'italic'}}  >Nenhum modelo de{'\n'}negócio selecionado</span>}
            </Box>

            {b2bOptions.length > 0 && <ListSubheader>B2B</ListSubheader>}
            {b2bOptions.map(row => <MenuItem key={row.code} onTouchStart={() => onClick(row)} value={row}>{row.code} - {row.name}</MenuItem>)}

            {b2cOptions.length > 0 && <ListSubheader>B2C</ListSubheader>}
            {b2cOptions.map(row => <MenuItem key={row.code} onTouchStart={() => onClick(row)} value={row}>{row.code} - {row.name}</MenuItem>)}  
            
          </Select>
      </FormControl>
  );

});