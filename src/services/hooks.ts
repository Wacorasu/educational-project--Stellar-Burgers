import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';
  import { AppDispatch, AppThunk, RootState } from './types/index';
  
  export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();
  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
