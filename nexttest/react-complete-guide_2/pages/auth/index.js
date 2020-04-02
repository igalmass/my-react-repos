import React from 'react';
import Link from 'next/link';
import User from '../../components/user';

const authIndexPage = () => (
    <div>
        <h2>The auth index page</h2>
        <h1>Go to <Link href="/"><a>Home</a></Link></h1>
        <User firstName="Logen" lastName="11 fingers38"></User>
    </div>
);

export default authIndexPage;