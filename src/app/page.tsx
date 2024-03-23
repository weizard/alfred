/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import DebtTokenABI from "../DebtTokenABI.json";
import Modal from "@/components/Modal";
import PercentageInput from "@/components/PercentageInput";
import ProtocolinkABI from "../ProtocolinkABI.json";
import axios from "axios";
import * as common from "@protocolink/common";
import * as lending from "@protocolink/lending";
import { maxUint256 } from "viem";
import { now } from "@/utils";
import { optimismDebtTokenMap, polygonDebtTokenMap } from "@/tokens";
import { polygon } from "wagmi/chains";
import { signTypedData } from "@wagmi/core";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { wagmiConfig } from "./providers";

lending.Adapter.registerProtocol(lending.protocols.aavev3.LendingProtocol);
lending.Adapter.registerSwapper(lending.swappers.paraswapv5.LendingSwapper);

export default function Home() {
  const protocolinkAddress = "0xDec80E988F4baF43be69c13711453013c212feA8";
  const { address, chainId } = useAccount();

  const alfredAddress =
    chainId === polygon.id
      ? "0xBF2Be1ab6668A21880629aD6c259704fa566e349"
      : "0x372cb3E72bBbF1fF421045fa9096C4d590B2E939";

  const { writeContract } = useWriteContract();
  const [adapter, setAdapter] = useState<lending.Adapter | undefined>(
    undefined
  );

  const [portfolio, setPortfolio] = useState<lending.Portfolio | undefined>(
    undefined
  );

  const [open, setOpen] = useState(false);

  const [delegated, setDelegated] = useState(false);

  const [leverageCeiling, setLeverageCeiling] = useState(160);
  const [leverageTarget, setLeverageTarget] = useState(150);
  const [leverageFloor, setLeverageFloor] = useState(140);

  const [expiredIn, setExpiredIn] = useState(30);

  const [isPendingAllow, setIsPendingAllow] = useState(false);
  const [isPendingDelegate, setIsPendingDelegate] = useState(false);

  const [leverageCollateralToken, setLeverageCollateralToken] =
    useState<string>(common.getNativeToken(chainId ?? 1).address);
  const [leverageDebtToken, setLeverageDebtToken] = useState<string>(
    common.getNativeToken(chainId ?? 1).address
  );

  useEffect(() => {
    if (chainId) setAdapter(new lending.Adapter(chainId));
    else setAdapter(undefined);
  }, [chainId]);

  const handleClick = () => {
    (async () => {
      const targetRatio = BigInt(leverageTarget * 100);
      const floorRatio = BigInt(leverageFloor * 100);
      const ceilingRatio = BigInt(leverageCeiling * 100);
      const deadline = BigInt(now() + expiredIn * 86400);

      const sig = await signTypedData(wagmiConfig, {
        domain: {
          name: "Alfred",
          chainId,
          verifyingContract: alfredAddress,
          version: "1",
        },
        types: {
          Task: [
            { name: "targetRatio", type: "uint256" },
            { name: "floorRatio", type: "uint256" },
            { name: "ceilingRatio", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        primaryType: "Task",
        message: {
          targetRatio,
          floorRatio,
          ceilingRatio,
          deadline,
        },
      });

      const url = `${process.env.NEXT_PUBLIC_SERVICE_ENDPOINT}/task/${address}`;
      axios.post(url, {
        collateral_token_address: leverageCollateralToken,
        borrow_token_address: leverageDebtToken,
        target_ratio: Number(targetRatio),
        floor_ratio: Number(floorRatio),
        ceiling_ratio: Number(ceilingRatio),
        signature: sig,
        chain_id: chainId,
        deadline: Number(deadline),
      });

      setOpen(false);
    })();
  };

  const { data, isLoading } = useReadContract({
    address: protocolinkAddress,
    abi: ProtocolinkABI,
    functionName: "delegations",
    args: [address, alfredAddress],
    query: {
      refetchInterval: 5000,
      refetchOnMount: true,
    },
  });

  const { data: agentAddress } = useReadContract({
    address: protocolinkAddress,
    abi: ProtocolinkABI,
    functionName: "calcAgent",
    args: [address],
  });

  const getDebtToken = (underlying: string): `0x${string}` => {
    // @ts-ignore
    return chainId === polygon.id
      ? polygonDebtTokenMap[underlying]?.variableAddress
      : optimismDebtTokenMap[underlying]?.variableAddress;
  };
  const { data: delegatedAmount } = useReadContract({
    address: getDebtToken(leverageDebtToken),
    abi: DebtTokenABI,
    functionName: "borrowAllowance",
    args: [address, agentAddress],
  });

  useEffect(() => {
    if (!data) return;
    setDelegated(false);
    const _expiredIn = BigInt(now());
    const expiry = (data as [bigint, bigint])[0];
    if (expiry > _expiredIn) setDelegated(true);
  }, [data, isLoading]);

  console.log("delegated :>> ", delegated);
  console.log("delegatedAmount :>> ", delegatedAmount);
  console.log("agentAddress :>> ", agentAddress);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("refresh");
      setRefresh((prevState) => prevState + 1);
    }, 10000);

    return () => {
      console.log("kill");
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (!adapter || !address) {
        setPortfolio(undefined);
        return;
      }
      console.log("update portfolio");

      const account = address;
      const protocolId = "aave-v3";
      const marketId = chainId === polygon.id ? "polygon" : "optimism";
      const portfolio = await adapter.getPortfolio(
        account,
        protocolId,
        marketId
      );

      setPortfolio(portfolio);
    })();
  }, [adapter, address, refresh]);

  console.log(
    "isPendingAllow , isPendingDelegate :>> ",
    isPendingAllow,
    isPendingDelegate
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl text-blue-800 font-bold underline">Alfred</h1>
      <div className="py-4">
        <ConnectButton />
      </div>
      <div className="py-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setOpen(true)}
        >
          leverage
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="font-bold text-lg">Automation Leverage</h3>
        <p className="py-4">choose action and token you want</p>

        <div>
          collateral
          {portfolio?.supplies && (
            <select
              className="select select-info"
              value={leverageCollateralToken}
              onChange={(e) => setLeverageCollateralToken(e.target.value)}
            >
              {portfolio.supplies.map((supply) => (
                <option
                  key={`supply-${supply.token.symbol}`}
                  value={supply.token.address}
                >
                  {supply.token.symbol}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          debt
          {portfolio?.borrows && (
            <select
              className="select select-info"
              value={leverageDebtToken}
              onChange={(e) => setLeverageDebtToken(e.target.value)}
            >
              {portfolio.borrows.map((supply) => (
                <option
                  key={`supply-${supply.token.symbol}`}
                  value={supply.token.address}
                >
                  {supply.token.symbol}
                </option>
              ))}
            </select>
          )}
        </div>
        <p className="py-4">
          If the health rate exceeds the ratio you set, it will automatically
          adjust to the target ratio you set.
        </p>
        <div>
          ceiling ratio:
          <PercentageInput
            value={leverageCeiling}
            error={leverageCeiling < leverageTarget}
            onChange={(e: any) => setLeverageCeiling(Number(e.target.value))}
          />
        </div>
        <div>
          target ratio:
          <PercentageInput
            value={leverageTarget}
            onChange={(e: any) => setLeverageTarget(Number(e.target.value))}
          />
        </div>
        <div>
          floor ratio:
          <PercentageInput
            value={leverageFloor}
            error={leverageFloor > leverageTarget}
            onChange={(e: any) => setLeverageFloor(Number(e.target.value))}
          />
        </div>
        <div>
          expire in:
          <label className="flex items-center gap-2">
            <input
              type="number"
              className={`input mt-1 block w-full shadow-sm sm:text-sm rounded-md py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300`}
              value={expiredIn}
              onChange={(e: any) => setExpiredIn(Number(e.target.value))}
            />
            days
          </label>
        </div>

        <div className="modal-action">
          {!delegated || delegatedAmount === 0n ? (
            <button
              className="btn"
              onClick={() => {
                if (!delegated) {
                  setIsPendingAllow(true);

                  writeContract(
                    {
                      address: protocolinkAddress,
                      abi: ProtocolinkABI,
                      functionName: "allow",
                      args: [alfredAddress, BigInt(now() + expiredIn * 86400)],
                    },
                    {
                      onSettled: () => {
                        setIsPendingAllow(false);
                      },
                    }
                  );
                }

                if ((delegatedAmount as bigint) === 0n) {
                  setIsPendingDelegate(true);
                  writeContract(
                    {
                      address: getDebtToken(leverageDebtToken),
                      abi: DebtTokenABI,
                      functionName: "approveDelegation",
                      args: [agentAddress, maxUint256],
                    },
                    {
                      onSettled: () => {
                        setIsPendingDelegate(false);
                      },
                    }
                  );
                }
              }}
            >
              {isPendingAllow || isPendingDelegate ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Delegate"
              )}
            </button>
          ) : (
            <button className="btn" onClick={handleClick}>
              Create Task
            </button>
          )}
        </div>
      </Modal>

      <div>
        healthRate:
        {portfolio && (Number(portfolio.healthRate) * 100).toFixed(2)}%
      </div>
      <div className="flex justify-between space-x-3 w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          {portfolio?.supplies &&
            portfolio.supplies.map((supply, i) => {
              return (
                <div
                  className="block text-sm font-medium text-gray-700"
                  key={`supply-${i}`}
                >
                  {supply.token.symbol} -{" "}
                  {`${(Number(supply.apy) * 100).toFixed(2)}%`} -{" "}
                  {supply.balance}
                </div>
              );
            })}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          {portfolio?.borrows &&
            portfolio.borrows.map((borrow, i) => {
              return (
                <div
                  className="block text-sm font-medium text-gray-700"
                  key={`supply-${i}`}
                >
                  {borrow.token.symbol} -{" "}
                  {`${(Number(borrow.apy) * 100).toFixed(2)}%`} -{" "}
                  {borrow.balance}
                </div>
              );
            })}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg my-6 p-6 w-full max-w-md">
        <div className="space-y-1">
          <label className="block text-sm text-center font-medium text-gray-700">
            Tasks
          </label>
        </div>
      </div>
    </main>
  );
}
