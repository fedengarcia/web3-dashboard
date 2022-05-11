import { Divider, Link, Text } from "@chakra-ui/react";
import { useEffect,useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import CustomContainer from "../CustomContainer/CustomContainer";

const Transactions = ({user}) => { 
    const [transactions, setTransactions] = useState([]);
    const web3Api = useMoralisWeb3Api();
    const BASE_URL = "https://rinkeby.etherscan.io/tx/"

    const fetchTransactions = async() => {
        const data = await web3Api.account.getTransactions({
            chain: 'rinkeby',
            limit: 5,
            address: user.get('ethAddress'),
        }).catch(err => console.log(err));


        if(data) {
            setTransactions(data.result);            
        }
    }
    


    useEffect(() => {
        fetchTransactions();
    }, []);



    return(<CustomContainer>
        <Text fontSize="xl" mb="6" fontWeight="bold"></Text>
        {transactions && transactions.map(transaction => (
            <div key={transaction.hash}>
                <Link href={`${BASE_URL} ${transaction.hash}`} isExternal>{transaction.hash}</Link>  
                <Divider/>
            </div>
        ))}
    </CustomContainer>)
}

export default Transactions;