import { Divider, Text } from "@chakra-ui/react";
import { useERC20Balances, useMoralisWeb3Api } from "react-moralis";
import { useEffect,useState } from "react";
import CustomContainer from "../CustomContainer/CustomContainer";
import Moralis from "moralis";

const Balance = ({user}) => {
    const [ethBalance,setEthBalance] = useState(0);
    const web3Api = useMoralisWeb3Api();
    const {fetchERC20Balances,data} = useERC20Balances();

    const fetchNativeBalance = async() => {
        const result = await web3Api.account.getNativeBalance({
            chain: "rinkeby",
            address: user.get('ethAddress'),
        }).catch(err => console.log(err));
        if(result.balance) {
            setEthBalance(Moralis.Units.FromWei(result.balance))
        }
    }


    useEffect(() => {
        fetchNativeBalance();
        fetchERC20Balances({
            params: {
                chain:"rinkeby",
                address: user.get('ethAddress'),
            }
        })
    }, []);

    return(
        <CustomContainer>
            <Text>MY ERC20 Tokens:</Text>
            {ethBalance && <Text>{ethBalance} ETH</Text>}
            <Divider/>
            {data && data.map(token => (
                <div key={token.symbol}>
                    <Text>{Moralis.Units.FromWei(token.balance)} {token.symbol}</Text>
                    <Divider/>
                </div>
            ))}
        </CustomContainer>
    )
}


export default Balance;