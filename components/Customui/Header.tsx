import Link from 'next/link'
import React from 'react'
import ThemeToogle from '../theme/ThemeToggle'

const Header = () => {
  return (
   <div className='w-full py-2 flex items-center justify-between px-3 '>
			<Link
				className='text-lg font-bold text-primary hover:text-sky-700 hover:underline'
				href='/'>
				Budget
			</Link>

			<div className='flex align-middle gap-2 items-center min-w-fit'>
				<ThemeToogle />
				<span>Profile</span>
			</div>
		</div>
  )
}

export default Header