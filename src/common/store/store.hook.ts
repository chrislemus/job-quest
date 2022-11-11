import { UseDispatch, UseSelector } from './store.type';
import {
  useSelector as _useSelector,
  useDispatch as _useDispatch,
} from 'react-redux';

export const useSelector: UseSelector = _useSelector;
export const useDispatch: () => UseDispatch = _useDispatch;
