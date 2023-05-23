import { React, useState } from 'react';
import AddAllotment from '../dialogs/AddAllotment/AddAllotment';
import Button from '@mui/material/Button';



const Allotments = () => {

    const [title, setTitle] = useState('');
    const [openAddDialog, setAddDialog] = useState(false)

    return (
        <div>
            <div className='w-full h-full flex flex-col mt-4'>
                <div className='flex justify-between items-center mb-10'>
                    <h2 className='text-lg'>Allotments</h2>
                    <div className='flex gap-4 mr-5'>
                        <Button variant="outlined" onClick={() => setAddDialog(true)}>
                            ADD RECORD
                        </Button>
                    </div>
                </div>
                <AddAllotment
                    open={openAddDialog}
                    onClose={() => setAddDialog(false)}
                    title={title}
                    onTitleChange={(value) => setTitle(value)}
                    save={() => console.log(title)}
                />
            </div>
        </div>
    )
}

export default Allotments