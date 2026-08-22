import { Show,SignInButton, SignOutButton, UserButton } from '@clerk/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

function HomePage() {
  

   
  return (
    <><div>
        <button className='btn btn-secondary' onClick={()=>toast.success("This is a sucess toast")}>Click me</button>
      <Show when="signed-out">
        <SignInButton />
      </Show>

      <Show when="signed-in">
        <UserButton />
        <SignOutButton />
      </Show>
      </div>
    </>
  );
}

export default HomePage;