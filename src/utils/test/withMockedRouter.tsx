import React from 'react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { NextRouter } from 'next/router'
import { MockedProvider } from '@apollo/client/testing'

export function withMockedRouter(
    router: Partial<NextRouter> = {},
    children: React.ReactElement
): React.ReactElement {
    const mockedRouter = {
        basePath: '',
        pathname: '/',
        route: '/',
        asPath: '/',
        query: {},
        push: jest.fn(),
        replace: jest.fn(),
        reload: jest.fn(),
        back: jest.fn(),
        prefetch: jest.fn(),
        beforePopState: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
        isReady: true,
        ...router,
    }

    return (
        <RouterContext.Provider value={mockedRouter}>
            <MockedProvider addTypename={false}>{children}</MockedProvider>
        </RouterContext.Provider>
    )
}
