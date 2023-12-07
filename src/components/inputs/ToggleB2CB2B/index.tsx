import { BusinessModel } from '../../../models/enums/businessModel.enum';
import { ToggleCustom } from '../ToggleCustom';

export default function ToggleB2BB2C({ values, onChange } : { values: string[], onChange: Function }) {
  return (<ToggleCustom 
        title='Modelo'
        values={values}
        onChange={onChange}
        options={[ BusinessModel.B2B, BusinessModel.B2C ]}
    />);
}