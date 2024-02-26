# `getRecentPrioritizationFees` Trition Example

Ref: [JSON RPC getrecentprioritizationfees](https://solana.com/docs/rpc/http/getrecentprioritizationfees)

This repo contains example usage of the `percentile` flag in the `getRecentPrioritizationFees` JSON RPC call to Triton's Solana RPC endpoints.

### How to use it?
This repo contains a function `getRecentPrioritizationFeesByPercentile` in `src/grpf.ts` that you can directly copy paste in your code and start using it. See the example usage in `/tests/grpf2.test.ts`

Function Details:
`getRecentPrioritizationFeesByPercentile`
Params:
```
connection: @solana/web3.js.Connection;
config: GetRecentPrioritizationFeesByPercentileConfig {
      lockedWritableAccounts?: PublicKey[];
      percentile?: number | PriotitizationFeeLevels, allowed range: 1 - 10_000;
      fallback?: boolean, default: true;
}
slotsToReturn?: n number of slots will returned. By default RPC returns 150
```  

`PriotitizationFeeLevels` is an enum for user convenience which has numeric values. It is intended to keep the percentile values less confusing for the users

Returns: `RecentPrioritizationFees[]` same as `Connection.getRecentPrioritizationFees`

To maintain compatibility with other RPC providers who might not support the `percentile` parameter, this function takes in a `fallback` parameter which defaults to `true`. The function makes 2 JSON RPC calls in parallel with and without the `percentile` parameter. If your RPC is Triton, you'll get the result returned by it. If not, you'll get the result returned by your other RPC provider.
