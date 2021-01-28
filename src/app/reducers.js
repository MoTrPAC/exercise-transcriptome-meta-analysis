import { combineReducers } from 'redux';
import analysisReducer, {
  defaultAnalysisState,
} from '../features/analysis/analysisReducer';

export default combineReducers({
  analysis: analysisReducer,
});

export const defaultRootState = {
  analysis: defaultAnalysisState,
};
