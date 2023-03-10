
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputCustom from '../components/FormElements/InputCustom';
import SectionContainer from './SectionContainer';


import { inputUpdate, fetchPersonDetails } from '../redux/features/personDetails/personDetailsSlice';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import { Box } from '@chakra-ui/react';
import { setIsModifiedTrue } from '../redux/features/utility/utilitySlice';
import ProfilePhoto from '../components/ProfilePhoto/ProfilePhoto';


const PersonDetails = ({ title, user }) => {
    let content;
    const dispatch = useDispatch();
    const data = useSelector(state => state.personDetails.data);
    const stateStatus = useSelector(state => state.personDetails.status);
    const error = useSelector(state => state.personDetails.error);
    const inputsOrder = useSelector(state => state.personDetails.inputsOrder)

    const handleInputChange = (path, value) => {
        dispatch(inputUpdate({ path: path.split('/').slice(1,), value: value }));
        dispatch(setIsModifiedTrue({ status: true, section: 'personDetails' }));
    }

    if (stateStatus === 'loading') {
        content = <SpinnerCustom />
    }
    else if (stateStatus === 'succeeded' && data) {

        content = <Fragment>
            <Box></Box>
            <Box display='flex' justifyContent={'flex-end'} px={2}>
                <ProfilePhoto user={user} />
            </Box>

            {

                inputsOrder.map((item, index) => {

                    return Object.keys(data[item]).map((i, ind) => {

                        return <InputCustom
                            key={`${ind}_${index}`}
                            defValue={data[item][i].value}
                            required={data[item][i].required}
                            labelText={data[item][i].label}
                            user={user}
                            path={data[item][i].path}
                            handleInputChange={handleInputChange}
                        />
                    })
                })
            }
        </Fragment>
    }
    else if ((stateStatus === 'succeeded' && data === undefined) || !data) {
        content = <Box>Something wrong - missed data.</Box>
    }
    else if (stateStatus === 'failed') {
        content = <Box>{error}</Box>
    }

    useEffect(() => {
        if (stateStatus === 'idle') {
            // fetch state
            dispatch(fetchPersonDetails(user));
        }
    }, [stateStatus, dispatch, user])

    return (
        <SectionContainer type={'grid'} headingTxt={title}>
            {content}
        </SectionContainer>
    );
};

export default PersonDetails;