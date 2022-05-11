import { Divider, Text, FormControl, FormLabel, NumberInput, Button, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Input, useToast } from "@chakra-ui/react";
import CustomContainer from "../CustomContainer/CustomContainer";
import {useState} from 'react';
import { useWeb3Transfer } from "react-moralis";
import Moralis from "moralis";

const SendEth = () => {
    const [amount,setAmount] = useState(0);
    const [receiver,setReceiver] = useState('');

    const handleChange = (value) => setAmount(value);

    const toast = useToast();

    const {fetch, isFetching} = useWeb3Transfer({
        amount: Moralis.Units.ETH(amount),
        receiver: receiver,
        type: 'native',
    });



    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Send Eth</Text>
            <Divider/>
            <form onSubmit={async e => {
                e.preventDefault()
                await Moralis.enableWeb3()
                fetch({
                    onSuccess: () => {
                        toast({
                            title: 'ETH successfully send',
                            description: 'Fresh ETH are showing up into the reciever wallet',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        });
                        setReceiver('');
                    },
                    onError: (error) => {
                        toast({
                            title: 'Error',
                            description: error,
                            status: 'error',
                            duration: '9000',
                            isClosable:true,
                        })
                    },
                })
            }}>
                <FormControl mt="6" mb="6">
                    <FormLabel mt="5" htmlFor="amount">Amount of ETH</FormLabel>
                    <NumberInput step={0.1}  placeholder="ex 0.25"  mt="1" onChange={handleChange}>
                        <NumberInputField id="amount" value={amount} />
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                    <FormLabel mt="5" htmlFor="receiver">Send to: </FormLabel>
                    <Input id="receiver" type="text" placeholder="Receiver Address" value={receiver} onChange={e => setReceiver(e.target.value)}/>
                </FormControl>


              


                <Button type="submit" colorScheme="green" mt="5" disabled={isFetching}>Send ETH</Button>

            </form>
        </CustomContainer>
    )
}


export default SendEth;