import { Box, Button, ScaleFade, FormControl, FormLabel, Heading, HStack, Input, VStack, Alert, AlertIcon, Text } from '@chakra-ui/react';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import FooterContainer from '../components/Footer/FooterContainer';
import { authLogin, clearAuthError } from '../redux/features/utility/utilitySlice';
import { auth } from '../__firebase/firebaseConf';


const Login = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passRef = useRef(null);
    const sizeBreakPoints = ['sm', 'md'];

    const dispatch = useDispatch();
    const user = useSelector(state => state.utility.auth.data);
    const status = useSelector(state => state.utility.auth.status);
    const error = useSelector(state => state.utility.auth.error);


    const onChangeHandler = () => {
        if (disabled) setDisabled(false);
        if (error !== '') dispatch(clearAuthError());
    }

    const handleClickLogin = async () => {

        let email = emailRef.current.value;
        let password = passRef.current.value;

        if (email !== '' && password !== '') {
            dispatch(authLogin({ email, password, auth }));
        }
    }
    useEffect(() => {

        if (!isVisible) {
            setIsVisible(true)
        }
        if (status === 'succeeded' && error === '' && user && user.userId) {
            navigate("/dashboard")
        }
        return () => {
            if (isVisible) {
                setIsVisible(false)
            }
        }

    }, [status, error, isVisible, navigate, user])

    return (
        <VStack h="100vh" minH={'300px'} justifyContent={'space-between'} >
            <Box flex={1} alignItems={'center'} display={'flex'} w={'full'} justifyContent={'center'}>
                <Box w={['full', 'full', 'lg']}>
                    <ScaleFade in={isVisible}
                        initialScale={0.5}
                    >
                        <Box
                            p={[8, 10]}
                            mx={{ base: '5px', md: 'auto' }}
                            border={['none', '1px']}
                            borderColor={['', 'gray.200']}
                            borderRadius={10}
                            bg={['', 'white']}
                            display="flex"
                            flex={1}
                        >

                            <VStack spacing={[3, 5]} align='flex-start' w='full'>
                                <VStack spacing={1} w='full' align={['flex-start', 'center']}>
                                    <Heading as='h2'>Login</Heading>
                                </VStack>
                                <FormControl variant="floating">
                                    <Input
                                        _focus={{ borderBottom: '1px solid teal' }}
                                        _focusVisible={{ outline: 'none' }}
                                        rounded={sizeBreakPoints}
                                        size={sizeBreakPoints}
                                        ref={emailRef}
                                        placeholder=" "
                                        bg='white'
                                    />
                                    <FormLabel fontSize={sizeBreakPoints}>Email:</FormLabel>
                                </FormControl>

                                <FormControl colorScheme={'teal'} variant="floating">

                                    <Input
                                        _focus={{ borderBottom: '1px solid teal' }}
                                        _focusVisible={{ outline: 'none' }}
                                        type='password'
                                        rounded={sizeBreakPoints}
                                        size={sizeBreakPoints}
                                        ref={passRef}
                                        onChange={onChangeHandler}
                                        placeholder=" "
                                        bg='white'

                                    />
                                    <FormLabel fontSize={sizeBreakPoints}>Password:</FormLabel>
                                </FormControl>
                                {
                                    error !== '' && <Box w={'full'}  >
                                        <Alert status='error' fontSize={'sm'} rounded={sizeBreakPoints}>
                                            <AlertIcon />
                                            {error}
                                        </Alert>
                                    </Box>
                                }
                                <Button colorScheme={'teal'} w='full' size={sizeBreakPoints} rounded={sizeBreakPoints}
                                    onClick={handleClickLogin}
                                    isDisabled={disabled}
                                    isLoading={status === 'loading'}
                                >
                                    Login
                                </Button>
                                <HStack w='full' justify={'center'} spacing={'1'} fontSize={'xs'} alignItems={'baseline'}>
                                    <Text>Not registered? Click to </Text>
                                    <Button variant={'link'} colorScheme={'teal'} as={RouterLink} to="/signup" fontSize={'xs'} mx={0} px={0} >SignUp</Button>
                                </HStack>

                            </VStack>

                        </Box>

                        {/* <CopyRights /> */}
                        {/* <FooterContainer /> */}

                    </ScaleFade >
                </Box>
            </Box>
            <Box w={'full'}>
                <FooterContainer />
            </Box>
        </VStack>

    );
};

export default Login;