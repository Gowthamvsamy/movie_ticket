import React from 'react'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'

function SideBar() {
    return (
        <div className='Sidebar'>
            <Sidebar className='bg-secondary'>
                <Menu className='side-msg'>
                    <MenuItem>note</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}

export default SideBar