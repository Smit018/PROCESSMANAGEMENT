import React, { useEffect, useState } from 'react';
import { Dialog, Pane, Button, SelectField, Autocomplete, TextInput, FormField, TextInputField, SmallPlusIcon, UserIcon, SmallCrossIcon, Heading } from "evergreen-ui";



const PromptDialog = (props) => {

    const header = (title) => {
        return (
            <div>
                {title=="Logout?"?title:`Delete ${title}`}
            </div>
        );
    }

    return (
        <Pane>
            <Dialog
                isShown={props.open}
                header={header(props.title)}
                shouldCloseOnOverlayClick={false}
                width={450}
                onCloseComplete={() => props.onClose()}
                onConfirm={() => props.onConfirm(true)}
                confirmLabel={props.title=='Logout?'?`Logout`:`Delete`}
                hasHeader={false}>
                    <Heading size={500}>{props.title=='Logout?'?`Are you sure you want to Logout`:`Do you really want to delete this ${props.title}`}</Heading>
            </Dialog>
        </Pane>
    )
}


export default PromptDialog;