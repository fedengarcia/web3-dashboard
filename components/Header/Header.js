import { Button, Center, Flex, Text } from "@chakra-ui/react";


const Header = ({user,logout, isLogginOut}) => {

    return(
        <header>
            <Flex justifyContent="space-between" px="10" py="6" bg="purple.300" color="white">
                <Center>
                    <Text fontSize="xl" fontWeight="bold">Web3 Dashboard</Text>
                </Center>
                <Center>
                    <Text fontSize="xl" fontWeight="bold">{user.getUsername()}</Text>
                    <Button
                        ml="4"
                        colorScheme="purple" 
                        disabled={isLogginOut}
                        onClick={logout}>Logout</Button>
                </Center>
            </Flex>
        </header>
    )
}


export default Header;