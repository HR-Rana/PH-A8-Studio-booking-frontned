"use client"

import React from 'react';
import { authClient } from '../lib/auth-client';

const NavUserInfo = () => {
      const { data: session, isPending } = authClient.useSession();
      console.log(data)

    return (
        <div>
            {
                
            }
        </div>
    );
}

export default NavUserInfo;
