import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";

import { createTheme, MantineProvider } from '@mantine/core';
// import { ModalsProvider } from '@mantine/modals';
import '@mantine/core/styles.css';

export function Layout({ children }: { children: React.ReactNode }) {
  const { env } = useLoaderData() as { env: { SUPABASE_URL: string, SUPABASE_KEY: string } };
  // console.log('%cenv', 'color:gold', env)
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
        <ScrollRestoration />
        <script dangerouslySetInnerHTML={{
          __html: `window.env = ${JSON.stringify(env)}`
        }} />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = () => {
  return {
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY
    }
  }
}

export default function App() {
  return  <Outlet />
}
