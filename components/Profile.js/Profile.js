import {useState} from 'react';
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import CustomContainer from "../CustomContainer/CustomContainer"
import { useMoralis } from 'react-moralis';


const Profile = ({user}) => {
    const [input,setInput] = useState('');
    const {setUserData, isUserUpdating} = useMoralis();


    return (
        <CustomContainer>
            <Text>Username: {user.getUsername()}</Text>
            <Text>Wallet Adress: {user.get('ethAddress')}</Text>
            <form onSubmit={e => {
                e.preventDefault()
                if(input.trim() !== ''){
                    setUserData({
                        username:input,
                    }).then(() => setInput(''));
                }
            }}>
                <FormControl mt="6" mb="6">
                    <FormLabel mt="5" htmlFor="username">Set a new userName</FormLabel>
                    <Input id="username" type="text" placeholder="ex theMTR" value={input} onChange={e => setInput(e.target.value)} mt="1"/>
                </FormControl>

                <Button type="submit" colorScheme="green" mt="5" disabled={isUserUpdating}>Change Username</Button>

            </form>
        </CustomContainer>
    )

}

export default Profile;