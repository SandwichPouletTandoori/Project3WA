import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return(
        <footer>
            <div>
            © 2023 GreenHarvest Enterprises - All rights reserved.
            </div>
            <a id="legalNotices" href="/public/MentionsLegales.pdf" target="_blank">Legal Notices</a>
        </footer>
    )
}

export default Footer