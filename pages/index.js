
import { Flex, Heading, Button, Text, Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis'
import Balance from '../components/Balance/Balance';
import Header from '../components/Header/Header';
import Nft from '../components/NFTs/Nft';
import Profile from '../components/Profile.js/Profile';
import SendEth from '../components/SendETH/SendEth';
import Transactions from '../components/Transactions/Transactions';

export default function Home() {
  const {isAuthenticated, authenticate, user, logout, isLoggingOut} = useMoralis();


  if(!isAuthenticated){
    return(<>
      <Heading>
        <title>Login Dashboard</title>
      </Heading>
      <Flex 
        direction="column"
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="100vh"
        bgGradient="linear(to-br,teal.400,purple.300)"
        >

        <Text 
          fontSize="5xl" 
          fontWeight="bold" 
          color="white">Dashboard web3 with Moralis</Text>
        
        <Button 
          colorScheme="purple" 
          size="lg" 
          marginTop="6"
          onClick={() => authenticate({
            signingMessage:"Sing to login Web3 Dashboard"
          })}>Login With Metamask</Button>
      
      </Flex>
    </>)
  }else{
    return (<>
      <Heading>
        <title>Web3 Dashboard</title>
      </Heading>

      <Flex flexDirection="column" width="100vw" height="100vh">
        <Header user={user} logout={logout} isLoggingOut={isLoggingOut}/>
        <Box flex="1" px="44" py="20" bg="purple.100">

          <Tabs size="lg" colorScheme="purple" align="center" width="100%" variant="enclosed">

            <TabList>
              <Tab fontWeight="bold">Profile</Tab>
              <Tab fontWeight="bold">Balance</Tab>
              <Tab fontWeight="bold">Transactions</Tab>
              <Tab fontWeight="bold">NFTs</Tab>
              <Tab fontWeight="bold">Send ETH</Tab>
            </TabList>  
          
           
            <TabPanels>
              <TabPanel><Profile user={user}/></TabPanel>
              <TabPanel><Balance user={user}/></TabPanel>
              <TabPanel><Transactions user={user}/></TabPanel>
              <TabPanel><Nft user={user}/></TabPanel>
              <TabPanel><SendEth user={user}/></TabPanel>
            </TabPanels>

          </Tabs> 
        </Box>
      </Flex>
      </>)
  }

}
