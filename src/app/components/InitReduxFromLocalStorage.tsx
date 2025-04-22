"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setInitialState } from "../redux/features/calenderSlice";

const InitReduxFromLocalStorage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("calendarState");
    if (saved) {
      dispatch(setInitialState(JSON.parse(saved)));
    }
  }, [dispatch]);

  return null;
};

export default InitReduxFromLocalStorage;