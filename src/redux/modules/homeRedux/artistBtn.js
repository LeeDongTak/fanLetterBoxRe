const MEMBER_CHOICE = "MEMBER_CHOICE";

export const memberCoice = (payload) => {
  return {
    type: MEMBER_CHOICE,
    payload,
  };
};

const initalState = {
  artistMember: [
    {
      id: 1,
      artistName: "사쿠라",
      artistImg:
        "https://i.namu.wiki/i/GN0r1RXrUvePBt17HH_wKxMdT-QAYSN6w2Z51nB1oB9p67OHXC6BVPSBbPFB3UiD1q6343xlrDQPRXHQm20nVMCW31-Tn0kCDLcyvoLbl73ZFb1WEie04LZyQEisg_sR4JhKZNVw25clbSkDXFEwBA.webp",
      status: true,
    },
    {
      id: 2,
      artistName: "김채원",
      artistImg:
        "https://i.namu.wiki/i/2yDEjjBpqnZGidxPZBnNsHtIQam4eTO8hjvuol5igY-x2cJvMF89XbhQhzVZ3Fvo_z6Hh5aOdAwUDJg2Bvl77Y8G1GY-1yZ6ccHHxOZ-z5KFnNtVPzyEM8JT0mHiBjKQa89ub7_3dI43GoXRfJBPwg.webp",
      status: false,
    },
    {
      id: 3,
      artistName: "허윤진",
      artistImg:
        "https://i.namu.wiki/i/mqNwRedHkivTuVkkbWK5RK61CIvam1S1g_SnIwoquTou6KT77nNl-b6YcGCu5N4xJaQB7fTC9AdxIvq0EWjnwQu1zqTN9a1EcXuAvDCuWOiqlRttOhryZYiUjAmUAjzQ9s1i9BBWFnpZyK5t34T2_g.webp",
      status: false,
    },
    {
      id: 4,
      artistName: "카즈하",
      artistImg:
        "https://i.namu.wiki/i/F4Vg2qFHgDWrg40a_vsfeDQpxDPLPh0yw8bt4WFtIs3umbxWAYNfB-rg6gd7eDmvBj-vo-3-SpYA1mHK8v1Fy92t-_OHOFgWFd_U6fJbfupp-aFv3re7ij1DHrstaaTOBQliOWAtrkAVOYTLCb-8wg.webp",
      status: false,
    },
    {
      id: 5,
      artistName: "홍은채",
      artistImg:
        "https://i.namu.wiki/i/VT7_F2XjBGLhAZZkQKn5G1q87SiXvcbtoRjLM6-JRM0yQY7gXmQ8Ret4mW98aCUZvGdCmZWTcervdyd2oCG4x7mKiBekwsOTcRHfO_7O5fmLoNqEqvohux2tLUZ0D5C5XcGC7pXb5qEqeNdxz4EX1g.webp",
      status: false,
    },
  ], // 르세라핌 맴버 리스트
};

const artistBtn = (state = initalState, action) => {
  switch (action.type) {
    case MEMBER_CHOICE:
      const member = state.artistMember.map((item) => {
        return item.id === action.payload
          ? { ...item, status: true }
          : { ...item, status: false };
      });
      return {
        artistMember: [...member],
      };

    default:
      return state;
      break;
  }
};

export default artistBtn;
