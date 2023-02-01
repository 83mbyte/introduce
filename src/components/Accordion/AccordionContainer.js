import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box, SimpleGrid, Flex,
} from '@chakra-ui/react';
import Wysiwyg from '../FormElements/WYSIWYG/Wysiwyg';
import InputCustom from '../FormElements/InputCustom';
import SpinnerCustom from '../Spinner/SpinnerCustom';
import SaveButton from '../Buttons/SaveButton';
import { ExpandIcon, RemoveIcon } from '../Icons/Icon';
import ToolTip from '../ToolTip/ToolTip';

const AccordionContainer = ({ state, user, handleEditorChange, handleInputChange, buttonStatus, saveToServer, removeItem }) => {


    const inputsOrder = ['title', 'degree', 'period', 'location', 'description'];

    const pathCustomize = (prefix, path) => {
        let pathArr = path.split('/');
        let res = pathArr.join(`/${prefix}/`)
        return res
    }

    return (
        <Box my='3' w={'100%'} px='8px' minW={'200px'}  >
            <Accordion allowToggle allowMultiple={false} >
                {
                    !state
                        ? <SpinnerCustom />
                        :
                        state.map((accordItem, index) => {
                            return (
                                <AccordionItem border={'1px solid'}
                                    borderColor={'gray.200'}
                                    borderRadius={"5px"}
                                    mb={4}
                                    key={index}
                                >
                                    {
                                        ({ isExpanded }) => (
                                            <>
                                                <h2>
                                                    <AccordionButton _hover={{ color: 'teal.500' }} color={isExpanded ? 'teal.500' : 'gray.200'}>
                                                        <Box flex={'1'} textAlign='left'>
                                                            <Box color={'black'} _hover={{ color: 'inherit' }} fontSize={['sm', 'sm', 'md']}>
                                                                {
                                                                    (!accordItem.title.value || accordItem.title.value === '' || accordItem.title.value === undefined)
                                                                        ? `(Not specified)`
                                                                        : accordItem.title.value
                                                                }
                                                            </Box>

                                                            <Box fontSize={'xs'} color={'gray.500'}>
                                                                {
                                                                    accordItem.period.value !== 'xxxx - yyyy' && accordItem.period.value
                                                                }
                                                            </Box>
                                                        </Box>
                                                        <Flex columnGap={'15px'} alignItems={'center'} mr='15px'>

                                                            <Box onClick={(e) => removeItem(e, state[index])}>
                                                                <ToolTip label='remove' type='warning'>
                                                                    <RemoveIcon isExpanded={isExpanded} />
                                                                </ToolTip>
                                                            </Box>
                                                        </Flex>

                                                        {/* {isExpanded && <AccordionIcon mx={1} />} */}
                                                        <ToolTip label={isExpanded ? 'show less' : 'show more'}>
                                                            <ExpandIcon isExpanded={isExpanded} />
                                                        </ToolTip>
                                                    </AccordionButton>
                                                </h2>

                                                <AccordionPanel pb={4}>
                                                    {/* education form */}
                                                    <SimpleGrid columns={[1, 1, 2]}>

                                                        {
                                                            inputsOrder &&
                                                            inputsOrder.map((key, ind) => {
                                                                if (key !== 'description') {

                                                                    let path = pathCustomize(index, accordItem[key].path);
                                                                    return (
                                                                        <InputCustom
                                                                            key={`${index}_${ind}`}
                                                                            labelText={accordItem[key].label}
                                                                            defValue={accordItem[key].value}
                                                                            path={path}
                                                                            required={accordItem[key].required}
                                                                            user={user}
                                                                            handleInputChange={handleInputChange}
                                                                        />

                                                                    )
                                                                }
                                                                return null
                                                            })
                                                        }

                                                    </SimpleGrid>
                                                    <Box  >

                                                        <Wysiwyg state={state[index].description} user={user} path={pathCustomize(index, state[index].description.path)} handleEditorChange={handleEditorChange} />
                                                    </Box>
                                                    {/* <Box>
                                            <SaveButton saveToServer={saveToServer} buttonStatus={buttonStatus} />
                                        </Box> */}

                                                    {/* education form end */}


                                                </AccordionPanel></>
                                        )
                                    }
                                </AccordionItem>
                            )
                        })

                }

            </Accordion>
        </Box >
    );
};

export default AccordionContainer;