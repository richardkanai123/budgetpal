import { auth } from '@/Auth'
import ServerAuthButton from '@/components/authComponents/ServerAuthButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'

const ProfilePage = async () => {
  const session = await auth()

  if (!session) {
    return <div className='mx-auto flex flex-col items-center align-middle gap-2'>
      <p>You are currently not logged in</p>
      <ServerAuthButton />
    </div>
  }


  return (

    <div className='w-full p-3  mx-auto text-center'>

      <h2 className="text-3xl font-bold leading-4 mb-4">Profile </h2>

      <Card className='mx-auto text-left'>
        <Avatar>
          <AvatarImage src={session?.user?.image as string} />
          <AvatarFallback>{session?.user?.name}</AvatarFallback>
        </Avatar>
        <CardHeader className='text-2xl'>{session.user?.name}</CardHeader>
        <CardContent>
          <p className='text-lg font-semibold'>Email: {session.user?.email}</p>
          <p>Current Session Valid till: {new Date(session.expires).toDateString()}</p>
        </CardContent>

        <CardFooter className='flex justify-center'>
          <ServerAuthButton />
        </CardFooter>
      </Card>

    </div>
  )
}

export default ProfilePage