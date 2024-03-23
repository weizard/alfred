const polygonDebtTokenInfos = [
  {
    token: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
    stableAddress: "0xfAeF6A702D15428E588d4C0614AEFb4348D83D48",
    variableAddress: "0xE80761Ea617F66F96274eA5e8c37f03960ecC679",
  },
  {
    token: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    stableAddress: "0xd94112B5B62d53C9402e7A60289c6810dEF1dC9B",
    variableAddress: "0x8619d80FB0141ba7F184CbF22fd724116D9f7ffC",
  },
  {
    token: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    stableAddress: "0x70eFfc565DB6EEf7B927610155602d31b670e802",
    variableAddress: "0xfb00AC187a8Eb5AFAE4eACE434F493Eb62672df7",
  },
  {
    token: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
    stableAddress: "0x89D976629b7055ff1ca02b927BA3e020F22A44e4",
    variableAddress: "0x953A573793604aF8d41F306FEb8274190dB4aE0e",
  },
  {
    token: "0x0000000000000000000000000000000000001010",
    stableAddress: "0xF15F26710c827DDe8ACBA678682F3Ce24f2Fb56E",
    variableAddress: "0x4a1c3aD6Ed28a636ee1751C69071f6be75DEb8B8",
  },
  {
    token: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    stableAddress: "0xF15F26710c827DDe8ACBA678682F3Ce24f2Fb56E",
    variableAddress: "0x4a1c3aD6Ed28a636ee1751C69071f6be75DEb8B8",
  },
  {
    token: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    stableAddress: "0x307ffe186F84a3bc2613D1eA417A5737D69A7007",
    variableAddress: "0xFCCf3cAbbe80101232d343252614b6A3eE81C989",
  },
  {
    token: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    stableAddress: "0xc889e9f8370D14A428a9857205d99BFdB400b757",
    variableAddress: "0xE701126012EC0290822eEA17B794454d1AF8b030",
  },
  {
    token: "0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4",
    stableAddress: "0x40B4BAEcc69B882e8804f9286b12228C27F8c9BF",
    variableAddress: "0x3ca5FA07689F266e907439aFd1fBB59c44fe12f6",
  },
  {
    token: "0xE111178A87A3BFf0c8d18DECBa5798827539Ae99",
    stableAddress: "0x8a9FdE6925a839F6B1932d16B36aC026F8d3FbdB",
    variableAddress: "0x5D557B07776D12967914379C71a1310e917C7555",
  },
  {
    token: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    stableAddress: "0x633b207Dd676331c413D4C013a6294B0FE47cD0e",
    variableAddress: "0x92b42c66840C7AD907b4BF74879FF3eF7c529473",
  },
  {
    token: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    stableAddress: "0xD8Ad37849950903571df17049516a5CD4cbE55F6",
    variableAddress: "0x0c84331e39d6658Cd6e6b9ba04736cC4c4734351",
  },
  // {
  //   token: "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
  //   stableAddress: '0x08Cb71192985E936C7Cd166A8b268035e400c3c3',
  //   variableAddress: '0x77CA01483f379E58174739308945f044e1a764dc',
  // },
  {
    token: "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a",
    stableAddress: "0x78246294a4c6fBf614Ed73CcC9F8b875ca8eE841",
    variableAddress: "0x34e2eD44EF7466D5f9E0b782B5c08b57475e7907",
  },
  {
    token: "0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7",
    stableAddress: "0x3EF10DFf4928279c004308EbADc4Db8B7620d6fc",
    variableAddress: "0xCE186F6Cccb0c955445bb9d10C59caE488Fea559",
  },
  // {
  //   token: "0x4e3Decbb3645551B8A19f0eA1678079FCB33fB4c",
  //   stableAddress: '0x6B4b37618D85Db2a7b469983C888040F7F05Ea3D',
  //   variableAddress: '0x44705f578135cC5d703b4c9c122528C73Eb87145',
  // },
  {
    token: "0x85955046DF4668e1DD369D2DE9f3AEB98DD2A369",
    stableAddress: "0xDC1fad70953Bb3918592b6fCc374fe05F5811B6a",
    variableAddress: "0xf611aEb5013fD2c0511c9CD55c7dc5C1140741A6",
  },
  {
    token: "0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3",
    stableAddress: "0xa5e408678469d23efDB7694b1B0A85BB0669e8bd",
    variableAddress: "0xA8669021776Bc142DfcA87c21b4A52595bCbB40a",
  },
  // {
  //   token: "0xa3Fa99A148fA48D14Ed51d610c367C61876997F1",
  //   stableAddress: '0x687871030477bf974725232F764aa04318A8b9c8',
  //   variableAddress: '0x18248226C16BF76c032817854E7C83a2113B4f06',
  // },
  {
    token: "0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6",
    stableAddress: "0x62fC96b27a510cF4977B59FF952Dc32378Cc221d",
    variableAddress: "0xB5b46F918C2923fC7f26DB76e8a6A6e9C4347Cf9",
  },
  {
    token: "0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4",
    stableAddress: "0x1fFD28689DA7d0148ff0fCB669e9f9f0Fc13a219",
    variableAddress: "0x6b030Ff3FB9956B1B69f475B77aE0d3Cf2CC5aFa",
  },
  {
    token: "0x03b54A6e9a984069379fae1a4fC4dBAE93B3bCCD",
    stableAddress: "0x173e54325AE58B072985DbF232436961981EA000",
    variableAddress: "0x77fA66882a8854d883101Fb8501BD3CaD347Fc32",
  },
];

export const polygonDebtTokenMap = polygonDebtTokenInfos.reduce<
  Record<
    string,
    {
      token: string;
      stableAddress: string;
      variableAddress: string;
    }
  >
>((acc, tokenInfo) => {
  acc[tokenInfo.token] = tokenInfo;
  return acc;
}, {});

const optimismDebtTokenInfos = [
  {
    token: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    stableAddress: "0xd94112B5B62d53C9402e7A60289c6810dEF1dC9B",
    variableAddress: "0x8619d80FB0141ba7F184CbF22fd724116D9f7ffC",
  },
  {
    token: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
    stableAddress: "0xF15F26710c827DDe8ACBA678682F3Ce24f2Fb56E",
    variableAddress: "0x4a1c3aD6Ed28a636ee1751C69071f6be75DEb8B8",
  },
  {
    token: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    stableAddress: "0x307ffe186F84a3bc2613D1eA417A5737D69A7007",
    variableAddress: "0xFCCf3cAbbe80101232d343252614b6A3eE81C989",
  },
  {
    token: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    stableAddress: "0x8a9FdE6925a839F6B1932d16B36aC026F8d3FbdB",
    variableAddress: "0x5D557B07776D12967914379C71a1310e917C7555",
  },
  {
    token: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    stableAddress: "0x70eFfc565DB6EEf7B927610155602d31b670e802",
    variableAddress: "0xfb00AC187a8Eb5AFAE4eACE434F493Eb62672df7",
  },
  {
    token: "0x76FB31fb4af56892A25e32cFC43De717950c9278",
    stableAddress: "0xfAeF6A702D15428E588d4C0614AEFb4348D83D48",
    variableAddress: "0xE80761Ea617F66F96274eA5e8c37f03960ecC679",
  },
  {
    token: "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6",
    stableAddress: "0x89D976629b7055ff1ca02b927BA3e020F22A44e4",
    variableAddress: "0x953A573793604aF8d41F306FEb8274190dB4aE0e",
  },
  {
    token: "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
    stableAddress: "0x633b207Dd676331c413D4C013a6294B0FE47cD0e",
    variableAddress: "0x92b42c66840C7AD907b4BF74879FF3eF7c529473",
  },
  {
    token: "0x4200000000000000000000000000000000000006",
    stableAddress: "0xD8Ad37849950903571df17049516a5CD4cbE55F6",
    variableAddress: "0x0c84331e39d6658Cd6e6b9ba04736cC4c4734351",
  },
  {
    token: "0x0000000000000000000000000000000000000000",
    stableAddress: "0xD8Ad37849950903571df17049516a5CD4cbE55F6",
    variableAddress: "0x0c84331e39d6658Cd6e6b9ba04736cC4c4734351",
  },
  {
    token: "0xc40F949F8a4e094D1b49a23ea9241D289B7b2819",
    stableAddress: "0x3EF10DFf4928279c004308EbADc4Db8B7620d6fc",
    variableAddress: "0xCE186F6Cccb0c955445bb9d10C59caE488Fea559",
  },
  {
    token: "0x4200000000000000000000000000000000000042",
    stableAddress: "0x08Cb71192985E936C7Cd166A8b268035e400c3c3",
    variableAddress: "0x77CA01483f379E58174739308945f044e1a764dc",
  },
  {
    token: "0x9Bcef72be871e61ED4fBbc7630889beE758eb81D",
    stableAddress: "0xDC1fad70953Bb3918592b6fCc374fe05F5811B6a",
    variableAddress: "0xf611aEb5013fD2c0511c9CD55c7dc5C1140741A6",
  },
];

export const optimismDebtTokenMap = optimismDebtTokenInfos.reduce<
  Record<
    string,
    {
      token: string;
      stableAddress: string;
      variableAddress: string;
    }
  >
>((acc, tokenInfo) => {
  acc[tokenInfo.token] = tokenInfo;
  return acc;
}, {});
