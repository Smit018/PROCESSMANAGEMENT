import { Button, CaretDownIcon, CaretUpIcon, Checkbox, CircleArrowRightIcon, EditIcon, Icon, Menu, PeopleIcon, Popover, Position, TrashIcon } from 'evergreen-ui'
import * as React from 'react'

const MultiSelect = (props) => {

    const [options, setOptions] = React.useState(props.options || [])
    const [isOpen, setOpen] = React.useState(false)

    const onChange = (e, option, index) => {
        const _options = [...options]
        _options[index].checked = !_options[index].checked
        setOptions(_options)
    }

    const openOverlay = () => {
        console.log(isOpen)
        setOpen(!isOpen)
    }

    return (
        <div>
            <Popover
                onBodyClick={(e) => e.stopPropagation()}
                trigger='click'
                onOpen={() => setOpen(!isOpen)}
                onClose={() => setOpen(!isOpen)}
                position={Position.BOTTOM_LEFT}
                minWidth={185}
                content={
                    <Menu>
                        <Menu.Group>
                            {options?.map((option, index) => (
                                <Menu.Item key={index}>
                                    <Checkbox
                                        label={option.title || option.name}
                                        fontSize={16}
                                        checked={option.checked}
                                        onChange={(e) => onChange(e, option, index)}
                                    />
                                </Menu.Item>
                            ))}
                        </Menu.Group>
                    </Menu>
                }
                >
                <button className='min-w-[185px] border border-gray-300 flex items-center justify-between px-6 py-2 rounded bg-white active:bg-slate-100 hover:bg-slate-50' onClick={() => openOverlay()}>
                    <p className='text-sm font-medium'>{props.label}</p>
                    {isOpen ? <CaretUpIcon /> : <CaretDownIcon />}
                </button>
            </Popover>
        </div>
    )
}

export default MultiSelect