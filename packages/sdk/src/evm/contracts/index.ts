import { getPrebuiltInfo } from "../common/legacy";
import { ALL_ROLES } from "../common/role";
import { getSignerAndProvider } from "../core/classes/rpc-connection-handler";
import type {
  ContractType,
  NetworkOrSignerOrProvider,
  PrebuiltContractType,
} from "../core/types";
import {
  DropErc1155ContractSchema,
  DropErc721ContractSchema,
  MarketplaceContractSchema,
  PackContractSchema,
  SDKOptions,
  SplitsContractSchema,
  TokenErc1155ContractSchema,
  TokenErc20ContractSchema,
  TokenErc721ContractSchema,
  VoteContractSchema,
} from "../schema";
import { CustomContractSchema } from "../schema/contracts/custom";
import { DropErc20ContractSchema } from "../schema/contracts/drop-erc20";
import { MultiwrapContractSchema } from "../schema/contracts/multiwrap";
import type { ThirdwebStorage } from "@thirdweb-dev/storage";
import { ethers } from "ethers";

type InitalizeParams = [
  network: NetworkOrSignerOrProvider,
  address: string,
  storage: ThirdwebStorage,
  options?: SDKOptions,
];

export const EditionDropInitializer = {
  name: "DropERC1155" as const,
  contractType: "edition-drop" as const,
  schema: DropErc1155ContractSchema,
  roles: ["admin", "minter", "transfer"] as const,
  initialize: async (
    ...[network, address, storage, options]: InitalizeParams
  ) => {
    const [, provider] = getSignerAndProvider(network, options);
    const [abi, contract, _network] = await Promise.all([
      await EditionDropInitializer.getAbi(address, provider),
      import("./prebuilt-implementations/edition-drop"),
      provider.getNetwork(),
    ]);

    return new contract.EditionDrop(
      network,
      address,
      storage,
      options,
      abi,
      _network.chainId,
    );
  },
  getAbi: async (address: string, provider: ethers.providers.Provider) => {
    const contractInfo = await assertContractType(
      address,
      provider,
      "edition-drop",
    );
    return contractInfo.version > 2
      ? (await import("@thirdweb-dev/contracts-js/dist/abis/DropERC1155.json"))
          .default
      : (
          await import(
            "@thirdweb-dev/contracts-js/dist/abis/DropERC1155_V2.json"
          )
        ).default;
  },
};

export const EditionInitializer = {
  name: "TokenERC1155" as const,
  contractType: "edition" as const,
  schema: TokenErc1155ContractSchema,
  roles: ["admin", "minter", "transfer"] as const,
  initialize: async (
    ...[network, address, storage, options]: InitalizeParams
  ) => {
    const [, provider] = getSignerAndProvider(network, options);
    const [abi, contract, _network] = await Promise.all([
      EditionInitializer.getAbi(address, provider),
      import("./prebuilt-implementations/edition"),
      provider.getNetwork(),
    ]);

    return new contract.Edition(
      network,
      address,
      storage,
      options,
      abi,
      _network.chainId,
    );
  },
  getAbi: async (address: string, provider: ethers.providers.Provider) => {
    await assertContractType(address, provider, "edition");
    return (
      await import("@thirdweb-dev/contracts-js/dist/abis/TokenERC1155.json")
    ).default;
  },
};

export const MarketplaceInitializer = {
  name: "Marketplace" as const,
  contractType: "marketplace" as const,
  schema: MarketplaceContractSchema,
  roles: ["admin", "lister", "asset"] as const,
  initialize: async (
    ...[network, address, storage, options]: InitalizeParams
  ) => {
    const [, provider] = getSignerAndProvider(network, options);
    const [abi, contract, _network] = await Promise.all([
      MarketplaceInitializer.getAbi(address, provider),
      import("./prebuilt-implementations/marketplace"),
      provider.getNetwork(),
    ]);

    return new contract.Marketplace(
      network,
      address,
      storage,
      options,
      abi,
      _network.chainId,
    );
  },
  getAbi: async (address: string, provider: ethers.providers.Provider) => {
    await assertContractType(address, provider, "marketplace");
    return (
      await import("@thirdweb-dev/contracts-js/dist/abis/Marketplace.json")
    ).default;
  },
};

export const MultiwrapInitializer = {
  name: "Multiwrap" as const,
  contractType: "multiwrap" as const,
  schema: MultiwrapContractSchema,
  roles: ["admin", "transfer", "minter", "unwrap", "asset"] as const,
  initialize: async (
    ...[network, address, storage, options]: InitalizeParams
  ) => {
    const [, provider] = getSignerAndProvider(network, options);
    const [abi, contract, _network] = await Promise.all([
      MultiwrapInitializer.getAbi(address, provider),
      import("./prebuilt-implementations/multiwrap"),
      provider.getNetwork(),
    ]);

    return new contract.Multiwrap(
      network,
      address,
      storage,
      options,
      abi,
      _network.chainId,
    );
  },
  getAbi: async (address: string, provider: ethers.providers.Provider) => {
    await assertContractType(address, provider, "multiwrap");
    return (await import("@thirdweb-dev/contracts-js/dist/abis/Multiwrap.json"))
      .default;
  },
};

export const NFTCollectionInitializer = {
  name: "TokenERC721" as const,
  contractType: "nft-collection" as const,
  schema: TokenErc721ContractSchema,
  roles: ["admin", "minter", "transfer"] as const,

  initialize: async (
    ...[network, address, storage, options]: InitalizeParams
  ) => {
    const [, provider] = getSignerAndProvider(network, options);
    const [abi, contract, _network] = await Promise.all([
      NFTCollectionInitializer.getAbi(address, provider),
      import("./prebuilt-implementations/nft-collection"),
      provider.getNetwork(),
    ]);

    return new contract.NFTCollection(
      network,
      address,
      storage,
      options,
      abi,
      _network.chainId,
    );
  },
  getAbi: async (address: string, provider: ethers.providers.Provider) => {
    await assertContractType(address, provider, "nft-collection");
    return (
      await import("@thirdweb-dev/contracts-js/dist/abis/TokenERC721.json")
    ).default;
  },
};

export const NFTDropInitializer = {
  name: "DropERC721" as const,
  contractType: "nft-drop" as const,
  schema: DropErc721ContractSchema,
  roles: ["admin", "minter", "transfer"] as const,
  initialize: async (
    ...[network, address, storage, options]: InitalizeParams
  ) => {
    const [, provider] = getSignerAndProvider(network, options);
    const [abi, contract, _network] = await Promise.all([
      NFTDropInitializer.getAbi(address, provider),
      import("./prebuilt-implementations/nft-drop"),
      provider.getNetwork(),
    ]);

    return new contract.NFTDrop(
      network,
      address,
      storage,
      options,
      abi,
      _network.chainId,
    );
  },
  getAbi: async (address: string, provider: ethers.providers.Provider) => {
    const contractInfo = await assertContractType(
      address,
      provider,
      "nft-drop",
    );
    return contractInfo.version > 3
      ? (await import("@thirdweb-dev/contracts-js/dist/abis/DropERC721.json"))
          .default
      : (
          await import(
            "@thirdweb-dev/contracts-js/dist/abis/DropERC721_V3.json"
          )
        ).default;
  },
};

export const PackInitializer = {
  name: "Pack" as const,
  contractType: "pack" as const,
  schema: PackContractSchema,
  roles: ["admin", "minter", "asset", "transfer"] as const,

  initialize: async (
    ...[network, address, storage, options]: InitalizeParams
  ) => {
    const [, provider] = getSignerAndProvider(network, options);
    const [abi, contract, _network] = await Promise.all([
      PackInitializer.getAbi(address, provider),
      import("./prebuilt-implementations/pack"),
      provider.getNetwork(),
    ]);

    return new contract.Pack(
      network,
      address,
      storage,
      options,
      abi,
      _network.chainId,
    );
  },
  getAbi: async (address: string, provider: ethers.providers.Provider) => {
    await assertContractType(address, provider, "pack");
    return (await import("@thirdweb-dev/contracts-js/dist/abis/Pack.json"))
      .default;
  },
};

export const SignatureDropInitializer = {
  name: "SignatureDrop" as const,
  contractType: "signature-drop" as const,
  schema: DropErc721ContractSchema,
  roles: ["admin", "minter", "transfer"] as const,

  initialize: async (
    ...[network, address, storage, options]: InitalizeParams
  ) => {
    const [, provider] = getSignerAndProvider(network, options);
    const [abi, contract, _network] = await Promise.all([
      SignatureDropInitializer.getAbi(address, provider),
      import("./prebuilt-implementations/signature-drop"),
      provider.getNetwork(),
    ]);

    return new contract.SignatureDrop(
      network,
      address,
      storage,
      options,
      abi,
      _network.chainId,
    );
  },
  getAbi: async (address: string, provider: ethers.providers.Provider) => {
    const contractInfo = await assertContractType(
      address,
      provider,
      "signature-drop",
    );
    return contractInfo.version > 4
      ? (
          await import(
            "@thirdweb-dev/contracts-js/dist/abis/SignatureDrop.json"
          )
        ).default
      : (
          await import(
            "@thirdweb-dev/contracts-js/dist/abis/SignatureDrop_V4.json"
          )
        ).default;
  },
};

export const SplitInitializer = {
  name: "Split" as const,
  contractType: "split" as const,
  schema: SplitsContractSchema,
  roles: ["admin"] as const,

  initialize: async (
    ...[network, address, storage, options]: InitalizeParams
  ) => {
    const [, provider] = getSignerAndProvider(network, options);
    const [abi, contract, _network] = await Promise.all([
      SplitInitializer.getAbi(address, provider),
      import("./prebuilt-implementations/split"),
      provider.getNetwork(),
    ]);

    return new contract.Split(
      network,
      address,
      storage,
      options,
      abi,
      _network.chainId,
    );
  },
  getAbi: async (address: string, provider: ethers.providers.Provider) => {
    await assertContractType(address, provider, "split");
    return (await import("@thirdweb-dev/contracts-js/dist/abis/Split.json"))
      .default;
  },
};

export const TokenDropInitializer = {
  name: "DropERC20" as const,
  contractType: "token-drop" as const,
  schema: DropErc20ContractSchema,
  roles: ["admin", "transfer"] as const,

  initialize: async (
    ...[network, address, storage, options]: InitalizeParams
  ) => {
    const [, provider] = getSignerAndProvider(network, options);
    const [abi, contract, _network] = await Promise.all([
      TokenDropInitializer.getAbi(address, provider),
      import("./prebuilt-implementations/token-drop"),
      provider.getNetwork(),
    ]);

    return new contract.TokenDrop(
      network,
      address,
      storage,
      options,
      abi,
      _network.chainId,
    );
  },
  getAbi: async (address: string, provider: ethers.providers.Provider) => {
    const contractInfo = await assertContractType(
      address,
      provider,
      "token-drop",
    );
    return contractInfo.version > 2
      ? (await import("@thirdweb-dev/contracts-js/dist/abis/DropERC20.json"))
          .default
      : (await import("@thirdweb-dev/contracts-js/dist/abis/DropERC20_V2.json"))
          .default;
  },
};

export const TokenInitializer = {
  name: "TokenERC20" as const,
  contractType: "token" as const,
  schema: TokenErc20ContractSchema,
  roles: ["admin", "minter", "transfer"] as const,
  initialize: async (
    ...[network, address, storage, options]: InitalizeParams
  ) => {
    const [, provider] = getSignerAndProvider(network, options);
    const [abi, contract, _network] = await Promise.all([
      TokenInitializer.getAbi(address, provider),
      import("./prebuilt-implementations/token"),
      provider.getNetwork(),
    ]);

    return new contract.Token(
      network,
      address,
      storage,
      options,
      abi,
      _network.chainId,
    );
  },
  getAbi: async (address: string, provider: ethers.providers.Provider) => {
    await assertContractType(address, provider, "token");
    return (
      await import("@thirdweb-dev/contracts-js/dist/abis/TokenERC20.json")
    ).default;
  },
};

export const VoteInitializer = {
  name: "VoteERC20" as const,
  contractType: "vote" as const,
  schema: VoteContractSchema,
  roles: [] as const,

  initialize: async (
    ...[network, address, storage, options]: InitalizeParams
  ) => {
    const [, provider] = getSignerAndProvider(network, options);
    const [abi, contract, _network] = await Promise.all([
      VoteInitializer.getAbi(address, provider),
      import("./prebuilt-implementations/vote"),
      provider.getNetwork(),
    ]);

    return new contract.Vote(
      network,
      address,
      storage,
      options,
      abi,
      _network.chainId,
    );
  },
  getAbi: async (address: string, provider: ethers.providers.Provider) => {
    await assertContractType(address, provider, "vote");
    return (await import("@thirdweb-dev/contracts-js/dist/abis/VoteERC20.json"))
      .default;
  },
};

async function assertContractType(
  address: string,
  provider: ethers.providers.Provider,
  type: PrebuiltContractType,
) {
  const contractInfo = await getPrebuiltInfo(address, provider);
  if (!contractInfo || contractInfo.type !== getContractName(type)) {
    throw new Error(`Contract is not a ${type}`);
  }
  return contractInfo;
}

/**
 * a map from contractType -> contract metadata
 * @internal
 */
export const PREBUILT_CONTRACTS_MAP = {
  [EditionDropInitializer.contractType]: EditionDropInitializer,
  [EditionInitializer.contractType]: EditionInitializer,
  [MarketplaceInitializer.contractType]: MarketplaceInitializer,
  [MultiwrapInitializer.contractType]: MultiwrapInitializer,
  [NFTCollectionInitializer.contractType]: NFTCollectionInitializer,
  [NFTDropInitializer.contractType]: NFTDropInitializer,
  [PackInitializer.contractType]: PackInitializer,
  [SignatureDropInitializer.contractType]: SignatureDropInitializer,
  [SplitInitializer.contractType]: SplitInitializer,
  [TokenDropInitializer.contractType]: TokenDropInitializer,
  [TokenInitializer.contractType]: TokenInitializer,
  [VoteInitializer.contractType]: VoteInitializer,
} as const;

const SmartContract = {
  name: "SmartContract" as const,
  contractType: "custom" as const,
  schema: CustomContractSchema,
  roles: ALL_ROLES,
};

export const CONTRACTS_MAP = {
  ...PREBUILT_CONTRACTS_MAP,
  [SmartContract.contractType]: SmartContract,
} as const;

/**
 * @internal
 */
export function getContractTypeForRemoteName(name: string): ContractType {
  return (
    Object.values(CONTRACTS_MAP).find((contract) => contract.name === name)
      ?.contractType || "custom"
  );
}

export function getContractName(
  type: PrebuiltContractType,
): string | undefined {
  return Object.values(CONTRACTS_MAP).find(
    (contract) => contract.contractType === type,
  )?.name;
}
