import { ITable } from '../../types/table';
import { Mode } from '../toolbox/constants';

export interface ITableInfoFormProps {
  submitAddTable: (newTable: ITable) => void;
  targetTable: ITable;
  isEdit: boolean;
}
