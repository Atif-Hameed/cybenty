'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const currentRoute = usePathname();

    // Memoize the whitelistedRoutes array to avoid re-creating it on every render
    const whitelistedRoutes = useMemo(() => [
        "/dashboard/tools/view-secret",
        "/dashboard/assessments/game/[id]",
        "/dashboard/assessments/invited"
        // Add more routes here as needed
    ], []);

    useEffect(() => {
        // Check if the user is logged in or if the current route is whitelisted
        const isWhitelisted = whitelistedRoutes.some((route) => {
            // Use pattern matching for dynamic routes
            const dynamicRouteRegex = new RegExp(`^${route.replace(/\[.*\]/, '.*')}`);
            return dynamicRouteRegex.test(currentRoute);
        });

        if (!isLoggedIn && !isWhitelisted) {
            // Redirect to login if not authenticated and not whitelisted
            router.push('/login');
        }
    }, [isLoggedIn, router, currentRoute, whitelistedRoutes]);

    // If user is logged in or route is whitelisted, render the children components
    const isWhitelisted = whitelistedRoutes.some((route) => {
        const dynamicRouteRegex = new RegExp(`^${route.replace(/\[.*\]/, '.*')}`);
        return dynamicRouteRegex.test(currentRoute);
    });

    if (isLoggedIn || isWhitelisted) {
        return children;
    }

    // Optionally, return a loading spinner or message while checking authentication
    return <div>Loading...</div>;
};

export default ProtectedRoute;
