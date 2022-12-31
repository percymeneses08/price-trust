import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./web3RPC";
// import { chain, configureChains, createClient } from "wagmi";
// import { InjectedConnector } from "wagmi/connectors/injected";
// import { publicProvider } from "wagmi/providers/public";

// const { chains, provider } = configureChains([chain.mainnet, chain.polygon], [publicProvider()]);

// await web3auth.initModal()

const clientId = "BBl9bCxM8XUqP0YXFiyc8CANMANQZbkxvRevb5jW8NLMm8FkEwGQNjOiSx8mUVoElwBA6K4xnQZFhYlxHP4RzR8"

const SignIn = _ => {
  // const web3auth = new Web3AuthConnector({
  //   clientId: "BBl9bCxM8XUqP0YXFiyc8CANMANQZbkxvRevb5jW8NLMm8FkEwGQNjOiSx8mUVoElwBA6K4xnQZFhYlxHP4RzR8", // Get your own client id from https://dashboard.web3auth.io
  //   chainConfig: {
  //     chainNamespace: "eip155",
  //     chainId: "0x1", // chainId that you want to connect with
  //   }
  // })

  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  useEffect(() => {
    const init = async () => {
      try {

      const web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x1",
          rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
        },
      });

      setWeb3auth(web3auth);

      await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        };
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };


  // return (
  //   <button onClick={_ => web3auth.initModal()}>Login</button>
  //   <h1>Hola</h1>
  // )
}


// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors: [
//     new Web3AuthConnector({
//       chains,
//       options: {
//         enableLogging: true,
//         clientId: "BBl9bCxM8XUqP0YXFiyc8CANMANQZbkxvRevb5jW8NLMm8FkEwGQNjOiSx8mUVoElwBA6K4xnQZFhYlxHP4RzR8", // Get your own client id from https://dashboard.web3auth.io
//         network: "testnet", // web3auth network, "mainnet", "cyan", or "aqua"
//         chainId: "0x1", // chainId that you want to connect with
//       },
//     }),
//     new InjectedConnector({ chains }),
//   ],
//   provider,
// });

// export default wagmiClient
export default SignIn