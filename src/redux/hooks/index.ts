import { useDispatch , useSelector , TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;