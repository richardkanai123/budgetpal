import Link from 'next/link'
import React from 'react'
import ThemeToogle from '../theme/ThemeToggle'
import { auth } from '@/Auth'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Header = async () => {
	const session = await auth()

	return (
		<div className='w-full py-2 flex items-center justify-between px-3 '>
			<Link
				className='text-lg font-bold text-primary hover:text-sky-700 hover:underline'
				href='/'>
				Budget
			</Link>

			<div className='flex align-middle gap-2 items-center min-w-fit p-1'>
				<ThemeToogle />
				{session?.user ? <Link href='/profile'>
					<Avatar>
						<AvatarImage src={session?.user?.image as string} />
						<AvatarFallback>{session?.user?.name}</AvatarFallback>
					</Avatar>
				</Link> : <Link className='text-sm underline' href='/profile'>
					Profile
				</Link>}
			</div>
		</div>
	)
}

export default Header