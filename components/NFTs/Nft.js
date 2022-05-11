/* eslint-disable jsx-a11y/alt-text */
import { Box, Image, Text } from '@chakra-ui/react';
import {useEffect} from 'react';
import { useNFTBalances } from "react-moralis";
import CustomContainer from "../CustomContainer/CustomContainer"

const Nft = ({user}) => {

    const {getNFTBalances,data} = useNFTBalances()

    useEffect(() => {
        getNFTBalances({
            params: {
                chain: 'rinkeby',
                address: user.get('ethAddress'),
            }
        });
    }, []);


    return (<CustomContainer>
    <Text fontSize="xl" fontWeight="bold">My NFTs</Text>
        {data && data.result.map(nft => (
            <Box key={nft.token_url} mt="4" px="2" py="2" borderWidth="1px" borderRadius="md">
                {nft.image && <Image src={nft.image}/>}
                <p>{nft.toke_url}</p>
            </Box>
        ))}
    </CustomContainer>)
}


export default Nft;