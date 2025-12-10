'use client'

import Link from 'next/link';
import { Button } from "./ui/button";
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';

export default function MenuDropdown() {

    // State
    const [open, setOpen] = useState(false);

    // Render return
    return (
        <div className="relative">
            {/* menu opens on toggle */}
            <Button
                variant={'outline'}
                size={'icon'}
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                aria-expanded={open}
                aria-controls="menu-dropdown-content"
            >
                <MenuIcon className="h-4 w-4" />
            </Button>

            {/* show menu on open */}
            {open && (
                <div
                    id="menu-dropdown-content"
                    role="menu"
                    className="absolute top-full right-0 mt-2 min-w-[180px] bg-popover border rounded-md shadow-lg z-50 p-1"
                >
                    <Link
                        href="/instruments"
                        className="block px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                    >
                        Instruments
                    </Link>
                    <Link
                        href="/notes"
                        className="block px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                    >
                        Notes
                    </Link>
                </div>
            )}
        </div>
    )
}