import type { RecentPrioritizationFees } from "@solana/web3.js";
import {
  Connection,
  type GetRecentPrioritizationFeesConfig,
} from "@solana/web3.js";
import axios from "axios";

interface GetRecentPrioritizationFeesByPercentileConfig
  extends GetRecentPrioritizationFeesConfig {
  percentile?: number;
  fallback?: boolean;
}

interface RpcResponse {
  jsonrpc: String;
  id?: String;
  result?: [];
  error?: any;
}

export const getRecentPrioritizationFeesByPercentile = async function (
  connection: Connection,
  config?: GetRecentPrioritizationFeesByPercentileConfig
): Promise<RecentPrioritizationFees[]> {
  const {
    percentile,
    fallback = true,
    lockedWritableAccounts = [],
  } = config || {};
  const promises = [];
  let tritonRpcResponse: RpcResponse | undefined = undefined;
  let fallbackRpcResponse: RpcResponse | undefined = undefined;

  promises.push(
    axios
      .post<RpcResponse>(connection.rpcEndpoint, {
        method: "getRecentPrioritizationFees",
        jsonrpc: "2.0",
        params: [lockedWritableAccounts, { percentile }],
        id: "1",
      })
      .then((result) => {
        tritonRpcResponse = result.data;
      })
  );

  if (fallback) {
    promises.push(
      axios
        .post(connection.rpcEndpoint, {
          method: "getRecentPrioritizationFees",
          jsonrpc: "2.0",
          params: [lockedWritableAccounts],
          id: "1",
        })
        .then((result) => {
          fallbackRpcResponse = result.data;
        })
    );
  }

  await Promise.all(promises);

  const tritonGRPFResponse = tritonRpcResponse as unknown as RpcResponse;
  const fallbackGRPFResponse = fallbackRpcResponse as unknown as RpcResponse;

  if (tritonGRPFResponse?.result) {
    return tritonGRPFResponse.result!;
  }

  if (fallbackGRPFResponse?.result) {
    return fallbackGRPFResponse.result!;
  }

  if (fallback && fallbackGRPFResponse.error) {
    return fallbackGRPFResponse.error;
  }

  if (tritonGRPFResponse) {
    return tritonGRPFResponse.error;
  }

  throw new Error("Failed to get prioritization fees");
};
