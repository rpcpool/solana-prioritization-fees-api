import { Connection } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { getRecentPrioritizationFeesByPercentile } from "../src/grpf";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const RPC_ENDPOINT = process.env.RPC_ENDPOINT || "http://localhost:27899";

describe("gRPF with percentile test", () => {
  const connection = new Connection(RPC_ENDPOINT);

  describe("should call getRecentPrioritizationFeesByPercentile", () => {
    it(`params: []`, async () => {
      const result = await getRecentPrioritizationFeesByPercentile(
        connection,
        {}
      );
      console.log(result);

      expect(result.length).toBeGreaterThan(0);
    });

    it(`params: [[],{"percentile":5000}]`, async () => {
      const result = await getRecentPrioritizationFeesByPercentile(connection, {
        lockedWritableAccounts: [],
        percentile: 5000,
        fallback: true,
      });
      expect(result.length).toBeGreaterThan(0);
    });

    it(`params: ["RNXnAJV1DeBt6Lytjz4wYzvS3d6bhsfidS5Np4ovwZz"]`, async () => {
      const result = await getRecentPrioritizationFeesByPercentile(connection, {
        lockedWritableAccounts: [
          new PublicKey("RNXnAJV1DeBt6Lytjz4wYzvS3d6bhsfidS5Np4ovwZz"),
        ],
        fallback: false,
      });
      expect(result.length).toBeGreaterThan(0);
    });

    it(`params: [["RNXnAJV1DeBt6Lytjz4wYzvS3d6bhsfidS5Np4ovwZz"],{"percentile":5000}]`, async () => {
      const result = await getRecentPrioritizationFeesByPercentile(connection, {
        lockedWritableAccounts: [
          new PublicKey("RNXnAJV1DeBt6Lytjz4wYzvS3d6bhsfidS5Np4ovwZz"),
        ],
        percentile: 5000,
        fallback: true,
      });
      expect(result.length).toBeGreaterThan(0);
    });

    it(`params: invalid percentile 50000`, async () => {
      const result = await getRecentPrioritizationFeesByPercentile(connection, {
        lockedWritableAccounts: [
          new PublicKey("RNXnAJV1DeBt6Lytjz4wYzvS3d6bhsfidS5Np4ovwZz"),
        ],
        percentile: 50000,
        fallback: false,
      });

      expect(
        (result as unknown as { code: String; message: String }).message
      ).toEqual("Percentile is too big; max value is 10000");
    });
  });
});
