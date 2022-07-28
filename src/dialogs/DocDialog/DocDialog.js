import React, { useEffect, useState } from 'react';
import { Dialog, Pane, Button, SelectField, Autocomplete, TextInput, FormField, TextInputField, SmallPlusIcon, UserIcon, SmallCrossIcon, Heading } from "evergreen-ui";



const DocDialog = (props) => {

    let _form = props.inject

    const header = (title) => {
        return (
            <div>
                {title}
            </div>
        );
    }

    return (
        <Pane>
            <Dialog
                isShown={props.open}
                header={header(props.title)}
                shouldCloseOnOverlayClick={false}
                width={600}
                onCloseComplete={() => props.onClose()}
                onConfirm={() => props.onConfirm(true)}
                confirmLabel={props.title}
                hasHeader={false}>
                <form>
                    <div className='flex justify-center items-center'>
                        <TextInputField size={100} required label="Name" value={_form.name} onChange={(e) => props.onChange({name: e.target.value})} />
                        <div style={{ margin: "0 10px" }}></div>
                        <TextInputField size={100} required label="Link" value={_form.link} onChange={(e) => props.onChange({link: e.target.value})} />
                    </div>
                </form>
            </Dialog>
        </Pane>
    )
}


export default DocDialog;