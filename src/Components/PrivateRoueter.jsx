import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from "../Context/auth";


export const PrivateRouter = ({component: Component, ...rest}) => {
    const { authTokens } = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                (authTokens.token !== "")? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )

            }
        />
    )
}

