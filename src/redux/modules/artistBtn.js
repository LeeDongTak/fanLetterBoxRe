import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artistMember: [
    {
      id: 1,
      artistName: "사쿠라",
      artistImg:
        "https://i.namu.wiki/i/lJTr05p9uoXoaRlJ8rADt0PQve61T_s5zwq5YkGC4SuQvqZyIVG9NRfMkupOz2WVjlMOilw3WVQeBf0KrlRywBpbfSN95S4j9iF4A5n9VjMs-f8Rc73OooxHK5ygg3bYYHvxXEVsjWuSL0Pz_z2HLQ.webp",
      status: true,
    },
    {
      id: 2,
      artistName: "김채원",
      artistImg:
        "https://i.namu.wiki/i/fFuCoFBK0i3q-QQa2r4WaYmSmFsr0JWZkU4voC8AvukrxTEOUc-L-ie38xEshAX8dhEOK1wa8nMG5cNPgk7ZeInAXPykJXmmCOOFWccJaPa6EGWgBUTfAAH0565jqPCd0B7am8T604_sO1MGPUTJfA.webp",
      status: false,
    },
    {
      id: 3,
      artistName: "허윤진",
      artistImg:
        "https://i.namu.wiki/i/gB0e91oFG4NBN8rqoQ4Cgc7ql0yN7E7vsuT2KWCJ6Nr1bA34yG1shAw2G8b6JvSwF-AzvsjIc60Uz1MiQtsKAHfhfWCEgmKS_Nl-ZlWbLjOlKU_eLI-aF4oxTquUGf5Mj-CmpKulF0II7mSWI0thog.webp",
      status: false,
    },
    {
      id: 4,
      artistName: "카즈하",
      artistImg:
        "https://i.namu.wiki/i/25IiKUZw7sF-9NqKerRmyoiq9xL7RbwEfvSE-MZ0w5_7u6APPWSthiY8dvRFq7M5aJjPwzQHWHBw-GIuBNdmpXmQ1Mrd919vfTr60Cizhi6cdJT3QkWvn1ebxph8ikzers5uyusZ9nfjbIDNjhf3Zw.webp",
      status: false,
    },
    {
      id: 5,
      artistName: "홍은채",
      artistImg:
        "https://i.namu.wiki/i/xcm1AsNXkKwWXrh8fhDohOTHmLN5eKVwolyZSAwxlrBc4yT3-u0FwVDFWB44PZC-0RDsw9lufySyUuZpW6rK3Aa6_Th3PHNyq_8fhzjBQDflBAP0zdoqBm_NkEiTiOSErBKYRU3QPVtsBVcaE4DmpA.webp",
      status: false,
    },
  ], // 르세라핌 맴버 리스트
};

const artistBtn = createSlice({
  name: "artistBtn",
  initialState,
  reducers: {
    memberCoice: (state, action) => {
      const member = state.artistMember.map((item) => {
        return item.id === action.payload
          ? { ...item, status: true }
          : { ...item, status: false };
      });
      state.artistMember = [...member];
    },
  },
});

export const { memberCoice } = artistBtn.actions;
export default artistBtn.reducer;
