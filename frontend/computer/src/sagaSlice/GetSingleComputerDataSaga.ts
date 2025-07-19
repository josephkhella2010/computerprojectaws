import {
  fetchLoading,
  fetchError,
  fetchData,
  fetchSingleDataRequest,
} from "../sliceReducers/GetSingleComputerDataSlice";
import axios, { type AxiosResponse } from "axios";
import {
  call,
  put,
  takeLatest,
  type CallEffect,
  type PutEffect,
} from "redux-saga/effects";
import type { productsType } from "../helps/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";

// API call to fetch single product data
function fetchSingleData(id: number): Promise<AxiosResponse<productsType>> {
  return axios.get<productsType>(`http://localhost:5000/product/${id}`);
}

// Worker Saga: Handles the side effect
function* handleSingleData(
  action: PayloadAction<number>
): Generator<
  CallEffect<AxiosResponse<productsType>> | PutEffect,
  void,
  AxiosResponse<productsType>
> {
  try {
    yield put(fetchLoading());
    // Use an arrow function to call the API
    const response: AxiosResponse<productsType> = yield call(() =>
      fetchSingleData(action.payload)
    );
    yield put(fetchData(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(fetchError(error.message));
    } else {
      yield put(fetchError("An unknown error occurred"));
    }
  }
}

// Watcher Saga: Watches for fetchData and runs the worker saga
export function* watchSingleData() {
  yield takeLatest(fetchSingleDataRequest.type, handleSingleData);
}
