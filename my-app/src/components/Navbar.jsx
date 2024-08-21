import React from 'react'

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container">
                    <a className="navbar-brand" href="">
                        <img width="70" src="https://graphql.org/img/logo.svg" alt="" />
                        <span className='navbar-brand'>GraphQL Project</span>
                        </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
